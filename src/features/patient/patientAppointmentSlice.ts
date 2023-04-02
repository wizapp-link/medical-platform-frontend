import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { Dispatch } from 'react';
import { UserData } from '../../types/UserDataType';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AppDispatch } from '../../app/store';
import { positionToRole, roleToPosition } from '../../constants/PositionRoleMap';
import roles from '../../constants/Roles';
import { Appointment, RawAppointment } from '../../types/AppointmentType';
import { flattenAndAddDatesToRawAppointments } from '../../utils/AppointmentConversion';

export type appointmentListState = {
	loading: boolean,
	error: boolean,
	errorMessage: string,
	appointmentUpdateLoading: boolean,
	appointmentUpdateError: boolean,
	appointmentUpdateSuccess: boolean,
	appointmentUpdateMessage: string,
	appointments: Appointment[],
}


const initialState: appointmentListState = {
	loading: false,
	error: false,
	errorMessage: "",
	appointmentUpdateLoading: false,
	appointmentUpdateError: false,
	appointmentUpdateSuccess: false,
	appointmentUpdateMessage: "",
	appointments: [],
};

const patientAppointmentListSlice = createSlice({
	name: 'patientAppointmentList',
	initialState,
	reducers: {
		appointmentListRequest: (state) => {
			state.loading = true;
		},
		appointmentListFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = true;
			state.errorMessage = action.payload;
		},
		appointmentUpdateRequest: (state) => {
			state.appointmentUpdateLoading = true;
		},
		appointmentUpdateFail: (state, action: PayloadAction<string>) => {
			state.appointmentUpdateLoading = false;
			state.appointmentUpdateError = true;
			state.appointmentUpdateSuccess = false;
			state.appointmentUpdateMessage = action.payload;
		},
		appointmentListSuccess: (state, action: PayloadAction<Appointment[]>) => {
			state.loading = false;
			state.appointments = action.payload;
		},
		appointmentUpdateSuccess: (state, action: PayloadAction<string>) => {
			state.appointmentUpdateLoading = false;
			state.appointmentUpdateMessage = action.payload;
			state.appointmentUpdateSuccess = true;
		},
		appointmentUpdateMessageReset: (state) => {
			state.appointmentUpdateMessage = "";
		}
	},
});

export const { appointmentListRequest, appointmentListFail, appointmentListSuccess, appointmentUpdateRequest, appointmentUpdateFail, appointmentUpdateSuccess, appointmentUpdateMessageReset } = patientAppointmentListSlice.actions;

export const listAppointment = (token: string | undefined, user: UserData) => async (dispatch: AppDispatch) => {
	dispatch(appointmentListRequest);
	try {
		console.log("in listAppointment");
		const queryStr = `/api/v1/fetchProfile?userEmail=${user.email}`

		const { data } = await axios({
					method: "post",
					url: queryStr,
					headers: { 'Authorization': `Bearer ${token}` },
				});

		console.log("List appointments via fetching UserData:");
		console.log(data);
		const rawAppointments = data.userData.appointments;
		const appointments = flattenAndAddDatesToRawAppointments(rawAppointments);
		console.log("converted appointments:")
		console.log(appointments);

		dispatch(appointmentListSuccess(appointments));
	} catch (err: any) {
		const errorMessage = err.response ? err.response.data.response : err.message
		console.log(errorMessage);
		dispatch(appointmentListFail(errorMessage));
	}
}

const getVarName = (varObj: object) => Object.keys(varObj)[0];

export const updateAppointment = (token: string | undefined, user: UserData, appointment: Appointment, newStatus: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(appointmentUpdateRequest())
		console.log("in updateAppointment, token");
		console.log(token);
		const { data } = await axios({
			method: "post",
			url: `/api/v1/patient/updateAppointmentStatus`,
			headers: { 'Authorization': `Bearer ${token}` },
			data: {
				date: appointment.slotDate,
				assignedBy: appointment.slotAssignedBy,
				status: newStatus,
			}
		})
		dispatch(appointmentUpdateSuccess(data.response));
		dispatch(listAppointment(token, user));
	} catch (err: any) {
		const errorMessage = err.response ? err.response.data.response : err.message
		console.log(errorMessage);
		dispatch(appointmentUpdateFail(errorMessage));
		dispatch(listAppointment(token, user));
	}
}

export const selectPatientAppointmentList = (state: RootState) => state.patientAppointmentList;
export default patientAppointmentListSlice.reducer;