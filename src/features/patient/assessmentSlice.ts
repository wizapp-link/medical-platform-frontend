

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from "../../app/store";
import axios from "axios";
import { userLogInFail, userLogInRequest, userLogInSuccess } from "../auth/userLogInSlice";
import { UserInfo } from "../../types/UserDataType";

interface AssessmentState {
  answers: { [key: number]: string };
  currentQuestionIndex: number;
  loading: boolean,
  error: boolean,
  success: boolean,
  message: string,
  cancelError: boolean,
  cancelSuccess: boolean,
}

const initialState: AssessmentState = {
  answers: {},
  currentQuestionIndex: 0,
  loading: false,
  error: false,
  success: false,
  message: "",
  cancelError: false,
  cancelSuccess: false,
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
    },
    submitSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.message = action.payload;

    },
    submitFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
    setAllAnswer: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((value, i) => {
        state.answers[i+1] = value;
      });
    },
    cancelRequest: (state) => {
      state.loading = true;
      state.cancelError = false;
    },
    cancelSuccess: (state,action) => {
      state.loading = false;
      state.cancelError = false;
      state.cancelSuccess = true;
      state.message = action.payload;
      state.answers = []

    },
    cancelFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.cancelError = true;
      state.message = action.payload;
    },
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.cancelError = false;
      state.cancelSuccess = false;
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
    // localStorage.setItem('userData', JSON.stringify(data));
  } catch (err: any) {
    const cancelErrorMessage = err.response ? err.response.data.response : err.message
    console.log(cancelErrorMessage);
    dispatch(cancelFail(cancelErrorMessage));
  }
};

export const { setAnswer, setCurrentQuestionIndex, submitRequest, submitSuccess, submitFail, setAllAnswer, cancelRequest, cancelFail, cancelSuccess, reset } = assessmentSlice.actions;
export default assessmentSlice.reducer;