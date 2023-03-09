import {
  createTheme,
  ThemeProvider,
  colors,
  Card,
  CardContent,
  CardActions,
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

export default function PatientAppointmentScreen(props: any) {
  return (
    <ThemeProvider theme={patientTheme}>
      <Stack>
        <Typography variant="h5" color={"primary.contrastText"}>
          Appointment History
        </Typography>
        <List>
          <ListItem>
            <Box sx={{ width: "100%"}}>
              <Card sx={{boxShadow: 3 , marginTop: 2}}>
                <CardContent>
                  <Stack direction="row">
                    <ListItemAvatar>
                      <Avatar
                        alt="doctor"
                        src="/static/images/doctor/sampleDoctor.jpg"
                      />
                    </ListItemAvatar>
                    <Stack direction={"column"} marginRight={"70%"}>
                      <Typography>Dr. Gregory House</Typography>
                      <Typography>Date: 2023-02-12</Typography>
                    </Stack>
                    <Button
                      variant="contained"
                      sx={{
                        marginRight: 2,
                        backgroundColor: "primary.dark",
                        color: "primary.contrastText",
                        ":hover": { backgroundColor: "primary.main" },
                      }}
                    >
                      Accept
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
                </CardContent>
              </Card>
            </Box>
          </ListItem>
        </List>
      </Stack>
    </ThemeProvider>
  );
}
