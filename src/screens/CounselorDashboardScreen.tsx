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
  Snackbar,
  Tab,
  Tabs
} from "@mui/material";
import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect} from "react";
import { height } from "@mui/system";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { counselorTheme } from "../Themes";
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import { flexbox } from "@mui/system";
import { spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {
  selectPersonnelList,
  listAllPersonnel,
  updatePersonnel,
  listPersonnel,
  personnelUpdateMessageReset
} from "../features/manager/personnelsSlice";
import { UserData } from "../types/UserDataType";
import personnelStatus from "../constants/PersonnelStatus";
import PersonnelList from "../components/PersonnelList";
import PatientPersonnelList from "../components/PatientPersonnelList";
import PersonnelDetailDialog from "../components/PersonnelDetailDialog";

export default function CounselorDashboardScreen(props: any) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  const [showSelfAssessmentDialog, setShowSelfAssessmentDialog] = useState(false);


  const { userInfo } = useAppSelector(selectUserLogIn);
  const personnelList = useAppSelector(selectPersonnelList);
  const dispatch = useAppDispatch();
  const [selectedPerson, setSelectedPerson] = useState<UserData | null>(null);

  useEffect(() => {
    dispatch(listAllPersonnel(userInfo?.token, false))
  }, [])

  const handleAssessmentButtonClick = (person: UserData) => {
    setSelectedPerson(person);
    setShowAssessmentDialog(true);
  };

  const handleClose = () => {
    setShowAssessmentDialog(false);
  };

  const handleAccept = (user: UserData) => {
    dispatch(updatePersonnel(userInfo?.token, user, personnelStatus.verified));
  };

  const handleReject = (user: UserData) => {
    dispatch(updatePersonnel(userInfo?.token, user, personnelStatus.declined));
  };

  const handleSnackbarClose = () => {
    dispatch(personnelUpdateMessageReset());
  };


  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (
    event: any,
    newTabIndex: React.SetStateAction<number>
  ) => {
    setTabIndex(newTabIndex);
  };

  type Patient = {
    id: number;
    name: string;
    selfAssessmentResults: string[];
    address: string;
    dob: string;
    phoneNumber: string;
    emailAddress: string;
    doctorRegistrationNumber: string;
  };

  const handleSelfAssessmentButtonClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowAssessmentDialog(true);
  };

  const navigate = useNavigate();
  const handleAppointments = () => {
    navigate(`/counselor/appointments`);
  };

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
        <Typography variant="h5" color={"primary.contrastText"}>
          Recent Patient List
        </Typography>
        <Box>
          <Box>
              <Box>
                {personnelList.personnel && (
                  <PatientPersonnelList
                    users={personnelList.personnel.patients}
                    handleAssessmentButtonClick={handleAssessmentButtonClick}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                  />
                )}
              </Box>
          </Box>
        </Box>
        <PersonnelDetailDialog open={showAssessmentDialog} onClose={handleClose} selectedPerson={selectedPerson} />
        <Snackbar
          open={personnelList.personnelUpdateMessage !== ""}
          message={personnelList.personnelUpdateMessage}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        />
        <Snackbar
          open={personnelList.personnelUpdateLoading}
          message={"Applying changes, please wait..."}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        />

      
      </Stack>
    </ThemeProvider>
  );
}

