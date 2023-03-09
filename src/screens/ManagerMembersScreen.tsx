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
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);


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
