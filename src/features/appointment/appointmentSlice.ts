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
}

export type AssignmentScreenState = {
	patient: Patient,
	timeslot: string[],
	loading: boolean,
	error: boolean,
	success: boolean,
	message: string,
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
		}
  },
});

export const {
  timeslotRequest, timeslotSuccess, timeslotFail, setAppointmentRequest, setAppointmentSuccess, setAppointmentFail, setPatient,
} = appointmentSlice.actions;

export const selectAppointment = (state: RootState) => state.appointment;

export const getTimeslot = (token: string, userData: UserData, date: string) => async (dispatch: AppDispatch) => {
	dispatch(timeslotRequest);
  try {
		let res;
		if(userData.role === roles.counselor){
		const queryStr = `/api/v1/counsellor/getAppointmentSlots?email=${userData.email}&date=${date}`
		console.log("queryStr: "+ queryStr);
    // res = await axios.post(
		// 	queryStr,
		// 	{ 'headers': { 'Authorization': `Bearer ${token}` } });
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

export const setAppointmentDateTime = (token: string, userData: UserData, patient: Patient, date: string, timeslot: string) => async (dispatch: AppDispatch) => {
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
    dispatch(timeslotSuccess(res.data.response));
  } catch (err: any) {
    const errorMessage = err.response ? err.response.data.response : err.message
    console.log(errorMessage);
    dispatch(timeslotFail(errorMessage));
  }
}

export default appointmentSlice.reducer;