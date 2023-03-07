import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { Dispatch } from 'react';
import { UserData } from '../../types/UserDataType';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AppDispatch } from '../../app/store';
import { positionToRole, roleToPosition } from '../../constants/PositionRoleMap';
import roles from '../../constants/Roles';

export type PersonnelListState = {
	loading: boolean,
	error: boolean,
	errorMessage: string,
	personnelUpdateLoading: boolean,
	personnelUpdateError: boolean,
	personnelUpdateMessage: string,
	personnel: Personnel | null,
}

type Personnel = {
	patients: UserData[] | null,
	counselors: UserData[] | null,
	doctors: UserData[] | null,
	pendingCounselors: UserData[] | null,
	pendingDoctors: UserData[] | null,
}

const initialState: PersonnelListState = {
	loading: false,
	error: false,
	errorMessage: "",
	personnelUpdateLoading: false,
	personnelUpdateError: false,
	personnelUpdateMessage: "",
	personnel: null,
};

const personnelListSlice = createSlice({
	name: 'personnelList',
	initialState,
	reducers: {
		personnelListRequest: (state) => {
			state.loading = true;
		},
		personnelListFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = true;
			state.errorMessage = action.payload;
		},
		personnelUpdateRequest: (state) => {
			state.personnelUpdateLoading = true;
		},
		personnelUpdateFail: (state, action: PayloadAction<string>) => {
			state.personnelUpdateLoading = false;
			state.personnelUpdateError = true;
			state.personnelUpdateMessage = action.payload;
		},
		personnelListSuccess: (state, action: PayloadAction<Personnel>) => {
			state.loading = false;
			if (!state.personnel) {
				state.personnel = action.payload;
			} else {
				if (action.payload.patients) {
					state.personnel.patients = action.payload.patients;
				}
				if (action.payload.counselors) {
					state.personnel.counselors = action.payload.counselors;
				}
				if (action.payload.doctors) {
					state.personnel.doctors = action.payload.doctors;
				}
				if (action.payload.pendingCounselors) {
					state.personnel.pendingCounselors = action.payload.pendingCounselors;
				}
				if (action.payload.pendingDoctors) {
					state.personnel.pendingDoctors = action.payload.pendingDoctors;
				}
			}
		},
		personnelUpdateSuccess: (state, action: PayloadAction<string>) => {
			state.personnelUpdateLoading = false;
			state.personnelUpdateMessage = action.payload;
		}
	},
});

export const { personnelListRequest, personnelListFail, personnelListSuccess, personnelUpdateRequest, personnelUpdateFail, personnelUpdateSuccess } = personnelListSlice.actions;

export const listPersonnel = (token: string | undefined, role: string, pendingOnly: boolean) => async (dispatch: AppDispatch) => {
	dispatch(personnelListRequest);
	try {

		// if (position == null || position == "") {
		// 	throw new Error("Position cannot be null or empty!");
		// }
		// const role = positionToRole.get(position);
		// if (role == null || role == "") {
		// 	throw new Error(`Unexpected position: ${position}`);
		// }

		const queryStr = pendingOnly ? `pendingUsers?role=${role}` : `getAllUsers?role=${role}`;

		const { data } =
			await axios.get(`/api/v1/manager/${queryStr}`,
				{ 'headers': { 'Authorization': `Bearer ${token}` } });

		const personnel: Personnel = {
			patients: null,
			counselors: null,
			doctors: null,
			pendingCounselors: null,
			pendingDoctors: null,
		}

		if (pendingOnly) {
			if (role === roles.counselor) {
				personnel.pendingCounselors = data;
			}
			if (role === roles.doctor) {
				personnel.pendingDoctors = data;
			}
		} else {
			if (role === roles.patient) {
				personnel.patients = data;
			}
			if (role === roles.counselor) {
				personnel.counselors = data;
			}
			if (role === roles.doctor) {
				personnel.doctors = data;
			}
		}
		console.log(data);
		console.log(personnel);

		dispatch(personnelListSuccess(personnel));
	} catch (err: any) {
		const errorMessage = err.response ? err.response.data.response : err.message
		console.log(errorMessage);
		dispatch(personnelListFail(errorMessage));
	}
}

export const listAllPersonnel = (token: string | undefined, pendingOnly: boolean) => async (dispatch: AppDispatch) => {
	dispatch(listPersonnel(token, roles.patient, pendingOnly));
	dispatch(listPersonnel(token, roles.counselor, pendingOnly));
	dispatch(listPersonnel(token, roles.doctor, pendingOnly))
}

export const updatePersonnel = (token: string | undefined, user: UserData, newStatus: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(personnelUpdateRequest())
		console.log("in updatePersonnel, token");
		console.log(token);
		const { data } = await axios({
			method: "put",
			url: `/api/v1/manager/updateUser?userId=${user.id}&status=${newStatus}`,
			headers: { 'Authorization': `Bearer ${token}` }
		})
		dispatch(personnelUpdateSuccess(data.response));
	} catch (err: any) {
		const errorMessage = err.response ? err.response.data.response : err.message
		console.log(errorMessage);
		dispatch(personnelUpdateFail(errorMessage));
	}
}

export const selectPersonnelList = (state: RootState) => state.personnelList;
export default personnelListSlice.reducer;