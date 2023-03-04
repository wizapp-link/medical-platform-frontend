import { CheckBox } from '@mui/icons-material';
import { Box, Typography, Stack, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, Checkbox, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";


export default function ManagerDashboardScreen(props: any) {
	const [patients, setPatients] = useState<DoctorCounselor[]>([
		{
			id: 1,
			name: "Alice",
			type:"Doctor",
			address: "address",
			dob: "1998/01/01",
			phoneNumber: "5140000000",
			emailAddress: "Alice@gmail.com",
		},
		{
			id: 2,
			name: "Rusbey",
			type:"Doctor",
			address: "address2",
			dob: "1998/01/02",
			phoneNumber: "5140000001",
			emailAddress: "Ben@gmail.com",
		},
		{
			id: 3,
			name: "Mark",
			type:"Counsellor",
			address: "address3",
			dob: "1998/01/03",
			phoneNumber: "5140000002",
			emailAddress: "Alex@gmail.com",
		},
		{
			id: 3,
			name: "Javad",
			type:"Doctor",
			address: "address3",
			dob: "1998/01/03",
			phoneNumber: "5140000002",
			emailAddress: "Alex@gmail.com",
		},
		{
			id: 3,
			name: "Alexos",
			type:"Counsellor",
			address: "address3",
			dob: "1998/01/03",
			phoneNumber: "5140000002",
			emailAddress: "Alex@gmail.com",
		}

	]);
	const [selectedPatient, setSelectedPatient] = useState<DoctorCounselor | null>(null);
	const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);

	type DoctorCounselor = {
		id: number;
		type:string;
		name: string;
		// registrationDeta: string[];
		address: string;
		dob: string;
		phoneNumber: string;
		emailAddress: string;
	};
	const handleAssessmentButtonClick = (patient: DoctorCounselor) => {
		setSelectedPatient(patient);
		setShowAssessmentDialog(true);
	};
	const handleClose = () => {
		setShowAssessmentDialog(false);
		// setShowDetailDialog((false));
	};



	return <Stack padding={2} spacing={2}>
		<Typography variant='h3'>
			Good day! Manager!
		</Typography>
		{/* <Typography variant='h5'>
			How can we help you?
		</Typography> */}
		{/* if the assessment is not completed */}
		{/* <Button variant="contained">Complete the assessment</Button> */}
		{/* if the assessment is completed, the patient can view the appointment schedule and decide to accept/reject it */}
		{/* <Button variant="contained">View Appointments</Button>
		<Divider /> */}


		<Stack>
			<Typography variant='h5'>
				Recent list of requests
			</Typography>
			<List>
				<ListItem
				// secondaryAction={
				// 	<Stack
				// 		direction={'column'}
				// 		spacing={1}
				// 	>
				// 		<Button variant="contained">Accept</Button>
				// 		<Button variant="outlined" color="secondary">Reject</Button>
				// 		{/* <IconButton color="primary"><CheckCircleIcon /></IconButton>
				// 	<IconButton color="secondary"><CancelIcon /></IconButton> */}
				// 	</Stack>
				// }
				>
					{/* <ListItemAvatar>
						<Avatar alt="doctor" src="/static/images/doctor/sampleDoctor.jpg" />
					</ListItemAvatar>
					<ListItemText
						primary="Dr. Gregory House"
						secondary="Date: 2023-02-12 "
					>
						{" - 16:00 to 17:00"}
					</ListItemText> */}
					<List>
						{patients.map((patient) => (
							<ListItem key={patient.type} disablePadding>
								<ListItemAvatar>
									<Avatar alt="patient" src="" />
								</ListItemAvatar>

								<ListItemText primary={patient.name} secondary={`Type: ${patient.type}`} />
								<Stack direction={"row"} padding={2} spacing={2}>
									<Button variant="outlined" onClick={() => handleAssessmentButtonClick(patient)}>See-Infomation</Button>
									<Button variant="contained">Accept</Button>
									<Button variant="outlined" color="secondary">Reject</Button>
								</Stack>
							</ListItem>
						))}

					</List>

					<Dialog open={showAssessmentDialog} onClose={handleClose}>
						<DialogTitle>{selectedPatient?.name}</DialogTitle>
						<DialogContent>
							<Typography variant="subtitle1">ID: {selectedPatient?.id}</Typography>
							<Typography variant="subtitle1">Name: {selectedPatient?.name}</Typography>
							<Typography variant="h6">Registration Information</Typography>
							<Typography variant="subtitle1">Address: {selectedPatient?.address}</Typography>
							<Typography variant="subtitle1">DOB: {selectedPatient?.dob}</Typography>
							<Typography variant="subtitle1">Phone Number: {selectedPatient?.phoneNumber}</Typography>
							<Typography variant="subtitle1">Type: {selectedPatient?.type}</Typography>
							<Typography variant="subtitle1">Email Address: {selectedPatient?.emailAddress}</Typography>


						</DialogContent>
					</Dialog>

					<Divider variant="inset" component="li" />
				</ListItem>
			</List>

		</Stack>
	</Stack>
}