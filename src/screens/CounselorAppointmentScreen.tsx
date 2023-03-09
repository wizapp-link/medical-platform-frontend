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
  Card,
  CardContent,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { counselorTheme } from "../Themes";

export default function CounselorAppointmentScreen(props: any) {
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
              <ListItem key={patient.id}>
                <Box sx={{ width: "100%" }}>
                  <Card sx={{ boxShadow: 3, marginTop: 1 }}>
                    <CardContent>
                      <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"row"}>
                          <ListItemAvatar
                            sx={{
                              display: "flex",
                              justifyItems: "center",
                              alignItems: "center",
                            }}
                          >
                            <Avatar alt="patient" src="" />
                          </ListItemAvatar>
                          <Stack direction={"column"} sx={{marginRight: 6}}>
                            <Typography>{patient.name}</Typography>
                            <Typography>{`ID: ${patient.id}`}2</Typography>
                          </Stack>
                          <ListItemAvatar
                            sx={{
                              display: "flex",
                              justifyItems: "center",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              alt="doctor"
                              src="/static/images/doctor/sampleDoctor.jpg"
                            />
                          </ListItemAvatar>
                          <Stack direction={"column"} >
                            <Typography>Dr. Gregory House</Typography>
                            <Typography>Date: 2023-02-12</Typography>
                          </Stack>
                        </Stack>
                        <Button variant="contained" color="secondary">
                          Remove
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              </ListItem>
            ))}
          </List>
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
