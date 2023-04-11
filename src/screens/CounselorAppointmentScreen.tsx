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
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState, FormEvent } from "react";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { counselorTheme } from "../Themes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectDoctor } from "../features/doctor/doctorSlice";
import { Patient } from "../types/PatientDataType";
import {
  listAppointment,
  selectCounselorAppointmentList,
  updateAppointment,
} from "../features/counselor/counselorAppointmentSlice";
import { Appointment } from "../types/AppointmentType";
import { isAppointmentExpired } from "../utils/AppointmentConversion";
import {
  setLastDate,
  setLastTimeslot,
  setPatient,
} from "../features/appointment/appointmentSlice";
import { defaultPatient } from "../types/PatientDataType";
import { useNavigate } from "react-router";
import { selectUserLogIn, logIn, updateGoogleMeetLink } from '../features/auth/userLogInSlice';

export default function CounselorAppointmentScreen(props: any) {
  // const { patients } = useAppSelector(selectDoctor);

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
  // const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
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

  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [appointmentDetail, setAppointmentDetail] = useState<Appointment>();
  const { userInfo } = useAppSelector(selectUserLogIn);
  const counselorAppointmentList = useAppSelector(
    selectCounselorAppointmentList
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [meetingLink, setMeetingLink] = useState(userInfo ? userInfo.userData.googleMeetLink : "")

  const handleDetailButtonClick = (appointment: Appointment) => {
    setAppointmentDetail(appointment);
    setShowDetailDialog(true);
  };
  const handleClose = () => {
    setShowDetailDialog(false);
  };

  const handleModify = (appointment: Appointment) => {
    if (userInfo) {
      dispatch(
        setPatient({
          ...defaultPatient,
          email: appointment.slotAssignedTo,
          name: appointment.name,
        } as Patient)
      );
      dispatch(setLastDate(appointment.slotDate));
      dispatch(setLastTimeslot(appointment.slotTime));
      navigate("/counselor/modify_appointment");
    }
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(listAppointment(userInfo.token, userInfo.userData));
    }
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleMeetingOpen = () => {
    setOpen(true);
  };

  const handleMeetingSubmit = (e: FormEvent) => {
		e.preventDefault();
		//dispatch(link(meetingLink));
    setOpen(false);
    if (userInfo && meetingLink) {
      dispatch(updateGoogleMeetLink(userInfo.token, userInfo.userData, meetingLink))
      //setText("Changes updated successfully!");
    } else {
      //setText("Check missing fields!");
    }
	};

  const handleMeetingClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={counselorTheme}>
      <Grid item container>
        <Grid item container direction="column" md={12}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h4" marginLeft="1rem">
              Appointments Assigned
            </Typography>
            <Button
              onClick={handleMeetingOpen}
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "primary.contrastText",
                ":hover": { backgroundColor: "primary.main" },
              }}
            >
              Meeting Link
            </Button>
          </Stack>
          <List>
            {counselorAppointmentList.appointments.length === 0 && (
              <Typography variant="h5" color={"primary.contrastText"}>
                Empty
              </Typography>
            )}
            {counselorAppointmentList.appointments.map((appointment) => (
              <ListItem
                key={`${appointment.name}${appointment.slotDate}${appointment.slotTime}`}
              >
                <Box sx={{ width: "100%" }}>
                  <Card sx={{ marginTop: 2, boxShadow: 3 }}>
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row">
                          <ListItemAvatar sx={{ display: "flex" }}>
                            <Avatar
                              alt="doctor"
                              src="/static/images/doctor/sampleDoctor.jpg"
                              sx={{ alignSelf: "center" }}
                            />
                          </ListItemAvatar>
                          <Stack direction={"column"}>
                            <Typography>{appointment.name}</Typography>
                            <Typography>Date:{appointment.slotDate}</Typography>
                          </Stack>
                        </Stack>
                        <Stack direction={"row"}>
                          <Button
                            variant="contained"
                            // variant="outlined"
                            onClick={() => handleDetailButtonClick(appointment)}
                            sx={{
                              marginRight: 2,
                              backgroundColor: "primary",
                              color: "primary.contrastText",
                              ":hover": {
                                color: "primary.contrastText",
                                backgroundColor: "secondary.main",
                              },
                            }}
                          >
                            Details
                          </Button>
                          {appointment.status === "ASSIGNED" && (
                            <Button
                              variant="contained"
                              color="secondary"
                              sx={{
                                marginRight: 2,
                                borderColor: "secondary.dark",
                                ":hover": { backgroundColor: "secondary.dark" },
                              }}
                              onClick={() => handleModify(appointment)}
                              disabled={appointment.status !== "ASSIGNED"}
                            >
                              Modify
                            </Button>
                          )}

                          {(appointment.status !== "ASSIGNED" ||
                            isAppointmentExpired(appointment)) && (
                            <Button variant="outlined" disabled>
                              {appointment.status}
                              {isAppointmentExpired(appointment) && " EXPIRED"}
                            </Button>
                          )}
                        </Stack>
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
      <Dialog open={showDetailDialog} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Patient Name: {appointmentDetail?.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Slot Assigned By: {userInfo?.userData.email}
          </Typography>
          {/* <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Assessment Test
          </Typography>
          <Typography variant="subtitle1">
            Status: Pass
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Assignment Comment
          </Typography>
          <Typography variant="subtitle1">
            Counselor: Harsh Singh
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Appointment Comment
          </Typography> */}
          <Typography variant="subtitle1">
            Slot Assigned To: {appointmentDetail?.slotAssignedTo}
          </Typography>
          <Typography variant="subtitle1">
            Date: {appointmentDetail?.slotDate}
          </Typography>
          <Typography variant="subtitle1">
            Timeslot: {appointmentDetail?.slotTime}
          </Typography>
        </DialogContent>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Meeting Link</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: "primary.contrastText"}}>
            Please enter a valid Meeting Link!
          </DialogContentText>
          <form onSubmit={handleMeetingSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="meeting_link"
            label="Meeting Link"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setMeetingLink(e.target.value)}
            sx={{color: "primary.dark"}}
            value={meetingLink}
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMeetingClose} sx={{color: "primary.contrastText"}}>Cancel</Button>
          <Button onClick={handleMeetingSubmit} type="submit" sx={{color: "primary.contrastText"}}>Submit</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
