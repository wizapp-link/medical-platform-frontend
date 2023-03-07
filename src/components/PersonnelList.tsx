import React, { useState } from 'react';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut, selectUserLogIn } from '../features/auth/userLogInSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { roleToPosition } from '../constants/PositionRoleMap';
import { Stack } from '@mui/system';
import { UserData } from '../types/UserDataType';

interface PropsType {
	users: UserData[] | null,
	handleAssessmentButtonClick: (userData: UserData) => void,
	handleAccept: (userData: UserData) => void,
	handleReject: (userData: UserData) => void,
}


export default function PersonnelList(props: PropsType) {
	const { users, handleAssessmentButtonClick, handleAccept, handleReject } = props;
	return (
		<List>
			{users && users.map((user) => (
				<ListItem key={user.id} disablePadding>
					<ListItemAvatar>
						<Avatar alt={user.name} src="" />
					</ListItemAvatar>

					<ListItemText primary={user.name} secondary={`Type: ${roleToPosition.get(user.role)}`} />
					<Stack direction={"row"} padding={2} spacing={2}>
						<Button variant="outlined" onClick={() => handleAssessmentButtonClick(user)}>See-Infomation</Button>
						<Button variant="contained" onClick={() => { handleAccept(user) }}>Accept</Button>
						<Button variant="outlined" color="secondary" onClick={() => { handleReject(user) }}>Reject</Button>
					</Stack>
				</ListItem>
			))}
		</List>
	)
}
