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
import { useState } from "react";


export default function PatientAppointmentScreen(props: any) {
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const handleDetailButtonClick = () => {
    // setSelectedPatient(patient);
    setShowDetailDialog(true);
  };
  const handleClose = () => {
    // setShowAssessmentDialog(false);
    setShowDetailDialog(false);
  };
  return (
    <ThemeProvider theme={patientTheme}>
      <Stack>
        <Typography variant="h5" color={"primary.contrastText"}>
          Appointment History
        </Typography>
        <List>
          <ListItem>
            <Box sx={{ width: "100%" }}>
              <Card sx={{ boxShadow: 3, marginTop: 2 }}>
                <CardContent>
                  <Stack direction="row" justifyContent={"space-between"}>
                    <Stack direction="row">
                      <ListItemAvatar sx={{ display: "flex" }}>
                        <Avatar alt="doctor"
                          src="/static/images/doctor/sampleDoctor.jpg"
                          sx={{ alignSelf: "center" }} />
                      </ListItemAvatar>
                      <Stack direction={"column"} >
                        <Typography>Dr. Gregory House</Typography>
                        <Typography>Date: 2023-02-12</Typography>
                      </Stack>
                    </Stack>
                    <Stack direction={"row"}>
                      <Button
                        variant="contained"
                        onClick={() => handleDetailButtonClick()}
                        sx={{
                          marginRight: 2,
                          backgroundColor: "primary.dark",
                          color: "primary.contrastText",
                          ":hover": { backgroundColor: "primary.main" },
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          color: "primary.contrastText",
                          borderColor: "secondary.dark",
                          ":hover": { backgroundColor: "secondary.dark" },
                        }}
                      >
                        Reject
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </ListItem>
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
