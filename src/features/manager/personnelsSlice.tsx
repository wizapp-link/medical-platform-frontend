import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { Dispatch } from 'react';
import { UserData } from '../../types/UserDataType';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AppDispatch } from '../../app/store';
import { positionToRole, roleToPosition } from '../../constants/PositionRoleMap';

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
			}
		},
		personnelUpdateSuccess: (state) => {
			state.personnelUpdateLoading = false;
		}
	},
});

export const { personnelListRequest, personnelListFail, personnelListSuccess, personnelUpdateRequest, personnelUpdateFail, personnelUpdateSuccess } = personnelListSlice.actions;

export const listPersonnel = (token: string | undefined, position: string, pendingOnly: boolean) => async (dispatch: AppDispatch) => {
	dispatch(personnelListRequest);
	try {
		const role = positionToRole.get(position);
		if (role == null || role == "") {
			throw new Error(`Unexpected position: ${position}`);
		}

		const queryStr = pendingOnly ? `pendingUsers?role=${role}` : `getAllUsers?role=${role}`;

		const { data } =
			await axios.get(`/api/v1/mamager/${queryStr}`,
				{ 'headers': { 'Authorization': `Bearer ${token}` } });

		const personnel: Personnel = {
			patients: null,
			counselors: null,
			doctors: null,
			pendingCounselors: null,
			pendingDoctors: null,
		}

		if (pendingOnly) {
			if (position === "counselor") {
				personnel.pendingCounselors = data;
			}
			if (position === "doctor") {
				personnel.pendingDoctors = data;
			}
		} else {
			if (position === "patient") {
				personnel.patients = data;
			}
			if (position === "counselor") {
				personnel.counselors = data;
			}
			if (position === "doctor") {
				personnel.doctors = data;
			}
		}

		dispatch(personnelListSuccess(personnel));
	} catch (err: any) {
		const errorMessage = err.response ? err.response.data.response : err.message
		console.log(errorMessage);
		dispatch(personnelListFail(errorMessage));
	}
}

export const listAllPersonnel = (token: string | undefined, pendingOnly: boolean) => async (dispatch: AppDispatch) => {
	dispatch(listPersonnel(token, "patient", pendingOnly));
	dispatch(listPersonnel(token, "counselor", pendingOnly));
	dispatch(listPersonnel(token, "doctor", pendingOnly))
}

export const updatePersonnel = (token: string | undefined, user: UserData, newStatus: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(personnelUpdateRequest())
		await axios.put(`/api/v1/mamager/updateUser?userId=${user.id}&status=${newStatus}`,
			{ 'headers': { 'Authorization': `Bearer ${token}` } });
		dispatch(personnelUpdateSuccess());
	} catch (err: any) {
		const errorMessage = err.response ? err.response.data.response : err.message
		console.log(errorMessage);
		dispatch(personnelUpdateFail(errorMessage));
	}
}

export const selectPersonnelList = (state: RootState) => state.personnelList;
export default personnelListSlice.reducer;