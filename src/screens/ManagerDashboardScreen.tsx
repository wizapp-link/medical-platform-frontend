
import { CheckBox } from '@mui/icons-material';
import { Box, Typography, Stack, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, Checkbox, IconButton, Dialog, DialogTitle, DialogContent, Snackbar } from '@mui/material';
import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState, useEffect } from "react";
import { UserData } from '../types/UserDataType';
import { selectUserLogIn } from '../features/auth/userLogInSlice';
import { selectPersonnelList, listAllPersonnel, updatePersonnel, listPersonnel } from '../features/manager/personnelsSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { roleToPosition } from '../constants/PositionRoleMap';
import PersonnelList from '../components/PersonnelList';
import personnelStatus from '../constants/PersonnelStatus';


export default function ManagerDashboardScreen(props: any) {
	const { userInfo } = useAppSelector(selectUserLogIn);
	const personnelList = useAppSelector(selectPersonnelList);
	const dispatch = useAppDispatch();

	const [selectedPerson, setSelectedPerson] = useState<UserData | null>(null);
	const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
	const [personnelUpdateMessage, setPersonnelUpdateMessage] = useState(personnelList.personnelUpdateMessage);

	const handleAssessmentButtonClick = (user: UserData) => {
		setSelectedPerson(user);
		setShowAssessmentDialog(true);
	};
	const handleClose = () => {
		setShowAssessmentDialog(false);
		// setShowDetailDialog((false));
	};

	const handleAccept = (user: UserData) => {
		dispatch(updatePersonnel(userInfo?.token, user, personnelStatus.verified))
		dispatch(listPersonnel(userInfo?.token, user.role, true))
	}

	const handleReject = (user: UserData) => {
		dispatch(updatePersonnel(userInfo?.token, user, personnelStatus.declined))
		dispatch(listPersonnel(userInfo?.token, user.role, true))
	}

	// const [successfullyReject, setSuccessfullyReject] = useState(false)
	// const [successfullyAccept, setSuccessfullyAccept] = useState(false)
	// const [, setOpenChanged] = useState(false)
	// const [openNotFilled, setOpenNotFilled] = useState(false)

	const handleSnackbarClose = () => {
		setPersonnelUpdateMessage("")
	};

	useEffect(() => {
		dispatch(listAllPersonnel(userInfo?.token, true));
	}, [])

	return <Stack padding={2} spacing={2}>
		<Typography variant='h3'>
			Good day! Manager {userInfo?.userData.name}!
		</Typography>
		{/* <Typography variant='h5'>
			How can we help you?
		</Typography> */}
		{/* if the assessment is not completed */}
		{/* <Button variant="contained">Complete the assessment</Button> */}
		{/* if the assessment is completed, the patient can view the appointment schedule and decide to accept/reject it */}
		{/* <Button variant="contained">View Appointments</Button>
		<Divider /> */}


		<Stack spacing={3}>
			<Typography variant='h5'>
				Recent list of requests
			</Typography>
			{personnelList.personnel &&
				<Box>
					{personnelList.personnel.pendingCounselors && <Typography variant='h6'>
						Counselors
					</Typography>}
					<PersonnelList
						users={personnelList.personnel.pendingCounselors} handleAssessmentButtonClick={handleAssessmentButtonClick}
						handleAccept={handleAccept}
						handleReject={handleReject}
					/>
					{personnelList.personnel.pendingDoctors && <Typography variant='h6'>
						Doctors
					</Typography>}
					<PersonnelList
						users={personnelList.personnel.pendingDoctors}
						handleAssessmentButtonClick={handleAssessmentButtonClick}
						handleAccept={handleAccept}
						handleReject={handleReject}
					/>
				</Box>

			}

		</Stack>
		<Dialog open={showAssessmentDialog} onClose={handleClose}>
			<DialogTitle>{selectedPerson?.name}</DialogTitle>
			<DialogContent>
				<Typography variant="subtitle1">ID: {selectedPerson?.id}</Typography>
				<Typography variant="subtitle1">Name: {selectedPerson?.name}</Typography>
				<Typography variant="h6">Registration Information</Typography>
				<Typography variant="subtitle1">Address: {selectedPerson?.address}</Typography>
				<Typography variant="subtitle1">DOB: {selectedPerson?.dob}</Typography>
				<Typography variant="subtitle1">Phone Number: {selectedPerson?.phone}</Typography>
				<Typography variant="subtitle1">Type: {selectedPerson ? roleToPosition.get(selectedPerson?.role) : null}</Typography>
				<Typography variant="subtitle1">Email Address: {selectedPerson?.email}</Typography>


			</DialogContent>
		</Dialog>
		<Snackbar
			open={personnelUpdateMessage !== ""}
			message={personnelUpdateMessage}
			autoHideDuration={5000}
			onClose={handleSnackbarClose}
		/>
	</Stack>
}
