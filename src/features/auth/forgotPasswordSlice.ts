import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AppDispatch } from '../../app/store';

const initialState: UserLogInState = {
	loading: false,
	success: false,
	error: false,
	message: "",
	showSnackbar: false,
};

export type UserLogInState = {
	loading: boolean,
	success: boolean,
	error: boolean,
	message: string,
	showSnackbar: boolean,
}

const userLogInSlice = createSlice({
  name: 'userLogIn',
  initialState,
  reducers: {
    otpRequest: (state) => {
      state.loading = true;
			state.success = false;
			state.error = false;
			state.message = "Requesting OTP..."
			state.showSnackbar = true;
    },
		otpSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.success = true;
			state.error = false;
			state.message = action.payload;
			state.showSnackbar = true;
		},
		otpFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.success = false;
			state.error = true;
			state.message = action.payload;
			state.showSnackbar = true;
		},
		resetPasswordRequest: (state) => {
      state.loading = true;
			state.success = false;
			state.error = false;
			state.message = "Requesting password reset..."
			state.showSnackbar = true;
    },
		resetPasswordSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.success = true;
			state.error = false;
			state.message = action.payload;
			state.showSnackbar = true;
		},
		resetPasswordFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.success = false;
			state.error = true;
			state.message = action.payload;
			state.showSnackbar = true;
		},
		closeSnackbar: (state) => {
			state.showSnackbar = false;
		},
		reset: (state) => {
			state = {...state, ...initialState};
		},
		newError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.success = false;
			state.error = true;
			state.message = action.payload;
			state.showSnackbar = true;
		},
  },
});

export const {
  otpRequest, otpSuccess, otpFail, closeSnackbar, resetPasswordRequest, resetPasswordSuccess, resetPasswordFail, reset, newError
} = userLogInSlice.actions;

export const selectForgotPassword = (state: RootState) => state.forgotPassword;

export const requestOtp = (token: string | undefined, email: string) => async (dispatch: AppDispatch) => {
	dispatch(otpRequest());
	try {
		// const { data } = await axios.post(`forgotPassword?email=${email}`);
		const { data } = await axios({
			method: "post",
			url: `/api/v1/forgotPassword?email=${email}`,
			// headers: {
			// 	Authorization: `Bearer ${token}`
			// }
		});
		console.log(data);
		dispatch(otpSuccess(data.response));
	} catch (err: any) {
		const errorMessage = err.response ? err.response.data.response : err.message
		console.log(errorMessage);
		dispatch(otpFail(errorMessage));
	}
};

export const resetPassword = (token: undefined | string, email: string, otp: string, password: string) => async (dispatch: AppDispatch) => {
	dispatch(resetPasswordRequest());
	try {
		const { data } = await axios({
			method: "post",
			url: `/api/v1/resetPassword`,
			data: { email, otp, newPassword: password },
			// headers: {
			// 	Authorization: `Bearer ${token}`
			// }
		});
		console.log(data);
		dispatch(resetPasswordSuccess(data.response));
	} catch (err: any) {
		const errorMessage = err.response ? err.response.data.response : err.message
		console.log(errorMessage);
		dispatch(resetPasswordFail(errorMessage));
	}
};

export default userLogInSlice.reducer;