import {
  createTheme,
  ThemeProvider,
  colors,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
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
} from "@mui/material";
import * as React from "react";
import { patientTheme } from "../Themes";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { listAppointment, selectPatientAppointmentList, updateAppointment } from "../features/patient/patientAppointmentSlice";
import { Appointment } from "../types/AppointmentType";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import dayjs from "dayjs";
import { isAppointmentExpired } from "../utils/AppointmentConversion";


export default function PatientAppointmentScreen(props: any) {
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [appointmentDetail, setAppointmentDetail] = useState<Appointment>();
  const { userInfo } = useAppSelector(selectUserLogIn);
  const patientAppointmentList = useAppSelector(selectPatientAppointmentList);
  const dispatch = useAppDispatch();

  const handleDetailButtonClick = (appointment: Appointment) => {
    // setSelectedPatient(patient);
    setAppointmentDetail(appointment);
    setShowDetailDialog(true);
  };
  const handleClose = () => {
    // setShowAssessmentDialog(false);
    setShowDetailDialog(false);
  };
  const handleAccept = (appointment: Appointment) => {
    if (userInfo) {
      dispatch(updateAppointment(userInfo.token, userInfo.userData, appointment, "ACCEPTED"));
    }
  }
  const handleReject = (appointment: Appointment) => {
    if (userInfo) {
      dispatch(updateAppointment(userInfo.token, userInfo.userData, appointment, "REJECTED"));
    }
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(listAppointment(userInfo.token, userInfo.userData))
    }
  }, [])

  return (
    <ThemeProvider theme={patientTheme}>
      <Stack>
        <Typography variant="h5" color={"primary.contrastText"}>
          Appointment History
        </Typography>
        <List>
          {patientAppointmentList.appointments.map((appointment) =>
          (<ListItem key=
            {`${appointment.name}${appointment.slotDate}${appointment.slotTime}`}
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
                      {appointment.status === "ASSIGNED" &&
                        !isAppointmentExpired(appointment) &&
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{
                            color: "primary.contrastText",
                            marginRight: 2,
                            borderColor: "secondary.dark",
                            ":hover": { backgroundColor: "secondary.dark" },
                          }}
                          onClick={() => handleReject(appointment)}
                        >
                          Reject
                        </Button>
                      }
                      {appointment.status === "ASSIGNED" &&
                        !isAppointmentExpired(appointment) &&
                        <Button
                          variant="outlined"
                          onClick={() => handleAccept(appointment)}
                          sx={{
                            backgroundColor: "primary.dark",
                            color: "primary.contrastText",
                            ":hover": { backgroundColor: "primary.main" },
                          }}
                        >
                          Accept
                        </Button>
                      }

                      {(appointment.status !== "ASSIGNED" ||
                        isAppointmentExpired(appointment)) &&
                        <Button
                          variant="outlined"
                          disabled
                        >
                          {appointment.status}
                          {isAppointmentExpired(appointment) && " EXPIRED"}
                        </Button>
                      }
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </ListItem>)
          )}

        </List>

      </Stack>
      <Dialog open={showDetailDialog} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Patient Name: Rui
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Patient ID: 1
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
          </Typography>
          <Typography variant="subtitle1">
            Doctor: Dr. Gregory House
          </Typography>
          <Typography variant="subtitle1">
            Date: 2023-02-12
          </Typography>
          <Typography variant="subtitle1">
            Notes:
          </Typography>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
