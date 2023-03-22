import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserData, UserInfo} from '../../types/UserDataType';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AppDispatch } from '../../app/store';
import { Patient, defaultPatient } from "../../types/PatientDataType";

// const initialState: UserLogInState = {
//   userInfo: null,
// 	loading: false,
// 	error: false,
// 	message: ""
// };

const initialState: AssignmentScreenState = {
	loading: false,
	error: false,
	success: false,
	message: "",
	patient: defaultPatient
}

export type AssignmentScreenState = {
	patient: Patient,
	loading: boolean,
	error: boolean,
	success: boolean,
	message: string,
}

// export type UserLogInState = {
// 	userInfo: UserInfo | null
// 	loading: boolean,
// 	error: boolean,
// 	errorMessage: string,
// }

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
		}
  },
});

export const {
  assignRequest, assignSuccess, assignFail, setPatient,
} = counselorAssignmentSlice.actions;

export const selectCounselorAssignment = (state: RootState) => state.counselorAssignment;

export const assignSelf = (userData: UserData) => async (dispatch: AppDispatch) => {
	dispatch(assignRequest());
  try {
    const { data } = await axios.post(
			'/api/v1/counselor/updatePatientStatus', 
		{
			status: "SELF_ASSIGN",
		});
    console.log(data);
    dispatch(assignSuccess(data.response));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(assignFail(errorMessage));
  }
}

export const assignDoctor = (userData: UserData) => async (dispatch: AppDispatch) => {
	dispatch(assignRequest());
  try {
    const { data } = await axios.post(
			'/api/v1/counselor/updatePatientStatus', 
		{
			status: "ASSIGN_DOCTOR",
		});
    console.log(data);
    dispatch(assignSuccess(data.response));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(assignFail(errorMessage));
  }
}

export const rejectAssignment = (userData: UserData) => async (dispatch: AppDispatch) => {
	dispatch(assignRequest());
  try {
    const { data } = await axios.post(
			'/api/v1/counselor/updatePatientStatus', 
		{
			status: "REJECT_PATIENT",
		});
    console.log(data);
    dispatch(assignSuccess(data.response));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(assignFail(errorMessage));
  }
}

export const markCounsellingDone = (patientEmail: string) => async (dispatch: AppDispatch) => {
	// dispatch(assignRequest());
  try {
    const { data } = await axios.post(
			`/api/v1/counsellor/markCounsellingDone?patientEmail=${patientEmail}`);
    console.log(data);
    // dispatch(assignSuccess(data.response));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    // dispatch(assignFail(errorMessage));
  }
}

export default counselorAssignmentSlice.reducer;