

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from "../../app/store";
import axios from "axios";
import { userLogInFail, userLogInRequest, userLogInSuccess } from "../auth/userLogInSlice";
import { UserData, UserInfo } from "../../types/UserDataType";
import { getUserInfo } from '../auth/userLogInSlice';

interface AssessmentState {
  answers: { [key: number]: string };
  currentQuestionIndex: number;
  loading: boolean,
  error: boolean,
  submitSuccess: boolean,
  removeSuccess: boolean,
  message: string,
  showSnackbar: boolean,
  // cancelError: boolean,
  // cancelSuccess: boolean,

}

const initialState: AssessmentState = {
  answers: {},
  currentQuestionIndex: 0,
  loading: false,
  error: false,
  submitSuccess: false,
  removeSuccess: false,
  message: "",
  showSnackbar: false,
  // cancelError: false,
  // cancelSuccess: false,
};

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ index: number; answer: string }>) => {
      state.answers[action.payload.index] = action.payload.answer;
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
    submitRequest: (state) => {
      state.loading = true;
      state.error = false;
      state.submitSuccess = false;
      state.message = "Submitting..."
      state.showSnackbar = true;
    },
    submitSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.submitSuccess = true;
      state.message = action.payload;
      state.showSnackbar = true;
    },
    submitFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      state.showSnackbar = true;
    },
    setAllAnswer: (state, action: PayloadAction<string[]>) => {
      if(action.payload) {
        action.payload.forEach((value, i) => {
        state.answers[i+1] = value;
      });
    }
    },
    cancelRequest: (state) => {
      state.loading = true;
      state.removeSuccess = false;
      state.error = false;
      // state.cancelError = false;
      state.message = "Canceling assessment...";
      state.showSnackbar = true;
    },
    cancelSuccess: (state,action: PayloadAction<string>) => {
      state.loading = false;
      // state.cancelError = false;
      // state.cancelSuccess = true;
      state.removeSuccess = true;
      state.error = false;
      state.message = action.payload;
      state.answers = {}
      state.showSnackbar = true;
    },
    cancelFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.removeSuccess = false;
      state.error = true;
      // state.cancelError = true;
      state.message = action.payload;
      state.showSnackbar = true;
    },
    reset: (state) => {
      state.loading = initialState.loading;
      state.removeSuccess = initialState.removeSuccess;
      state.submitSuccess = initialState.submitSuccess;
      state.error = initialState.error;
      state.answers = initialState.answers;
      state.currentQuestionIndex = initialState.currentQuestionIndex;
      state.showSnackbar = initialState.showSnackbar;
      // state.cancelError = false;
      // state.cancelSuccess = false;
    },
    newError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.removeSuccess = false;
      state.submitSuccess = false;
      state.error = true;
      state.showSnackbar = true;
      state.message = action.payload;
    },
    closeSnackbar: (state) => {
      state.showSnackbar = false;
    }
  },
});

export const submitAssessment = (questionAnswers: { email: string, assessmentOptionsSelected: string[]}, token: string) => async (dispatch: AppDispatch) => {
  dispatch(submitRequest());
  try {
    const { data } = await axios.post(`/api/v1/patient/addAssessDetails`, questionAnswers, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(submitSuccess(data.response));
    console.log(data.response);
    setTimeout(() => {
      dispatch(getUserInfo(token, questionAnswers.email))
    }, 500);
    // localStorage.setItem('userData', JSON.stringify(data));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(submitFail(errorMessage));
  }
};
export const removeAssessment = (email: string, token: string) => async (dispatch: AppDispatch) =>{
  dispatch(cancelRequest());
  try {
    const { data } = await axios.post(`/api/v1/patient/removeAssessDetails?email=${email}`, null , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(cancelSuccess(data.response));
    console.log(data.response);
    setTimeout(() => {
      dispatch(getUserInfo(token, email))
    }, 500);
    // localStorage.setItem('userData', JSON.stringify(data));
  } catch (err: any) {
    const cancelErrorMessage = err.response ? err.response.data.response : err.message
    console.log(cancelErrorMessage);
    dispatch(cancelFail(cancelErrorMessage));
  }
};

export const { setAnswer, setCurrentQuestionIndex, submitRequest, submitSuccess, submitFail, setAllAnswer, cancelRequest, cancelFail, cancelSuccess, reset, newError, closeSnackbar } = assessmentSlice.actions;
export const selectAssessment = (state: RootState) => state.assessment;
export default assessmentSlice.reducer;

