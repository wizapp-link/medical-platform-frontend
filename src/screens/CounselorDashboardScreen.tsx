import { CheckBox } from '@mui/icons-material';
import { Box, Typography, Stack, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, Checkbox, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import { height } from '@mui/system';
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { counselorTheme } from '../Themes';
import { useSelector } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { selectUserLogIn } from '../features/auth/userLogInSlice';
import { flexbox } from '@mui/system';
import { spacing } from '@mui/system';
import { useNavigate } from 'react-router-dom';



export default function CounselorDashboardScreen(props: any) {
	const [patients, setPatients] = useState<Patient[]>([
		{
			id: 1,
			name: "Alice",
			selfAssessmentResults: ["Alice selfAssessmentResults", "Alice selfAssessmentResults2"],
			address: "address",
			dob: "1998/01/01",
			phoneNumber: "5140000000",
			emailAddress: "Alice@gmail.com",
			doctorRegistrationNumber: "88888888"
		},
		{
			id: 2,
			name: "Ben",
			selfAssessmentResults: ["Ben selfAssessmentResults", "Ben selfAssessmentResults2"],
			address: "address2",
			dob: "1998/01/02",
			phoneNumber: "5140000001",
			emailAddress: "Ben@gmail.com",
			doctorRegistrationNumber: "77777777"
		},
		{
			id: 3,
			name: "Alex",
			selfAssessmentResults: ["Alex selfAssessmentResults", "Alex selfAssessmentResults2"],
			address: "address3",
			dob: "1998/01/03",
			phoneNumber: "5140000002",
			emailAddress: "Alex@gmail.com",
			doctorRegistrationNumber: "99999999"
		}

	]);
	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
	const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);

	type Patient = {
		id: number;
		name: string;
		selfAssessmentResults: string[];
		address: string;
		dob: string;
		phoneNumber: string;
		emailAddress: string;
		doctorRegistrationNumber: string;
	};
	const handleAssessmentButtonClick = (patient: Patient) => {
		setSelectedPatient(patient);
		setShowAssessmentDialog(true);
	};
	const handleClose = () => {
		setShowAssessmentDialog(false);
		// setShowDetailDialog((false));
	};
	const navigate = useNavigate();
	const handleAppointments = () => {
		navigate(`/counselor/appointments`);
	}
	
	const { userInfo } = useAppSelector(selectUserLogIn);



	return <ThemeProvider theme={counselorTheme}>
		<Stack padding={2} spacing={2}>
			<Typography variant='h3' color={'primary.contrastText'}>
				Good day! {userInfo?.userData.name}!
			</Typography>
			<Typography variant='h5' color={'primary.contrastText'}>
				How can we help you?
			</Typography>
			{/* if the assessment is not completed */}
			{/* <Button variant="contained">Complete the assessment</Button> */}
			{/* if the assessment is completed, the patient can view the appointment schedule and decide to accept/reject it */}
			
			<Button variant="contained" 
			onClick={handleAppointments}
			sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', ":hover": { backgroundColor: 'primary.light' } }}>
				View Appointments
				</Button>
				
			<Divider />
			<Typography variant='h5' color={'primary.contrastText'}>
				Recent Patient List
			</Typography>

			<List >
				{patients.map((patient) => (
					<ListItem key={patient.id} disablePadding>
						<ListItemAvatar>
							<Avatar alt="patient" src="" />
						</ListItemAvatar>
						<ListItemText primary={patient.name} secondary={`ID: ${patient.id}`}
							sx={{
								flexGrow: 0,
								flexShrink: 0,
								flexBasis: '5%'
							}} />
						<Box display="flex" justifyContent="space-between" flexGrow={1}>
							<Button variant="contained" onClick=
								{() => handleAssessmentButtonClick(patient)}>
								Self-Assessment
							</Button>


							<Stack direction="row" spacing={2} sx={{ flexDirection: 'row', }}>
								<Button variant="contained">Assign</Button>
								<Button variant="contained" color="secondary">Reject</Button>
							</Stack>
						</Box>


					</ListItem>
				))}



			</List>

			<Dialog open={showAssessmentDialog} onClose={handleClose}>
				<DialogTitle color={'primary.contrastText'}>{selectedPatient?.name}</DialogTitle>
				<DialogContent>
					<Typography variant="subtitle1" color={'primary.contrastText'}>ID: {selectedPatient?.id}</Typography>
					<Typography variant="subtitle1" color={'primary.contrastText'}>Name: {selectedPatient?.name}</Typography>
					<Typography variant="h6">Self-Assessment Results</Typography>
					<List>
						{selectedPatient?.selfAssessmentResults.map((result) => (
							<ListItem key={result} sx={{ color: 'primary.contrastText' }}>
								<ListItemText primary={result} sx={{ color: 'primary.contrastText' }} />
							</ListItem>
						))}
					</List>
				</DialogContent>
			</Dialog>

		</Stack>
	</ThemeProvider>
}