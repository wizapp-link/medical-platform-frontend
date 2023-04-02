import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserData, UserInfo } from '../../types/UserDataType';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AppDispatch } from '../../app/store';
import { Patient, defaultPatient } from "../../types/PatientDataType";
import roles from "../../constants/Roles";

const initialState: AssignmentScreenState = {
	loading: false,
	error: false,
	success: false,
	message: "",
	patient: defaultPatient,
	timeslot: [],
	done: false,
}

export type AssignmentScreenState = {
	patient: Patient,
	timeslot: string[],
	loading: boolean,
	error: boolean,
	success: boolean,
	message: string,
	done: boolean,
}

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    timeslotRequest: (state) => {
      state.loading = true;
			state.error = false;
			state.success = false;
			state.message = "";
    },
    timeslotSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.timeslot = action.payload;
      state.error = false;
			state.success = true;
    },
    timeslotFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
			state.error = true;
      state.message = action.payload;
			state.success = false;
    },
		setAppointmentRequest: (state) => {
      state.loading = true;
			state.error = false;
			state.success = false;
			state.message = "";
    },
    setAppointmentSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = action.payload;
      state.error = false;
			state.success = true;
    },
    setAppointmentFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
			state.error = true;
      state.message = action.payload;
			state.success = false;
    },
		setPatient: (state, action: PayloadAction<Patient>) => {
			state.patient = action.payload;
		},
		doctorAcceptRequest: (state) => {
      state.loading = true;
			state.error = false;
			state.success = false;
			state.message = "";
    },
		doctorAcceptSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
      state.error = false;
			state.success = true;
			state.message = action.payload;
		},
		doctorAcceptFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = true;
      state.message = action.payload;
			state.success = false;
		},
		markDoneRequest: (state) => {
      state.loading = true;
			state.error = false;
			state.success = false;
			state.message = "";
    },
		markDoneSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
      state.error = false;
			state.success = true;
			state.message = action.payload;
			state.done = true;
		},
		markDoneFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = true;
      state.message = action.payload;
			state.success = false;
		},
  },
});

export const {
  timeslotRequest, timeslotSuccess, timeslotFail, setAppointmentRequest, setAppointmentSuccess, setAppointmentFail, setPatient, markDoneRequest, markDoneSuccess, markDoneFail, doctorAcceptRequest, doctorAcceptSuccess, doctorAcceptFail,
} = appointmentSlice.actions;

export const selectAppointment = (state: RootState) => state.appointment;

export const getTimeslot = (token: string, userData: UserData, date: string) => async (dispatch: AppDispatch) => {
	dispatch(timeslotRequest);
  try {
		let res;
		if(userData.role === roles.counselor){
		const queryStr = `/api/v1/counsellor/getAppointmentSlots?email=${userData.email}&date=${date}`
		console.log("queryStr: "+ queryStr);
		res= await axios({
			method: 'get',
			url: queryStr,
			headers:{
				Authorization: `Bearer ${token}`
			}
		});

		}else{
			const queryStr = `/api/v1/doctor/getAppointmentSlots?email=${userData.email}&date=${date}`;
			res= await axios({
				method: 'get',
				url: queryStr,
				headers:{
					Authorization: `Bearer ${token}`
				}
			});
		}
    console.log(res.data);
    dispatch(timeslotSuccess(res.data.response));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(timeslotFail(errorMessage));
  }
}

export const setAppointmentDateTime = (token: string, userData: UserData, patient: Patient, date: string, timeslot: string, doctorComment?: string) => async (dispatch: AppDispatch) => {
	dispatch(timeslotRequest);
  try {
		let res, queryStr;
		if(userData.role === roles.counselor){
			queryStr = `/api/v1/counsellor/setAppointmentSlot?counsellorEmail=${userData.email}&date=${date}&patientEmail=${patient.email}&slotTime=${timeslot}`;
			res= await axios({
				method: 'post',
				url: queryStr,
				headers:{
					Authorization: `Bearer ${token}`
				}
			});
		} else {
			queryStr = `/api/v1/doctor/setAppointmentSlot?doctorEmail=${userData.email}&date=${date}&patientEmail=${patient.email}&slotTime=${timeslot}`;
			res= await axios({
				method: 'post',
				url: queryStr,
				headers:{
					Authorization: `Bearer ${token}`
				}
			});
		}
    console.log(res.data);
    dispatch(setAppointmentSuccess(res.data.response));
		if(userData.role == roles.doctor){
			doctorAcceptPatient(token, patient, userData, doctorComment);
		}
		dispatch(markDone(token, patient, userData.role));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(setAppointmentFail(errorMessage));
  }
}

export const doctorAcceptPatient = (token: string, patient: Patient, doctor: UserData, doctorComment?: string) => async(dispatch: AppDispatch) => {
	const patientEmail = patient.email;
	const doctorEmail = doctor.email;
	const status = "SELF_ASSIGN";
	const reason = doctorComment;
	try{
		if(reason === "" || reason == null){
			throw new Error("Doctor's comment cannot be empty!");
		}
		dispatch(doctorAcceptRequest());
		const {data} = await axios({
			method: 'post',
			url: "/api/v1/doctor/updatePatientStatus",
			headers:{
				Authorization: `Bearer ${token}`
			},
			data: {
				patientEmail,
				doctorEmail,
				status,
				reason,
			}
		});
		dispatch(doctorAcceptSuccess(data.response));
	} catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(doctorAcceptFail(errorMessage));
  }
}

export const markDone = (token: string, patient: Patient, expertRole: string) => async(dispatch: AppDispatch) => {
	const endpointPath = 
	expertRole == roles.counselor ? 
	"/api/v1/counsellor/markCounsellingDone" : "/api/v1/doctor/markDoctoringDone";
	const queryStr = `${endpointPath}?patientEmail=${patient.email}`;
	dispatch(markDoneRequest);
	try{
		const { data } = await axios({
			method: 'post',
			url: queryStr,
			headers:{
				Authorization: `Bearer ${token}`
			}
		});
		console.log("markCounseloringDone success message:")
		console.log(data);
		dispatch(markDoneSuccess(data.response));
	} catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(markDoneFail(errorMessage));
  }
}

export default appointmentSlice.reducer;