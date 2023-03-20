import { CheckBox } from "@mui/icons-material";
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
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { height } from "@mui/system";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { counselorTheme } from "../Themes";
import { useSelector } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import { flexbox } from "@mui/system";
import { spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { selectDoctor } from "../features/doctor/doctorSlice";
import { Patient } from "../types/PatientDataType";
import { ansList, questions } from "./PatientAssessmentScreen";

export default function CounselorDashboardScreen(props: any) {
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
  //   {
  //     id: 3,
  //     name: "Alex",
  //     selfAssessmentResults: [
  //       "Alex selfAssessmentResults",
  //       "Alex selfAssessmentResults2",
  //     ],
  //     address: "address3",
  //     dob: "1998/01/03",
  //     phoneNumber: "5140000002",
  //     emailAddress: "Alex@gmail.com",
  //     doctorRegistrationNumber: "99999999",
  //   },
  // ]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);

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
  };

  const { userInfo } = useAppSelector(selectUserLogIn);

  return (
    <ThemeProvider theme={counselorTheme}>
      <Stack padding={2} spacing={2}>
        <Typography variant="h4" color={"primary.contrastText"}>
          Good day! Dear {userInfo?.userData.name}!
        </Typography>
        <Typography variant="h5" color={"primary.contrastText"}>
          How can we help you?
        </Typography>
        {/* if the assessment is not completed */}
        {/* <Button variant="contained">Complete the assessment</Button> */}
        {/* if the assessment is completed, the patient can view the appointment schedule and decide to accept/reject it */}

        <Button
          variant="contained"
          onClick={handleAppointments}
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            ":hover": { backgroundColor: "primary.light" },
          }}
        >
          View Appointments
        </Button>

        <Divider />


        <Grid container direction="row">
          <Grid item container md={12} lg={6} direction="column">
            <Typography variant="h5" color={"primary.contrastText"} margin="1rem">
              Unassigned Patient List
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
                              onClick={() => handleAssessmentButtonClick(patient)}
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
                              onClick={() => { navigate(`../assignment?patientId=${patient.id}`) }}
                            >Assign</Button>
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
          <Grid item container md={12} lg={6} direction="column">
            <Typography variant="h5" color={"primary.contrastText"} margin="1rem">
              Pending Appointments for Me
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
                              onClick={() => handleAssessmentButtonClick(patient)}
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
        </Grid>


        {/* <Dialog open={showAssessmentDialog} onClose={handleClose}>
          <DialogTitle
            color={"primary.contrastText"}
            sx={{ fontWeight: "bold" }}
          >
            {selectedPatient?.name}
          </DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" color={"primary.contrastText"}>
              ID: {selectedPatient?.id}
            </Typography>
            <Typography variant="subtitle1" color={"primary.contrastText"}>
              Name: {selectedPatient?.name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Self-Assessment Results
            </Typography>
            <List>
              {selectedPatient?.selfAssessmentResults.map((result) => (
                <ListItem key={result} sx={{ color: "primary.contrastText" }}>
                  <ListItemText
                    primary={result}
                    sx={{ color: "primary.contrastText" }}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog> */}
        <Dialog open={showAssessmentDialog} onClose={handleClose}>
          <DialogTitle sx={{ fontWeight: "bold", fontSize: 30 }}>
            {selectedPatient?.name} Self-Assessment Results
          </DialogTitle>
          <DialogContent>
            <Stack direction={"row"} justifyContent={"space-around"}>
              <Typography variant="subtitle1">
                ID: {selectedPatient?.id}
              </Typography>
              <Typography variant="subtitle1">
                Name: {selectedPatient?.name}
              </Typography> </Stack>

            <Typography variant="h6" sx={{ fontWeight: "bold" }}>

            </Typography>
            <Stack spacing={2} pt={1}>
              {questions.map((question) => (
                <Paper key={question.id} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">{question.text}</Typography>
                  <Typography
                    variant="body1">{`${selectedPatient && selectedPatient.assessmentOptionsSelected[question.id - 1] ?
                    ansList[selectedPatient.assessmentOptionsSelected[question.id - 1].charCodeAt(0) - 97] : "N/A"
                  }`}</Typography>
                </Paper>
              ))}
            </Stack>
          </DialogContent>
        </Dialog>
      </Stack>
    </ThemeProvider>
  );
}
