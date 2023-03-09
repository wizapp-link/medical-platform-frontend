import React, { useState } from 'react';
import { Avatar, Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut, selectUserLogIn } from '../features/auth/userLogInSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { roleToPosition } from '../constants/PositionRoleMap';
import { Stack } from '@mui/system';
import { UserData } from '../types/UserDataType';

interface Props {
	open: boolean,
	onClose: () => void,
	selectedPerson: UserData | null,
}

export default function PersonnelDetailDialog(props: Props) {
	const { open, onClose, selectedPerson } = props;

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle sx={{ fontWeight: "bold" }}>{selectedPerson?.name}</DialogTitle>
			<DialogContent>
				<Typography variant="subtitle1">
					ID: {selectedPerson?.id}
				</Typography>
				<Typography variant="subtitle1">
					Name: {selectedPerson?.name}
				</Typography>
				<Typography variant="h6" sx={{ fontWeight: "bold" }}>Registration Information</Typography>
				<Typography variant="subtitle1">
					Address: {selectedPerson?.address}
				</Typography>
				<Typography variant="subtitle1">
					DOB: {selectedPerson?.dob}
				</Typography>
				<Typography variant="subtitle1">
					Phone Number: {selectedPerson?.phone}
				</Typography>
				<Typography variant="subtitle1">
					Type:{" "}
					{selectedPerson ? roleToPosition.get(selectedPerson?.role) : null}
				</Typography>
				<Typography variant="subtitle1">
					Email Address: {selectedPerson?.email}
				</Typography>
				{selectedPerson?.registrationNo != null && <Typography variant="subtitle1">
					Registration Number: {selectedPerson?.registrationNo}
				</Typography>}
			</DialogContent>
		</Dialog>)
}