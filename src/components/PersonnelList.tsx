import React, { useState } from 'react';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut, selectUserLogIn } from '../features/auth/userLogInSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { roleToPosition } from '../constants/PositionRoleMap';
import { Stack } from '@mui/system';
import { UserData } from '../types/UserDataType';
import personnelStatus from '../constants/PersonnelStatus';

interface PropsType {
	users: UserData[] | null,
	handleAssessmentButtonClick: (userData: UserData) => void,
	handleAccept: (userData: UserData) => void,
	handleReject: (userData: UserData) => void,
}


export default function PersonnelList(props: PropsType) {
	const { users, handleAssessmentButtonClick, handleAccept, handleReject } = props;

	// const [canAccept, setCanAccept] = useState(false);
	// const [canReject, setCanReject] = useState(false);

	return (
		<List>
			{users && users.map((user) => (
				<ListItem key={user.id} disablePadding>
					<ListItemAvatar>
						<Avatar alt={user.name} src="" />
					</ListItemAvatar>

					<ListItemText primary={user.name} secondary={`Email: ${user.email}`} />
					<Stack direction={"row"} padding={2} spacing={2}>
						<Button variant="outlined" onClick={() => handleAssessmentButtonClick(user)}>See-Infomation</Button>
						<Button variant="contained" onClick={() => { handleAccept(user) }}
							disabled={user.status === personnelStatus.verified}
						>
							{user.status === personnelStatus.verified ? "Accepted" : "Accept"}
						</Button>
						<Button variant="contained" color="secondary"
							onClick={() => { handleReject(user) }}
							disabled={user.status === personnelStatus.declined}
						>
							{user.status === personnelStatus.declined ? "Rejected" : "Reject"}
						</Button>
					</Stack>
				</ListItem>
			))}
		</List>
	)
}
