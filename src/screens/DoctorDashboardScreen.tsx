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
  Card,
  CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions
} from "@mui/material";
import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { doctorTheme } from "../Themes";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import { useNavigate } from "react-router-dom";
import { closeSnackbar, fetchPatients, selectDoctor, updatePatientStatus } from "../features/doctor/doctorSlice";
import { useEffect, useState } from "react";
import { Patient } from "../types/PatientDataType";
import { roleToPosition } from "../constants/PositionRoleMap";
import { ansList, questions } from "./PatientAssessmentScreen";
import { setPatient } from "../features/appointment/appointmentSlice";
import ReduxSnackbar from "../components/ReduxSnackbar";

export default function DoctorDashboardScreen(props: any) {
  const doctor = useSelector((state: RootState) => state.doctor);
  const { userInfo } = useAppSelector(selectUserLogIn);
  const { patients } = useAppSelector(selectDoctor);

  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [reason, setReason] = useState("");
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  const [openConfirm, setConfirm] = useState(false);


  const role = userInfo?.userData.role;
  const position = roleToPosition.get(role ? role : "");
  const handleClickOpen = (patient: any) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssessmentButtonClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowAssessmentDialog(true);
  };

  const handleRejectConfirmDialog = () => {
    setConfirm(true);
  };
  const handleCloseConfirm = () => {
    setConfirm(false);
  };

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleAppointments = () => {
    navigate(`/doctor/appointments`);
  };
  const handleAccept = (patient: Patient) => {
    if (userInfo) {
      // dispatch(updatePatientStatus(patient.email, "SELF_ASSIGN", "", userInfo?.token, position));
      dispatch(setPatient(patient))
      setTimeout(() => {
        navigate("/doctor/modify_appointment");
      }, 500);
    }

  };

  const handleReject = () => {
    if (selectedPatient && userInfo) {
      dispatch(updatePatientStatus(selectedPatient.email, userInfo?.userData.email, "REJECT_PATIENT", reason, userInfo?.token, position,));
    }

    setReason("");
    setOpen(false);
    setConfirm(false);

  };


  useEffect(() => {
    if (userInfo)
      dispatch(fetchPatients(userInfo.userData.email, userInfo.token, position));
  }, [dispatch]);

  return (
    <ThemeProvider theme={doctorTheme}>
      <Stack padding={2} spacing={2}>
        <Typography variant="h4">
          Good day! Dear {userInfo?.userData.name}!
        </Typography>
        <Typography variant="h5">How can we help you?</Typography>
        {/* if the assessment is not completed */}
        {/* <Button variant="contained">Complete the assessment</Button> */}
        {/* if the assessment is completed, the patient can view the appointment schedule and decide to accept/reject it */}
        <Button variant="contained" onClick={handleAppointments}>
          View Appointments
        </Button>
        <Divider />

        <Stack>
          <Typography variant="h5">Incoming Patients</Typography>
          <List sx={{ flexGrow: 1 }}>
            {patients.map(
              patient => (
                patient.assessmentTaken && patient.assessmentOptionsSelected[0] != null &&
                <ListItem key={patient.id}>
                  <Box width={"100%"}>
                    <Card sx={{ boxShadow: 3, marginTop: 1 }}>
                      <CardContent>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                          <Stack direction={"row"}>
                            <ListItemAvatar sx={{ display: "flex" }}>
                              <Avatar sx={{ alignSelf: "center" }}
                                alt={patient.name}
                                src="/static/images/doctor/samplePatient.jpg"
                              />
                            </ListItemAvatar>
                            <Stack direction={"column"}>
                              <Typography>{patient.name}</Typography>
                              <Typography>{patient.email}</Typography>
                            </Stack>
                          </Stack>
                          <Stack direction={"row"}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleAssessmentButtonClick(patient)}
                              sx={{ marginRight: 2 }}
                              disabled={patient.assessmentOptionsSelected == null || patient.assessmentOptionsSelected.length === 0}
                            >
                              Self-Assessment
                            </Button>
                            <Button variant="contained"
                              sx={{ marginRight: 2 }}
                              onClick={() => handleAccept(patient)}
                            >
                              Accept
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => handleClickOpen(patient)}>
                              Reject
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                </ListItem>
              )
            )}

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
                <Button onClick={handleRejectConfirmDialog} color="error">
                  Reject
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openConfirm}
              onClose={handleCloseConfirm}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you want to reject this patient?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Once you click confirm, this rejection will not be withdrawn.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseConfirm}>Cancel</Button>
                <Button onClick={handleReject} autoFocus color="error">
                  Confirm
                </Button>
              </DialogActions>

            </Dialog>






          </List>
          <Dialog open={showAssessmentDialog} onClose={() => setShowAssessmentDialog(false)}>
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
                {"Counselor's comment:"}
              </Typography>
              <Typography variant="body1">{selectedPatient?.counsellingComment}</Typography>
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
        <ReduxSnackbar
          show={doctor.showSnackbar}
          loading={doctor.loading}
          success={doctor.success}
          error={doctor.error}
          message={doctor.message}
          onClose={() => dispatch(closeSnackbar())}
          autoHideDuration={5000} />
      </Stack>
    </ThemeProvider>
  );
}
