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
  CardContent,
} from "@mui/material";
import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { doctorTheme } from "../Themes";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboardScreen(props: any) {
  const doctor = useSelector((state: RootState) => state.doctor);
  const { userInfo } = useAppSelector(selectUserLogIn);

  const navigate = useNavigate();
  const handleAppointments = () => {
    navigate(`/doctor/appointments`);
  };

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
          <Typography variant="h5">Recent Appointments</Typography>
          <List>
            <ListItem>
              <Box width={"100%"}>
                <Card sx={{ boxShadow: 3, marginTop: 1 }}>
                  <CardContent>
                    <Stack direction={"row"}>
                      <ListItemAvatar>
                        <Avatar
                          alt="Jack Napier"
                          src="/static/images/doctor/samplePatient.jpg"
                        />
                      </ListItemAvatar>
                      <Stack direction={"column"} marginRight={'70%'}>
                        <Typography>Jack Niper</Typography>
                        <Typography>Date: 2023-02-12</Typography>
                      </Stack>
                      <Button variant="contained" sx={{marginRight: 2}}>Accept</Button>
                      <Button variant="contained" color="secondary">
                        Reject
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
