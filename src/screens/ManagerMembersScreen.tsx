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
  ThemeProvider,
  Tabs,
  Tab,
  Snackbar,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import PersonnelDetailDialog from "../components/PersonnelDetailDialog";
import { managerTheme } from "../Themes";
import { UserData } from "../types/UserDataType";
import {
  selectPersonnelList,
  listAllPersonnel,
  updatePersonnel,
  listPersonnel,
  personnelUpdateMessageReset
} from "../features/manager/personnelsSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import PersonnelList from "../components/PersonnelList";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import personnelStatus from "../constants/PersonnelStatus";

export default function ManagerMembersScreen(props: any) {
  // const [patients, setPatients] = useState<DoctorCounselor[]>([
  //   {
  //     id: 1,
  //     name: "Alice",
  //     type: "Doctor",
  //     address: "address",
  //     dob: "1998/01/01",
  //     phoneNumber: "5140000000",
  //     emailAddress: "Alice@gmail.com",
  //   },
  // ]);
  const { userInfo } = useAppSelector(selectUserLogIn);
  const personnelList = useAppSelector(selectPersonnelList);
  const dispatch = useAppDispatch();
  const [selectedPerson, setSelectedPerson] = useState<UserData | null>(null);

  useEffect(() => {
    dispatch(listAllPersonnel(userInfo?.token, false))
  }, [])

  // type DoctorCounselor = {
  //   id: number;
  //   type: string;
  //   name: string;
  //   // registrationDeta: string[];
  //   address: string;
  //   dob: string;
  //   phoneNumber: string;
  //   emailAddress: string;
  // };

  const handleAssessmentButtonClick = (person: UserData) => {
    setSelectedPerson(person);
    setShowAssessmentDialog(true);
  };
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);

  // const handleAssessmentButtonClick = (patient: Patient) => {
  //   setSelectedPatient(patient);
  //   setShowAssessmentDialog(true);
  // };

  // const handleDetailButtonClick = (patient: Patient) => {
  //   setSelectedPatient(patient);
  //   setShowDetailDialog(true);
  // };

  // const handleClose = () => {
  //   setShowAssessmentDialog(false);
  //   setShowDetailDialog((false));
  // };

  const handleClose = () => {
    setShowAssessmentDialog(false);
    // setShowDetailDialog((false));
  };

  const handleAccept = (user: UserData) => {
    dispatch(updatePersonnel(userInfo?.token, user, personnelStatus.verified));
    // dispatch(listPersonnel(userInfo?.token, user.role, true));
  };

  const handleReject = (user: UserData) => {
    dispatch(updatePersonnel(userInfo?.token, user, personnelStatus.declined));
    // dispatch(listPersonnel(userInfo?.token, user.role, true));
  };

  const handleSnackbarClose = () => {
    // setPersonnelUpdateMessage("");
    dispatch(personnelUpdateMessageReset());
  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (
    event: any,
    newTabIndex: React.SetStateAction<number>
  ) => {
    setTabIndex(newTabIndex);
  };

  return (
    <ThemeProvider theme={managerTheme}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Members
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 7 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Doctors" sx={{ width: 500 }} />
            <Tab label="Counselors" sx={{ width: 500 }} />
            <Tab label="Patients" sx={{ width: 500 }} />
          </Tabs>
        </Box>
        <Box>
          <Box>
            {tabIndex === 0 && (
              <Box>
                {personnelList.personnel && (
                  <PersonnelList
                    users={personnelList.personnel.doctors}
                    handleAssessmentButtonClick={handleAssessmentButtonClick}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                  />
                )}
              </Box>
            )}
            {tabIndex === 1 && (
              <Box>
                {personnelList.personnel && (
                  <PersonnelList
                    users={personnelList.personnel.counselors}
                    handleAssessmentButtonClick={handleAssessmentButtonClick}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                  />
                )}
              </Box>
            )}
            {tabIndex === 2 && (
              <Box>
                {personnelList.personnel && (
                  <PersonnelList
                    users={personnelList.personnel.patients}
                    handleAssessmentButtonClick={handleAssessmentButtonClick}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
        <PersonnelDetailDialog open={showAssessmentDialog} onClose={handleClose} selectedPerson={selectedPerson} />

        {/* <Dialog open={showAssessmentDialog} onClose={handleClose}>
        <DialogTitle>{selectedPatient?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">ID: {selectedPatient?.id}</Typography>
          <Typography variant="subtitle1">Name: {selectedPatient?.name}</Typography>
          <Typography variant="h6">Self-Assessment Results</Typography>
          <List>
            {selectedPatient?.selfAssessmentResults.map((result) => (
              <ListItem key={result}>
                <ListItemText primary={result} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog> */}
        {/* <Dialog open={showDetailDialog} onClose={handleClose}>
        <DialogTitle>{selectedPatient?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">ID: {selectedPatient?.id}</Typography>
          <Typography variant="subtitle1">Name: {selectedPatient?.name}</Typography>
          <Typography variant="h6">Detailed Information</Typography>
          <Typography variant="subtitle1">Address: {selectedPatient?.address}</Typography>
          <Typography variant="subtitle1">Date of Birth: {selectedPatient?.dob}</Typography>
          <Typography variant="subtitle1">Phone Number: {selectedPatient?.phoneNumber}</Typography>
          <Typography variant="subtitle1">Email Address: {selectedPatient?.emailAddress}</Typography>
          <Typography variant="subtitle1">
            Doctor Registration Number: {selectedPatient?.doctorRegistrationNumber}
          </Typography>
        </DialogContent>
      </Dialog> */}
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
      </Box>
    </ThemeProvider>
  );
}
