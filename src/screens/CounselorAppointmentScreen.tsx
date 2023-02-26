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

export default function CounselorAppointmentScreen(props: any) {
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
    // {
    //   id: 3,
    //   name: "Alex",
    //   selfAssessmentResults: ["Alex selfAssessmentResults", "Alex selfAssessmentResults2"],
    //   address: "address3",
    //   dob: "1998/01/03",
    //   phoneNumber: "5140000002",
    //   emailAddress: "Alex@gmail.com",
    //   doctorRegistrationNumber: "99999999"
    // }
  ]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  // const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  // const [showDetailDialog, setShowDetailDialog] = useState(false);

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


  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Accepted Patients
      </Typography>
      <List>
        {patients.map((patient) => (
          <ListItem key={patient.id} disablePadding>
            <ListItemAvatar>
              <Avatar alt="patient" src="" />
            </ListItemAvatar>
            <ListItemText primary={patient.name} secondary={`ID: ${patient.id}`} />
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained">Assign</Button>
              <Button variant="outlined" color="secondary">Remove</Button>
            </Stack>

          </ListItem>
        ))}
      </List>
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