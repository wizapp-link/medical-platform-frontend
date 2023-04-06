import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { AppDispatch, RootState } from "../../app/store";
import { UserData } from "../../types/UserDataType";

export type ReportState = {
  formData: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | { message: string };
};

const initialState: ReportState = {
  formData: null,
  status: 'idle',
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    reportRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    reportSuccess: (state, action: PayloadAction<string>) => {
      state.status = 'succeeded';
      state.formData = action.payload;
      state.error = null;
    },
    reportFail: (state, action: PayloadAction<{ message: string }>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { reportRequest, reportSuccess, reportFail } = reportSlice.actions;

export const fetchReport = (
  startDate: string,
  endDate: string,
  token: string) => async (dispatch: AppDispatch) => {
  dispatch(reportRequest());
  try {
    const response = await axios.post(
      // http://35.165.213.169:8080/api/v1/manager/exportUsers?startDate=22/03/2023&endDate=07/04/2023
      `/api/v1/manager/exportUsers?startDate=${startDate}&endDate=${endDate}`
      ,{}
      ,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }

    );
    setTimeout(() => {
      dispatch(reportSuccess(response.data));
    }, 3000);

  } catch (error: any) {
    dispatch(
      reportFail({ message: error.response?.data || 'Unknown error' })
    );
  }
};

export const selectReport = (state: RootState) => state.report;
export default reportSlice.reducer;
