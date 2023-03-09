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
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  ThemeProvider,
  CardContent,
  Card,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { doctorTheme } from "../Themes";

export default function DoctorAppointmentScreen(props: any) {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Alice",
      selfAssessmentResults: [
        "Alice selfAssessmentResults",
        "Alice selfAssessmentResults2",
      ],
      address: "address",
      dob: "1998/01/01",
      phoneNumber: "5140000000",
      emailAddress: "Alice@gmail.com",
      doctorRegistrationNumber: "88888888",
    },
    {
      id: 2,
      name: "Ben",
      selfAssessmentResults: [
        "Ben selfAssessmentResults",
        "Ben selfAssessmentResults2",
      ],
      address: "address2",
      dob: "1998/01/02",
      phoneNumber: "5140000001",
      emailAddress: "Ben@gmail.com",
      doctorRegistrationNumber: "77777777",
    },
    {
      id: 3,
      name: "Alex",
      selfAssessmentResults: [
        "Alex selfAssessmentResults",
        "Alex selfAssessmentResults2",
      ],
      address: "address3",
      dob: "1998/01/03",
      phoneNumber: "5140000002",
      emailAddress: "Alex@gmail.com",
      doctorRegistrationNumber: "99999999",
    },
  ]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

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

  const handleDetailButtonClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDetailDialog(true);
  };

  const handleClose = () => {
    setShowAssessmentDialog(false);
    setShowDetailDialog(false);
  };

  return (
    <ThemeProvider theme={doctorTheme}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Assigned Patients
        </Typography>
        <List>
          {patients.map((patient) => (
            <ListItem key={patient.id}>
              <Box sx={{ width: "100%" }}>
                <Card sx={{ boxShadow: 3, marginTop: 1 }}>
                  <CardContent>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack direction={"row"}>
                        <ListItemAvatar>
                          <Avatar alt="patient" src="" />
                        </ListItemAvatar>
                        <Stack direction={"column"}>
                          <Typography>{patient.name}</Typography>
                          <Typography>{`ID: ${patient.id}`}2</Typography>
                        </Stack>
                      </Stack>
                      <Stack direction={"row"}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAssessmentButtonClick(patient)}
                          sx={{ marginRight: 2 }}
                        >
                          Self-Assessment
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDetailButtonClick(patient)}
                        >
                          View Details
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </ListItem>
          ))}
        </List>
        <Dialog open={showAssessmentDialog} onClose={handleClose}>
          <DialogTitle sx={{ fontWeight: "bold" }}>
            {selectedPatient?.name}
          </DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1">
              ID: {selectedPatient?.id}
            </Typography>
            <Typography variant="subtitle1">
              Name: {selectedPatient?.name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Self-Assessment Results
            </Typography>
            <List>
              {selectedPatient?.selfAssessmentResults.map((result) => (
                <ListItem key={result}>
                  <ListItemText primary={result} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
        <Dialog open={showDetailDialog} onClose={handleClose}>
          <DialogTitle sx={{ fontWeight: "bold" }}>
            {selectedPatient?.name}
          </DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1">
              ID: {selectedPatient?.id}
            </Typography>
            <Typography variant="subtitle1">
              Name: {selectedPatient?.name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Detailed Information
            </Typography>
            <Typography variant="subtitle1">
              Address: {selectedPatient?.address}
            </Typography>
            <Typography variant="subtitle1">
              Date of Birth: {selectedPatient?.dob}
            </Typography>
            <Typography variant="subtitle1">
              Phone Number: {selectedPatient?.phoneNumber}
            </Typography>
            <Typography variant="subtitle1">
              Email Address: {selectedPatient?.emailAddress}
            </Typography>
            <Typography variant="subtitle1">
              Doctor Registration Number:{" "}
              {selectedPatient?.doctorRegistrationNumber}
            </Typography>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
