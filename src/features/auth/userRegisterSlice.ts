
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { userSigninSuccess } from './userSigninSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AppDispatch } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import { positionToRole } from '../../constants/PositionRoleMap';

const initialState: UserRegisterState = {
	loading: false,
	error: false,
	errorMessage: "",
};

export type UserRegisterState = {
	loading: boolean,
	error: boolean,
	errorMessage: string,
}
const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,
  reducers: {
    userRegisterRequest: (state) => {
      state.loading = true;
    },
    userRegisterFail: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
			state.error = true;
      state.loading = false;
    },
    userRegisterSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
  },
});

// eslint-disable-next-line max-len
export const { userRegisterFail, userRegisterRequest, userRegisterSuccess } = userRegisterSlice.actions;

export const register = (position: string, name: string, email: string, password: string, phoneNumber: string, registrationNumber: string, dob: string, address: string) => async (dispatch: AppDispatch) => {

	// check and convert position type in frontend to role type in backend
	const role = positionToRole.get(position);
	if(position === undefined){
		console.error(`Position ${position} type error!`);
	}
	
  dispatch(userRegisterRequest());
  try {
    const res = await axios.post(`/api/v1/signup`, { name, email, password, role, phone: Number(phoneNumber), registrationNo: Number(registrationNumber), dob, address});

		if(res.status === 200){
			console.log(`${position} successfully registered!`)
			console.log(`Backend Message: `)
      console.log(res.data)
			dispatch(userRegisterSuccess());
		} else{
			console.error(`Uncaught Error in ${position} registration!\nBackend Messsage: ${res.data}`);
		}
    // dispatch(userSigninSuccess(data));
    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err: any) {
    dispatch(userRegisterFail(err.response ? err.response.data.message : err.message));
  }
};

export const selectUserRegister = (state: RootState) => state.userRegister;

export default userRegisterSlice.reducer;