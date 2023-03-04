import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Dialog, DialogTitle, DialogContent
} from "@mui/material";
import * as React from "react";
import { useState } from "react";



export default function ManagerAppointmentScreen(props: any) {
	const [patients, setPatients] = useState<DoctorCounselor[]>([
		{
			id: 1,
			name: "Alice",
			type:"Doctor",
			address: "address",
			dob: "1998/01/01",
			phoneNumber: "5140000000",
			emailAddress: "Alice@gmail.com",
		}
		// {
		// 	id: 2,
		// 	name: "Rusbey",
		// 	type:"Doctor",
		// 	address: "address2",
		// 	dob: "1998/01/02",
		// 	phoneNumber: "5140000001",
		// 	emailAddress: "Ben@gmail.com",
		// },
		// {
		// 	id: 3,
		// 	name: "Mark",
		// 	type:"Counsellor",
		// 	address: "address3",
		// 	dob: "1998/01/03",
		// 	phoneNumber: "5140000002",
		// 	emailAddress: "Alex@gmail.com",
		// },
		// {
		// 	id: 3,
		// 	name: "Javad",
		// 	type:"Doctor",
		// 	address: "address3",
		// 	dob: "1998/01/03",
		// 	phoneNumber: "5140000002",
		// 	emailAddress: "Alex@gmail.com",
		// },
		// {
		// 	id: 3,
		// 	name: "Alexos",
		// 	type:"Counsellor",
		// 	address: "address3",
		// 	dob: "1998/01/03",
		// 	phoneNumber: "5140000002",
		// 	emailAddress: "Alex@gmail.com",
		// }

	]);
  const [selectedPatient, setSelectedPatient] = useState<DoctorCounselor | null>(null);
  // const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  // const [showDetailDialog, setShowDetailDialog] = useState(false);

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
	const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);

  // const handleAssessmentButtonClick = (patient: Patient) => {
  //   setSelectedPatient(patient);
  //   setShowAssessmentDialog(true);
  // };

  // const handleDetailButtonClick = (patient: Patient) => {
  //   setSelectedPatient(patient);
  //   setShowDetailDialog(true);
  // };

  // const handleClose = () => {
  //   setShowAssessmentDialog(false);
  //   setShowDetailDialog((false));
  // };

  const handleClose = () => {
		setShowAssessmentDialog(false);
		// setShowDetailDialog((false));
	};


  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Accepted Doctors and Counselors
      </Typography>
      <List>
        {patients.map((patient) => (
          <ListItem key={patient.id} disablePadding>
            <ListItemAvatar>
              <Avatar alt="patient" src="" />
            </ListItemAvatar>
            <ListItemText primary={patient.name} secondary={`Type: ${patient.type}`} />
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained"  onClick={() => handleAssessmentButtonClick(patient)}>View Info</Button>
              <Button variant="outlined" color="secondary">Remove</Button>
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
      
      {/* <Dialog open={showAssessmentDialog} onClose={handleClose}>
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
      </Dialog> */}
      {/* <Dialog open={showDetailDialog} onClose={handleClose}>
        <DialogTitle>{selectedPatient?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">ID: {selectedPatient?.id}</Typography>
          <Typography variant="subtitle1">Name: {selectedPatient?.name}</Typography>
          <Typography variant="h6">Detailed Information</Typography>
          <Typography variant="subtitle1">Address: {selectedPatient?.address}</Typography>
          <Typography variant="subtitle1">Date of Birth: {selectedPatient?.dob}</Typography>
          <Typography variant="subtitle1">Phone Number: {selectedPatient?.phoneNumber}</Typography>
          <Typography variant="subtitle1">Email Address: {selectedPatient?.emailAddress}</Typography>
          <Typography variant="subtitle1">
            Doctor Registration Number: {selectedPatient?.doctorRegistrationNumber}
          </Typography>
        </DialogContent>
      </Dialog> */}

    </Box>
  );

  
}