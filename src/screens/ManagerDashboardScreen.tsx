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
  Snackbar,
  ThemeProvider,
  Tabs,
  Tab,
} from "@mui/material";
import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect } from "react";
import { UserData } from "../types/UserDataType";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import {
  selectPersonnelList,
  listAllPersonnel,
  updatePersonnel,
  listPersonnel,
  personnelUpdateMessageReset
} from "../features/manager/personnelsSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { roleToPosition } from "../constants/PositionRoleMap";
import PersonnelList from "../components/PersonnelList";
import personnelStatus from "../constants/PersonnelStatus";
import { managerTheme } from "../Themes";
import PersonnelDetailDialog from "../components/PersonnelDetailDialog";

export default function ManagerDashboardScreen(props: any) {
  const { userInfo } = useAppSelector(selectUserLogIn);
  const personnelList = useAppSelector(selectPersonnelList);
  const dispatch = useAppDispatch();

  const [selectedPerson, setSelectedPerson] = useState<UserData | null>(null);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);

  const handleAssessmentButtonClick = (user: UserData) => {
    setSelectedPerson(user);
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

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (
    event: any,
    newTabIndex: React.SetStateAction<number>
  ) => {
    setTabIndex(newTabIndex);
  };

  const handleSnackbarClose = () => {
    dispatch(personnelUpdateMessageReset());
  };

  useEffect(() => {
    dispatch(listAllPersonnel(userInfo?.token, true));
  }, []);

  return (
    <ThemeProvider theme={managerTheme}>
      <Stack padding={2} spacing={2}>
        <Typography variant="h4">Good day!</Typography>
        <Divider />

        <Stack spacing={3}>
          <Typography variant="h5">Recent list of requests</Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
              <Tab label="Doctors" sx={{ width: 500 }} />
              <Tab label="Counselors" sx={{ width: 500 }} />
            </Tabs>
          </Box>
          <Box>
            {tabIndex === 0 && (
              <Box>
                {personnelList.personnel && (
                  <PersonnelList
                    users={personnelList.personnel.pendingDoctors}
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
                    users={personnelList.personnel.pendingCounselors}
                    handleAssessmentButtonClick={handleAssessmentButtonClick}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                  />
                )}
              </Box>
            )}
          </Box>
        </Stack>
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
