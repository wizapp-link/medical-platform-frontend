import { CheckBox } from "@mui/icons-material";
import { FormEvent } from "react";
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
  Card,
  CardContent,
  FormControl,
  NativeSelect,
  InputLabel,
  Select,
  MenuItem,
  TextField,
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
  personnelUpdateMessageReset,
} from "../features/manager/personnelsSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { roleToPosition } from "../constants/PositionRoleMap";
import PersonnelList from "../components/PersonnelList";
import personnelStatus from "../constants/PersonnelStatus";
import { managerTheme } from "../Themes";
import PersonnelDetailDialog from "../components/PersonnelDetailDialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import {
  useLocation,
  useNavigate,
  Link as RouterLink,
  useSearchParams,
} from "react-router-dom";
import {
  register,
  selectUserRegister,
  userRegisterReset,
} from "../features/auth/userRegisterSlice";
import { red } from "@mui/material/colors";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ManagerDashboardScreen(props: any) {
  const textColor = "#6B6891";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addr, setAddr] = useState("");
  const [dob, setDob] = useState("");
  // const [doctorRegNumber, setDoctorRegNumber] = useState("");
  // const [counselorRegNumber, setCounselorRegNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      register(
        position,
        name,
        email,
        password,
        phoneNumber,
        registrationNumber,
        dob,
        addr
      )
    );
  };

  const { userInfo } = useAppSelector(selectUserLogIn);
  const personnelList = useAppSelector(selectPersonnelList);
  const dispatch = useAppDispatch();
  const userRegister = useAppSelector(selectUserRegister);

  const [selectedPerson, setSelectedPerson] = useState<UserData | null>(null);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  const [position, setPosition] = useState("Patient");

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

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={managerTheme}>
      <Stack padding={2} spacing={2}>
        <Typography variant="h4">Good day!</Typography>
        <Divider />
        <Stack spacing={3}>
          <Stack direction={"row"} justifyContent="space-between">
            <Typography variant="h5">Recent list of requests</Typography>
            <Button
              variant="contained"
              onClick={handleDialogOpen}
              sx={{
                fontSize: 16,
                backgroundColor: "secondary.main",
                color: "secondary.contrastText",
              }}
            >
              Register New Patient
            </Button>
          </Stack>
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
        <PersonnelDetailDialog
          open={showAssessmentDialog}
          onClose={handleClose}
          selectedPerson={selectedPerson}
        />
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
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Register New Patient
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          <Stack spacing={2} padding={5} mb={15}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} padding={5} mb={15}>
                <Typography variant="h5" color="primary">
                  Register Patient
                </Typography>
                <div>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="outlined"
                      htmlFor="position"
                      color="primary"
                    >
                      Position
                    </InputLabel>
                    <Select
                      labelId="position-field"
                      id="position"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      label="Position"
                      required
                      autoFocus
                      color="primary"
                    >
                      <MenuItem value="patient">Patient</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Stack spacing={2} padding={0}>
                <div style={{ marginTop: 0 }}>
                  <Stack spacing={2} padding={0}>
                    <TextField
                      id="name-field"
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                      autoComplete="name"
                      color="primary"
                    />
                    <TextField
                      id="email-field"
                      label="E-mail"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      color="primary"
                    />
                    <TextField
                      id="password-field"
                      label="Password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      autoComplete="current-password"
                      required
                      color="primary"
                    />
                    <TextField
                      id="number-field"
                      variant="outlined"
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      color="primary"
                    />
                    <TextField
                      id="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      variant="outlined"
                      required
                      color="primary"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="address"
                      label="Address"
                      value={addr}
                      onChange={(e) => setAddr(e.target.value)}
                      variant="outlined"
                      fullWidth
                      required
                      color="primary"
                    />
                  </Stack>
                </div>
                </Stack>
                {userRegister.error && (
                  <Typography color={red[500]}>
                    {userRegister.errorMessage}
                  </Typography>
                )}
                {userRegister.success && (
                  <Typography color="primary">
                    Registeration Successful!
                  </Typography>
                )}
                <Stack
                  direction="row"
                  alignItems="baseline"
                  spacing={5}
                  justifyContent="space-between"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={userRegister.success || userRegister.loading}
                    size={"large"}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
