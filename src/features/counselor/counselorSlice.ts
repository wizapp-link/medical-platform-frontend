import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from "../../app/store";
import axios, { AxiosResponse } from "axios";
import { Patient } from "../../types/PatientDataType";

export type CounselorState = {
  loading: boolean;
  success: boolean;
  error: boolean;
  // updateStatusError: string | null;
  patients: Patient[];
  // fetchingPatients: boolean;
  // fetchPatientsError: string | null;
  showSnackbar: boolean;
  message: string;
}

const initialState: CounselorState = {
  loading: false,
  success: false,
  error: false,
  // updatingPatientStatus: false,
  // updateStatusError: null,
  patients: [],
  // fetchingPatients: false,
  // fetchPatientsError: null,
  showSnackbar: false,
  message: "",
};

const counselorSlice = createSlice({
  name: 'counselor',
  initialState,
  reducers: {
    updatePatientStatusRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.message = "Updating patient status...";
      state.showSnackbar = true;
    },
    updatePatientStatusSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.message = action.payload;
      state.showSnackbar = true;
    },
    updatePatientStatusFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = action.payload;
      state.showSnackbar = true;
    },
    fetchPatientsRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.message = "Fetching patients data...";
    },
    fetchPatientsSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.patients = action.payload;
    },
    fetchPatientsFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = action.payload;
    },
    closeSnackbar: (state) => {
      state.showSnackbar = false;
    },
    newError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = action.payload;
      state.showSnackbar = true;
    }
  },
});

export const {
  updatePatientStatusRequest,
  updatePatientStatusSuccess,
  updatePatientStatusFail,
  fetchPatientsFail,
  fetchPatientsRequest,
  fetchPatientsSuccess,
  closeSnackbar,
  newError,
} = counselorSlice.actions;


export const updatePatientStatus = (email: string, expertEmail: string, status: string, reason: string, token: string | undefined, role: string | undefined) => async (
  dispatch: AppDispatch
) => {
  dispatch(updatePatientStatusRequest());
  try {
    if(reason == null || reason === ""){
      throw new Error("Comment cannot be empty!");
    }
    let response: AxiosResponse<any, any>;
    if(role === "counsellor"){
      response = await axios.post(`/api/v1/${role}/updatePatientStatus`, {
        patientEmail: email,
        status,
        reason,
        counsellorEmail: expertEmail,
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    }else {
      response = await axios.post(`/api/v1/${role}/updatePatientStatus`, {
        patientEmail: email,
        status,
        reason,
        doctorEmail: expertEmail,
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    }
    dispatch(updatePatientStatusSuccess(response.data.response));
    console.log("updatePatientStatusSuccess");
    console.log(response);
    if(token){
      dispatch(fetchPatients(email, token));
    }
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message;
    console.log("Update Patient Status error: " + errorMessage);
    dispatch(updatePatientStatusFail(errorMessage));
  }
};

export const fetchPatients = (email: string, token: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchPatientsRequest());
  try {
    const response = await axios.get(`/api/v1/counsellor/getAllAssessPatients?email=${email}`, { 'headers': { 'Authorization': `Bearer ${token}` } });
    dispatch(fetchPatientsSuccess(response.data));
    console.log("counselor fetching patient data");
    console.log(response);
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message;
    dispatch(fetchPatientsFail(errorMessage));
  }
};

export default counselorSlice.reducer;

export const selectConselor = (state: RootState) => state.counselor;