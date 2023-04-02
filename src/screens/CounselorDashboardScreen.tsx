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
  Grid, DialogContentText, TextField, DialogActions
} from "@mui/material";
import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { height } from "@mui/system";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { counselorTheme } from "../Themes";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import { flexbox } from "@mui/system";
import { spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { selectDoctor, updatePatientStatus } from "../features/doctor/doctorSlice";
import { Patient } from "../types/PatientDataType";
import { ansList, questions } from "./PatientAssessmentScreen";
import { roleToPosition } from "../constants/PositionRoleMap";
import { fetchPatients, selectConselor } from "../features/counselor/counselorSlice"
import { setPatient } from "../features/counselor/counselorAssignmentSlice";

export default function CounselorDashboardScreen(props: any) {

  //todo: change patient
  // const { patients } = useAppSelector(selectDoctor);
  const { userInfo } = useAppSelector(selectUserLogIn);
  const position = "counsellor";
  const dispatch = useAppDispatch();
  const [patients, setPatients] = useState<Patient[]>([
    {
      address: "Test",
      assessmentOptionsSelected: ["a", "b", "c", "d", "b", "c", "a", "b", "c"],
      assessmentTaken: true,
      counsellingComment: "",
      counsellingDone: false,
      counsellorAssigned: "",
      creationDate: "2000-00-00",
      dob: "2000-00-00",
      doctorAssigned: null,
      doctorComment: null,
      doctoringDone: false,
      email: "Alex@123.456",
      id: "123456",
      name: "Alex",
      otp: null,
      otpExpiryDate: null,
      password: "",
      patientQueue: null,
      phone: "",
      registrationNo: null,
      role: "",
      status: "",
      verificationAttempts: null
    },
    {
      address: "Addr2",
      assessmentOptionsSelected: [],
      assessmentTaken: false,
      counsellingComment: "",
      counsellingDone: false,
      counsellorAssigned: "",
      creationDate: "2000-00-00",
      dob: "2003-00-00",
      doctorAssigned: null,
      doctorComment: null,
      doctoringDone: false,
      email: "Rui@123.456",
      id: "888888",
      name: "Rui",
      otp: null,
      otpExpiryDate: null,
      password: "",
      patientQueue: null,
      phone: "5140000000",
      registrationNo: null,
      role: "",
      status: "",
      verificationAttempts: null

    }]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

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

  const handleAccept = (patient: Patient) => {
    if (userInfo)
      dispatch(updatePatientStatus(patient.email, userInfo.userData.email, "SELF_ASSIGN", "", userInfo?.token, position));
  };

  const handleReject = () => {
    if (selectedPatient && userInfo)
      dispatch(updatePatientStatus(selectedPatient.email, userInfo?.userData.email, "REJECT_PATIENT", reason, userInfo?.token, position));
    setReason("");
    setOpen(false);
  };
  const handleClickOpen = (patient: any) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  const counselor = useAppSelector(selectConselor);


  useEffect(() => {
    if (userInfo) {
      dispatch(fetchPatients(userInfo.userData.email, userInfo.token));
    }
  }, [])


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
          <Grid item container md={12} direction="column">
            <Typography variant="h5" color={"primary.contrastText"} margin="1rem">
              Patient List
            </Typography>
            <List sx={{ flexGrow: 1 }}>
              {counselor.patients.map((patient) => (
                patient.assessmentTaken && <ListItem key={patient.id}>
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
                              <Typography>{`${patient.email}`}</Typography>
                            </Stack>
                            <Button
                              variant="contained"
                              onClick={() => handleAssessmentButtonClick(patient)}
                              disabled={!patient.assessmentTaken}
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
                              onClick={() => {
                                dispatch(setPatient(patient));
                                navigate(`/counselor/assignment`);
                              }}
                            >Assign</Button>
                            <Button variant="contained" color="secondary"
                              onClick={() => handleClickOpen(patient)}>
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
          {/* <Grid item container md={12} lg={6} direction="column">
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
                              disabled={patient.assessmentTaken}
                            >
                              Self-Assessment
                            </Button>
                          </Stack>
                          <Stack
                            direction={"row"}
                            spacing={2}
                            sx={{ flexDirection: "row" }}
                          >
                            <Button variant="contained" onClick={() => handleAccept(patient)}
                            >Accept</Button>
                            <Button variant="contained" color="secondary" onClick={() => handleClickOpen(patient)}>
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
          </Grid> */}
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

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Reject Patient {selectedPatient?.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide a reason for rejecting this patient.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Reason"
              type="text"
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleReject} color="error">
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </ThemeProvider>
  );
}