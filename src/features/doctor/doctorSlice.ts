import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import axios, { AxiosResponse } from "axios";
import { Patient } from "../../types/PatientDataType";

const TestPatient: Patient[] = [{
  address: "Rue guy",
  assessmentOptionsSelected: ["a", "b", "c", "d", "a", "b", "c", "d", "a"],
  assessmentTaken: true,
  counsellingComment: "",
  counsellingDone: false,
  counsellorAssigned: "",
  creationDate: "2000-00-00",
  dob: "2010-01-01",
  doctorAssigned: null,
  doctorComment: null,
  doctoringDone: false,
  email: "Niltavakolian@gmail.com",
  id: "641761ecf3d83d34448f6429",
  name: "Nilta",
  otp: null,
  otpExpiryDate: null,
  password: "",
  patientQueue: null,
  phone: "4379860077",
  registrationNo: null,
  role: "ROLE_PATIENT",
  status: "VERIFIED",
  verificationAttempts: null
},
  {
    address: "Addr2",
    assessmentOptionsSelected: [],
    assessmentTaken: false,
    counsellingComment: "",
    counsellingDone: false,
    counsellorAssigned: "",
    creationDate: "2000-00-00",
    dob: "2003-00-00",
    doctorAssigned: null,
    doctorComment: null,
    doctoringDone: false,
    email: "Rui@123.456",
    id: "888888",
    name: "Rui",
    otp: null,
    otpExpiryDate: null,
    password: "",
    patientQueue: null,
    phone: "5140000000",
    registrationNo: null,
    role: "",
    status: "",
    verificationAttempts: null

  }];

interface DoctorState {
  updatingPatientStatus: boolean;
  updateStatusError: string | null;
  patients: Patient[];
  fetchingPatients: boolean;
  fetchPatientsError: string | null;
}

const initialState: DoctorState = {
  updatingPatientStatus: false,
  updateStatusError: null,
  // patients: TestPatient,
  patients: [],
  //Todo: TestPatient change to []
  fetchingPatients: false,
  fetchPatientsError: null
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    updatePatientStatusRequest: (state) => {
      state.updatingPatientStatus = true;
      state.updateStatusError = null;
    },
    updatePatientStatusSuccess: (state) => {
      state.updatingPatientStatus = false;
      state.updateStatusError = null;
    },
    updatePatientStatusFail: (state, action: PayloadAction<string>) => {
      state.updatingPatientStatus = false;
      state.updateStatusError = action.payload;
    },
    fetchPatientsRequest: (state) => {
      state.fetchingPatients = true;
      state.fetchPatientsError = null;
    },
    fetchPatientsSuccess: (state, action: PayloadAction<Patient[]>) => {
      state.fetchingPatients = false;
      state.patients = action.payload;
      state.fetchPatientsError = null;
    },
    fetchPatientsFail: (state, action: PayloadAction<string>) => {
      state.fetchingPatients = false;
      state.fetchPatientsError = action.payload;
    }
  }
});

export const {
  updatePatientStatusRequest,
  updatePatientStatusSuccess,
  updatePatientStatusFail,
  fetchPatientsFail,
  fetchPatientsRequest,
  fetchPatientsSuccess
} = doctorSlice.actions;


export const updatePatientStatus = (email: string, expertEmail: string, status: string, reason: string, token: string | undefined, role: string | undefined) => async (
  dispatch: AppDispatch
) => {
  dispatch(updatePatientStatusRequest());
  try {
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
    dispatch(updatePatientStatusSuccess());
    console.log("updatePatientStatusSuccess");
    console.log(response);
    if(token){
      dispatch(fetchPatients(email, token, role))
    }
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message;
    console.log("Update Patient Status error: " + errorMessage);
    dispatch(updatePatientStatusFail(errorMessage));
  }
};

export const fetchPatients = (email: string, token: string, role: string | undefined) => async (dispatch: AppDispatch) => {
  dispatch(fetchPatientsRequest());
  try {
    const response = await axios.get(`/api/v1/${role}/getAllAssessPatients?email=${email}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    dispatch(fetchPatientsSuccess(response.data));
    console.log("fetched patients:")
    console.log(response);
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message;
    console.log("doctor fetching patient error: " + errorMessage);
    dispatch(fetchPatientsFail(errorMessage));
  }
};

export const selectDoctor = (state: RootState) => state.doctor;

export default doctorSlice.reducer;