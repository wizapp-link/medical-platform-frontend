import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserData, UserInfo} from '../../types/UserDataType';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AppDispatch } from '../../app/store';
import { Patient, defaultPatient } from "../../types/PatientDataType";
import roles from '../../constants/Roles';

const initialState: AssignmentScreenState = {
	loading: false,
	error: false,
	success: false,
	message: "",
	patient: defaultPatient,
	expertRole: "",
}

export type AssignmentScreenState = {
	patient: Patient,
	loading: boolean,
	error: boolean,
	success: boolean,
	message: string,
	expertRole: string,
}

const counselorAssignmentSlice = createSlice({
  name: 'counselorAssignment',
  initialState,
  reducers: {
    assignRequest: (state) => {
      state.loading = true;
			state.error = false;
			state.success = false;
			state.message = "";
    },
    assignSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = action.payload;
      state.error = false;
			state.success = true;
    },
    assignFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
			state.error = true;
      state.message = action.payload;
			state.success = false;
    },
		setPatient: (state, action: PayloadAction<Patient>) => {
			state.patient = action.payload;
		},
		resetToInitialState: (state) => {
			state.loading = initialState.loading;
			state.error = initialState.error;
			state.message = initialState.message;
			// state.patient = initialState.patient;
			state.success = initialState.success;
			state.expertRole = initialState.expertRole;
		},
		setExpertRole: (state, action: PayloadAction<string>) => {
			state.expertRole = action.payload;
		}
  },
});

export const {
  assignRequest, assignSuccess, assignFail, setPatient, resetToInitialState, setExpertRole
} = counselorAssignmentSlice.actions;

export const selectCounselorAssignment = (state: RootState) => state.counselorAssignment;

export const assignSelf = (token: string, patient: Patient, counselor: UserData, reason: string) => async (dispatch: AppDispatch) => {
	dispatch(assignRequest());
  try {
		const body = {
			patientEmail: patient.email,
			counsellorEmail: counselor.email,
			status: "SELF_ASSIGN",
			reason,
		}
		console.log(body);
    const { data } = await axios.post(
			'/api/v1/counsellor/updatePatientStatus', 
		body, { 'headers': { 'Authorization': `Bearer ${token}` } });
    console.log(data);
    dispatch(assignSuccess(data.response));
		dispatch(setExpertRole(roles.counselor));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(assignFail(errorMessage));
  }
}

export const assignDoctor = (token: string, patient: Patient, counselor: UserData, reason: string) => async (dispatch: AppDispatch) => {
	dispatch(assignRequest());
  try {
    const { data } = await axios.post(
			'/api/v1/counsellor/updatePatientStatus', 
		{
			patientEmail: patient.email,
			counsellorEmail: counselor.email,
			reason,
			status: "ASSIGN_DOCTOR",
		}, { 'headers': { 'Authorization': `Bearer ${token}` } });
		console.log(data);
    dispatch(assignSuccess(data.response));
		dispatch(setExpertRole(roles.doctor));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(assignFail(errorMessage));
  }
}

// // unused, used the doctor's one
// export const rejectAssignment = (userData: UserData) => async (dispatch: AppDispatch) => 
// 	dispatch(assignRequest());
//   try {
//     const { data } = await axios.post(
// 			'/api/v1/counselor/updatePatientStatus', 
// 		{
// 			status: "REJECT_PATIENT",
// 		});
//     console.log(data);
//     dispatch(assignSuccess(data.response));
//   } catch (err: any) {
//     const errorMessage = err.response ? err.response.data.response : err.message
//     console.log(errorMessage);
//     dispatch(assignFail(errorMessage));
//   }
// }

export const markCounsellingDone = (patientEmail: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.post(
			`/api/v1/counsellor/markCounsellingDone?patientEmail=${patientEmail}`);
    console.log(data);
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
  }
}

export default counselorAssignmentSlice.reducer;