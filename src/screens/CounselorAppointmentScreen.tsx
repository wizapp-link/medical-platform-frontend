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
  Grid,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { counselorTheme } from "../Themes";
import { useAppSelector } from "../app/hooks";
import { selectDoctor } from "../features/doctor/doctorSlice";
import { Patient } from "../types/PatientDataType";

export default function CounselorAppointmentScreen(props: any) {
  const { patients } = useAppSelector(selectDoctor);

  // const [patients, setPatients] = useState<Patient[]>([
  //   {
  //     id: 1,
  //     name: "Alice",
  //     selfAssessmentResults: [
  //       "Alice selfAssessmentResults",
  //       "Alice selfAssessmentResults2",
  //     ],
  //     address: "address",
  //     dob: "1998/01/01",
  //     phoneNumber: "5140000000",
  //     emailAddress: "Alice@gmail.com",
  //     doctorRegistrationNumber: "88888888",
  //   },
  //   {
  //     id: 2,
  //     name: "Ben",
  //     selfAssessmentResults: [
  //       "Ben selfAssessmentResults",
  //       "Ben selfAssessmentResults2",
  //     ],
  //     address: "address2",
  //     dob: "1998/01/02",
  //     phoneNumber: "5140000001",
  //     emailAddress: "Ben@gmail.com",
  //     doctorRegistrationNumber: "77777777",
  //   },
  // ]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  // const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  // const [showDetailDialog, setShowDetailDialog] = useState(false);

  // type Patient = {
  //   id: number;
  //   name: string;
  //   selfAssessmentResults: string[];
  //   address: string;
  //   dob: string;
  //   phoneNumber: string;
  //   emailAddress: string;
  //   doctorRegistrationNumber: string;
  // };

  return (
    <ThemeProvider theme={counselorTheme}>
      <Grid item container>
        <Grid item container direction="column" md={12}>
          <Typography variant="h4" marginLeft="1rem">
            Appointments Assigned
          </Typography>
          <List>
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
                          <Stack direction={"column"} sx={{ marginRight: "1rem" }}>
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
                        <Box display="flex">
                          <Button variant="contained" color="secondary" sx={{ marginLeft: "1rem" }}>
                            Modify
                          </Button>
                          <Button variant="contained" color="secondary" sx={{ marginLeft: "1rem" }}>
                            Remove
                          </Button>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              </ListItem>
            ))}
          </List>

        </Grid>
        {/* <Grid item container direction="column" md={12} lg={6}>
          <Grid item container md={12} lg={6} direction="column">
            <Typography variant="h4" color={"primary.contrastText"} marginLeft="1rem">
              Appointments for Me
            </Typography>
            <List sx={{ flexGrow: 1 }}>
              {patients.map((patient) => (
                <ListItem key={patient.id}>
                  <Box sx={{ width: "100%" }}>
                    <Card sx={{ boxShadow: 3, marginTop: 1 }}>
                      <CardContent>
                        <Stack direction="row" justifyContent={"space-between"}>
                          <Stack direction="row">
                            <ListItemAvatar sx={{ display: "flex" }}>
                              <Avatar alt="patient" src="" sx={{ alignSelf: "center" }} />
                            </ListItemAvatar>
                            <Stack direction={"column"} sx={{ marginRight: 3 }}>
                              <Typography>{patient.name}</Typography>
                              <Typography>{`ID: ${patient.id}`}2</Typography>
                            </Stack>
                            <Button
                              variant="contained"
                            >
                              Self-Assessment
                            </Button>
                          </Stack>
                          <Stack
                            direction={"row"}
                            spacing={2}
                            sx={{ flexDirection: "row" }}
                          >
                            <Button variant="contained"
                            >Accept</Button>
                            <Button variant="contained" color="secondary">
                              Reject
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>

        </Grid> */}
      </Grid>
    </ThemeProvider>
  );
}
