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
  errorMessage: string,

}

const initialState: AssessmentState = {
  answers: {},
  currentQuestionIndex: 0,
  loading: false,
  error: false,
  errorMessage: ""
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
    },
    submitSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    submitFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },

  },
});

export const submitAssessment = (questionAnswers: { questionId: number; answer: string }[] ) => async (dispatch: AppDispatch) => {
  dispatch(submitRequest());
  try {
    await axios.post('/api/v1/assessment', { questionAnswers });
    dispatch(submitSuccess());
    // localStorage.setItem('userData', JSON.stringify(data));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(userLogInFail(errorMessage));
  }
};

export const { setAnswer, setCurrentQuestionIndex, submitRequest, submitSuccess, submitFail } = assessmentSlice.actions;
export default assessmentSlice.reducer;