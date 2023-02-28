import { CheckBox } from '@mui/icons-material';
import { Box, Typography, Stack, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, Checkbox, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import { height } from '@mui/system';


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



	return <Stack padding={2} spacing={2}>
		<Typography variant='h3'>
			Good day! Counselor!
		</Typography>
		<Typography variant='h5'>
			How can we help you?
		</Typography>
		{/* if the assessment is not completed */}
		{/* <Button variant="contained">Complete the assessment</Button> */}
		{/* if the assessment is completed, the patient can view the appointment schedule and decide to accept/reject it */}
		<Button variant="contained">View Appointments</Button>
		<Divider />


		<Stack>
			<Typography variant='h5'>
				Recent Patient List
			</Typography>
			<List>
				<ListItem>
					<List>
						{patients.map((patient) => (
							<ListItem key={patient.id} disablePadding>
								<Stack direction={"row"}>
									<Stack direction={"row"}>
										<ListItemAvatar>
											<Avatar alt="patient" src="" />
										</ListItemAvatar>
										<ListItemText primary={patient.name} secondary={`ID: ${patient.id}`} />
									</Stack>

									<Stack direction={"row"} >
										<Stack direction={"row"}>
											<Button
											sx={{
												marginLeft:5,
												width:180,
												height:40
											}}
											variant="outlined" onClick={() => handleAssessmentButtonClick(patient)}>Self-Assessment</Button>
											<Stack direction={"row"} spacing={2} sx={{marginLeft: 80}}>
												<Button sx={{height:40}} variant="contained">Assign</Button>
												<Button sx={{height:40}} variant="outlined" color="secondary">Reject</Button>
											</Stack>
										</Stack>
									</Stack>
								</Stack>

							</ListItem>
						))}

					</List>

					<Dialog open={showAssessmentDialog} onClose={handleClose}>
						<DialogTitle>{selectedPatient?.name}</DialogTitle>
						<DialogContent>
							<Typography variant="subtitle1">ID: {selectedPatient?.id}</Typography>
							<Typography variant="subtitle1">Name: {selectedPatient?.name}</Typography>
							<Typography variant="h6">Self-Assessment Results</Typography>
							<List>
								{selectedPatient?.selfAssessmentResults.map((result) => (
									<ListItem key={result}>
										<ListItemText primary={result} />
									</ListItem>
								))}
							</List>
						</DialogContent>
					</Dialog>

					<Divider variant="inset" component="li" />
				</ListItem>
			</List>

		</Stack>
	</Stack>
}