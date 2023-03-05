import { CheckBox, Fullscreen } from "@mui/icons-material";
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
  DialogActions,
  Tabs,
  Tab,
} from "@mui/material";
import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";

import { height } from "@mui/system";

import { createTheme, ThemeProvider, colors } from "@mui/material";
import { counselorTheme } from "../Themes";

export default function ManagerDashboardScreen(props: any) {
  const [doctors, setDoctor] = useState<Doctor[]>([
    {
      name: "Alice",
      address: "address",
      dob: "1998/01/01",
      phoneNumber: 5140000000,
      emailAddress: "Alice@gmail.com",
      doctorRegistrationNumber: "88888888",
    },
    {
      name: "Ben",
      address: "address2",
      dob: "1998/01/02",
      phoneNumber: 5140000001,
      emailAddress: "Ben@gmail.com",
      doctorRegistrationNumber: "77777777",
    },
    {
      name: "Alex",
      address: "address3",
      dob: "1998/01/03",
      phoneNumber: 5140000002,
      emailAddress: "Alex@gmail.com",
      doctorRegistrationNumber: "99999999",
    },
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);

  type Doctor = {
    name: string;
    emailAddress: string;
    phoneNumber: number;
    dob: string;
    address: string;
    doctorRegistrationNumber: string;
  };
  const handleAssessmentButtonClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowAssessmentDialog(true);
  };
  const handleClose = () => {
    setShowAssessmentDialog(false);
    // setShowDetailDialog((false));
  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (
    event: any,
    newTabIndex: React.SetStateAction<number>
  ) => {
    setTabIndex(newTabIndex);
  };

  return (
    <ThemeProvider theme={counselorTheme}>
      <Stack padding={2} spacing={2}>
        <Typography variant="h3">Good day! Manager!</Typography>
        {/* if the assessment is not completed */}
        {/* <Button variant="contained">Complete the assessment</Button> */}
        {/* if the assessment is completed, the patient can view the appointment schedule and decide to accept/reject it */}
        <Divider />

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Doctors" sx={{ width: 500 }} />
            <Tab label="Counselors" sx={{ width: 500 }} />
            <Tab label="Patients" sx={{ width: 500 }} />
          </Tabs>
        </Box>
        <Box>
          {tabIndex === 0 && (
            <Box>
              <Stack>
                <Typography variant="h5">Doctors</Typography>
                <List>
                  <ListItem>
                    <List>
                      {doctors.map((doctor) => (
                        <ListItem
                          key={doctor.doctorRegistrationNumber}
                          disablePadding
                        >
                          <ListItemAvatar>
                            <Avatar alt="doctor" src="" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={doctor.name}
                            secondary={`ID: ${doctor.doctorRegistrationNumber}`}
                            sx={{
                              flexGrow: 0,
                              flexShrink: 0,
                              flexBasis: "5%",
                            }}
                          />
                          <ListItemText primary="   " />
                          <Button
                            sx={{
                              flexGrow: 0,
                              flexShrink: 0,
                              width: 80,
                              height: 40,
                            }}
                            variant="outlined"
                            onClick={() => handleAssessmentButtonClick(doctor)}
                          >
                            Details
                          </Button>

                          <Stack direction={"row"} spacing={2} pl={90}>
                            <Button sx={{ height: 50 }} variant="contained">
                              Accept
                            </Button>
                            <Button
                              sx={{ height: 50 }}
                              variant="outlined"
                              color="secondary"
                            >
                              Reject
                            </Button>
                          </Stack>
                        </ListItem>
                      ))}
                    </List>

                    <Dialog
                      open={showAssessmentDialog}
                      onClose={handleClose}
                      fullScreen
                    >
                      <DialogTitle color={"primary.contrastText"}>
                        {selectedDoctor?.name}
                      </DialogTitle>
                      <DialogContent>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Name: {selectedDoctor?.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          ID: {selectedDoctor?.doctorRegistrationNumber}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Address: {selectedDoctor?.address}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Date of Birth: {selectedDoctor?.dob}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Phone Number: {selectedDoctor?.phoneNumber}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Email Address: {selectedDoctor?.emailAddress}
                        </Typography>
                        <DialogActions>
                          <Stack direction={"row"} spacing={2} pl={90}>
                            <Button sx={{ height: 40 }} variant="contained">
                              Assign
                            </Button>
                            <Button
                              sx={{ height: 40 }}
                              variant="outlined"
                              color="secondary"
                            >
                              Reject
                            </Button>
                          </Stack>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>

                    <Divider variant="inset" component="li" />
                  </ListItem>
                </List>
              </Stack>
            </Box>
          )}
          {tabIndex === 1 && (
            <Box>
              <Stack>
                <Typography variant="h5">Counselors</Typography>
                <List>
                  <ListItem>
                    <List>
                      {doctors.map((doctor) => (
                        <ListItem
                          key={doctor.doctorRegistrationNumber}
                          disablePadding
                        >
                          <ListItemAvatar>
                            <Avatar alt="doctor" src="" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={doctor.name}
                            secondary={`ID: ${doctor.doctorRegistrationNumber}`}
                            sx={{
                              flexGrow: 0,
                              flexShrink: 0,
                              flexBasis: "5%",
                            }}
                          />
                          <ListItemText primary="   " />
                          <Button
                            sx={{
                              flexGrow: 0,
                              flexShrink: 0,
                              width: 80,
                              height: 40,
                            }}
                            variant="outlined"
                            onClick={() => handleAssessmentButtonClick(doctor)}
                          >
                            Details
                          </Button>

                          <Stack direction={"row"} spacing={2} pl={90}>
                            <Button sx={{ height: 50 }} variant="contained">
                              Accept
                            </Button>
                            <Button
                              sx={{ height: 50 }}
                              variant="outlined"
                              color="secondary"
                            >
                              Reject
                            </Button>
                          </Stack>
                        </ListItem>
                      ))}
                    </List>

                    <Dialog
                      open={showAssessmentDialog}
                      onClose={handleClose}
                      fullScreen
                    >
                      <DialogTitle color={"primary.contrastText"}>
                        {selectedDoctor?.name}
                      </DialogTitle>
                      <DialogContent>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Name: {selectedDoctor?.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          ID: {selectedDoctor?.doctorRegistrationNumber}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Address: {selectedDoctor?.address}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Date of Birth: {selectedDoctor?.dob}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Phone Number: {selectedDoctor?.phoneNumber}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Email Address: {selectedDoctor?.emailAddress}
                        </Typography>
                        <DialogActions>
                          <Stack direction={"row"} spacing={2} pl={90}>
                            <Button sx={{ height: 40 }} variant="contained">
                              Assign
                            </Button>
                            <Button
                              sx={{ height: 40 }}
                              variant="outlined"
                              color="secondary"
                            >
                              Reject
                            </Button>
                          </Stack>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>

                    <Divider variant="inset" component="li" />
                  </ListItem>
                </List>
              </Stack>
            </Box>
          )}
          {tabIndex === 2 && (
            <Box>
              <Stack>
                <Typography variant="h5">Patients</Typography>
                <List>
                  <ListItem>
                    <List>
                      {doctors.map((doctor) => (
                        <ListItem
                          key={doctor.doctorRegistrationNumber}
                          disablePadding
                        >
                          <ListItemAvatar>
                            <Avatar alt="doctor" src="" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={doctor.name}
                            secondary={`ID: ${doctor.doctorRegistrationNumber}`}
                            sx={{
                              flexGrow: 0,
                              flexShrink: 0,
                              flexBasis: "5%",
                            }}
                          />
                          <ListItemText primary="   " />
                          <Button
                            sx={{
                              flexGrow: 0,
                              flexShrink: 0,
                              width: 80,
                              height: 40,
                            }}
                            variant="outlined"
                            onClick={() => handleAssessmentButtonClick(doctor)}
                          >
                            Details
                          </Button>

                          <Stack direction={"row"} spacing={2} pl={90}>
                            <Button sx={{ height: 50 }} variant="contained">
                              Accept
                            </Button>
                            <Button
                              sx={{ height: 50 }}
                              variant="outlined"
                              color="secondary"
                            >
                              Reject
                            </Button>
                          </Stack>
                        </ListItem>
                      ))}
                    </List>

                    <Dialog
                      open={showAssessmentDialog}
                      onClose={handleClose}
                      fullScreen
                    >
                      <DialogTitle color={"primary.contrastText"}>
                        {selectedDoctor?.name}
                      </DialogTitle>
                      <DialogContent>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Name: {selectedDoctor?.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          ID: {selectedDoctor?.doctorRegistrationNumber}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Address: {selectedDoctor?.address}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Date of Birth: {selectedDoctor?.dob}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Phone Number: {selectedDoctor?.phoneNumber}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={"primary.contrastText"}
                        >
                          Email Address: {selectedDoctor?.emailAddress}
                        </Typography>
                        <DialogActions>
                          <Stack direction={"row"} spacing={2} pl={90}>
                            <Button sx={{ height: 40 }} variant="contained">
                              Assign
                            </Button>
                            <Button
                              sx={{ height: 40 }}
                              variant="outlined"
                              color="secondary"
                            >
                              Reject
                            </Button>
                          </Stack>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>

                    <Divider variant="inset" component="li" />
                  </ListItem>
                </List>
              </Stack>
            </Box>
          )}
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
