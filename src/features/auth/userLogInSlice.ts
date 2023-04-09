import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserData, UserInfo} from '../../types/UserDataType';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AppDispatch } from '../../app/store';

const initialState: UserLogInState = {
  userInfo: null,
	loading: false,
	error: false,
	errorMessage: ""
};

export type UserLogInState = {
	userInfo: UserInfo | null
	loading: boolean,
	error: boolean,
	errorMessage: string,
}

export type ProfileUpdatePayload = {
  name: string, email: string, phoneNumber: string, addr: string, dob: string
}

const userLogInSlice = createSlice({
  name: 'userLogIn',
  initialState,
  reducers: {
    userLogInRequest: (state) => {
      state.loading = true;
    },
    userLogInSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.loading = false;
      if(action.payload.token!=null){
        state.userInfo = action.payload;
      }else{
        if(state.userInfo){
          state.userInfo.userData = action.payload.userData;
        }
      }
      state.error = false;
    },
    userLogInFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
			state.error = true;
      state.errorMessage = action.payload;
    },
    userDataUpdate: (state, action: PayloadAction<ProfileUpdatePayload>) => {
      if(state.userInfo){
        state.userInfo.userData.name = action.payload.name;
        // state.userInfo.userData.email = action.payload.email;
        state.userInfo.userData.phone = action.payload.phoneNumber;
        state.userInfo.userData.address = action.payload.addr;
        state.userInfo.userData.dob = action.payload.dob;
      }
    },
    userLogOut: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  userLogInFail, userLogInRequest, userLogInSuccess, userLogOut, userDataUpdate
} = userLogInSlice.actions;

export const selectUserLogIn = (state: RootState) => state.userLogIn;

export const logIn = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(userLogInRequest());
  try {
    const { data } = await axios.post('/api/v1/login', { email, password });
    console.log(data);
    dispatch(userLogInSuccess(data));
    // localStorage.setItem('userData', JSON.stringify(data));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(userLogInFail(errorMessage));
  }
};
export const logOut = () => (dispatch: AppDispatch) => {
  // localStorage.removeItem('userData');
  dispatch(userLogOut());
};

export const link = (googleMeetLink: string) => async (dispatch: AppDispatch) => {
  dispatch(userLogInRequest());
  try {
    const { data } = await axios.post('/api/v1/login', { googleMeetLink});
    console.log(data);
    dispatch(userLogInSuccess(data));
    // localStorage.setItem('userData', JSON.stringify(data));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(userLogInFail(errorMessage));
  }
};



export const getUserInfo = (token: string | undefined, email: string) => async (dispatch: AppDispatch) => {
	// dispatch(appointmentListRequest);
	try {
		console.log("in getUserInfo");
		const queryStr = `/api/v1/fetchProfile?userEmail=${email}`

		const { data } = await axios({
					method: "post",
					url: queryStr,
					headers: { 'Authorization': `Bearer ${token}` },
				});

		console.log("getAssessment via fetching UserData:");
		console.log(data);
    dispatch(userLogInSuccess(data));
		// dispatch(appointmentListSuccess(appointments));
	} catch (err: any) {
		const errorMessage = err.response ? err.response.data.response : err.message
		console.log(errorMessage);
		// dispatch(appointmentListFail(errorMessage));
	}
}

export const updateUserData = (token: string, userData: UserData, name: string, email: string, phoneNumber: string, addr: string, dob: string) => async (dispatch: AppDispatch) => {
  try{
    console.log("updating userData");
    dispatch(userDataUpdate({name, email, phoneNumber, addr, dob} as ProfileUpdatePayload));
    const {data} = await axios({
      method: "post",
      url: "/api/v1/editProfile",
      headers:{
        Authorization: `Bearer ${token}`
      },
      data: {
        ...userData,
        name,
        email,
        phone: phoneNumber,
        addr,
        dob
      }
    });
  } catch(err: any){
    const errorMessage = err.response ? err.response.data.response : err.message
    console.error(errorMessage);
  }
}

export default userLogInSlice.reducer;