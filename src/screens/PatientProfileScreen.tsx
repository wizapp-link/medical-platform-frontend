import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { patientTheme } from "../Themes";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import { useAppSelector } from "../app/hooks";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

export default function PatientProfileScreen(props: any) {
  const { userInfo } = useAppSelector(selectUserLogIn);

  const [name, setName] = useState(userInfo?.userData.name);
  const [email, setEmail] = useState(userInfo?.userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.userData.phone);
  const [addr, setAddr] = useState(userInfo?.userData.address);
  const [dob, setDob] = useState(userInfo?.userData.dob);

  const handleSubmit = (e: FormEvent) => {
    setTransition(() => TransitionDown);
    setOpen(true);
    setText("Changes updated successfully!");
    e.preventDefault();
  };

  const handleDiscard = () => {
	setTransition(() => TransitionDown);
    setOpen(true);
    setText("No changes made!");
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  //   const handleReject = () => {
  //     enqueueSnackbar("No Changes Made");
  //   };

  return (
    <ThemeProvider theme={patientTheme}>
      <Box>
        <Container>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} padding={5}>
              <Typography variant="h4">Profile</Typography>
              <TextField
                id="email-field"
                label="E-mail"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled
                color="secondary"
              />
              <TextField
                id="name-field"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                autoComplete="name"
                color="secondary"
              />
              <TextField
                id="number-field"
                variant="outlined"
                label="Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                color="secondary"
              />
              <TextField
                id="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                variant="outlined"
                required
                color="secondary"
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
                color="secondary"
              />
              <Stack
                direction="row"
                spacing={5}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "primary.dark",
                    ":hover": { backgroundColor: "primary.main" },
                  }}
                >
                  Submit
                </Button>
                <Snackbar
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={transition}
                  message={text}
                  key={transition ? transition.name : ""}
                  sx={{ backfroundColor: "primary.main", marginTop: 10, fontSize: 23 }}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  autoHideDuration={2000}
                />
              </Stack>
            </Stack>
          </form>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
