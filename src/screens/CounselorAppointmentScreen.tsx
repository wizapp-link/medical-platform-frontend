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
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { counselorTheme } from '../Themes';

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

  return (
    <ThemeProvider theme={counselorTheme}>
      <Box sx={{ padding: 2 }}>

        <Typography variant="h4" gutterBottom>
          Appointment List
          <List sx={{ marginTop: 3 }}>
            {patients.map((patient) => (
              <ListItem key={patient.id} disablePadding>
                <Box display="flex" justifyContent="space-between" flexGrow={1} alignItems="center">


                  <Box display="flex" alignContent="center" justifyContent="space-between" width="20rem">
                    <Box display="flex" alignContent="center" >
                      <ListItemAvatar sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
                        <Avatar alt="patient" src="" />
                      </ListItemAvatar>
                      <ListItemText primary={patient.name} secondary={`ID: ${patient.id}`}
                      />
                    </Box>

                    <Box display="flex" alignContent="center">
                      <ListItemAvatar sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
                        <Avatar alt="doctor" src="/static/images/doctor/sampleDoctor.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Dr. Gregory House"
                        secondary="Date: 2023-02-12 "
                      >
                        {" - 16:00 to 17:00"}
                      </ListItemText>
                    </Box>

                  </Box>

                  <Stack>
                    <Button variant="outlined" color="secondary">Remove</Button>

                  </Stack>
                </Box>
              </ListItem>
            ))}
          </List>
        </Typography>

      </Box>
    </ThemeProvider>
  );
}