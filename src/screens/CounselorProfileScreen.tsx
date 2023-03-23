import { Box, Button, Container, makeStyles, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import { FormEvent, useState } from "react";

import { createTheme, ThemeProvider, colors} from '@mui/material';
import { counselorTheme } from '../Themes';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import { useLocation, useNavigate, Link as RouterLink, useSearchParams } from "react-router-dom";

export default function CounselorProfileScreen() {
  const { userInfo } = useAppSelector(selectUserLogIn);
  const dispatch = useDispatch()

  const handleSave = (e: FormEvent) => {
  e.preventDefault()
    // dispatch(profileUpdate({
    //   name,
    //   dob,
    //   phone,
    //   address,
    //   registrationNo,
    //   email
    // }))
    // TODO: Save profile
  };
  const [name, setName] = useState(userInfo?.userData.name)
  const [dob, setDob] = useState(userInfo?.userData.dob)
  const [phone, setPhone] = useState(userInfo?.userData.phone)
  const [address, setAddress] = useState(userInfo?.userData.address)
  const [registrationNo, setRegistrationNo] = useState(userInfo?.userData.registrationNo)
  const [email, setEmail] = useState(userInfo?.userData.email);

  

  return (
    <ThemeProvider theme={counselorTheme}>
    <Box>
      <Container>
        <>
          <Typography variant="h5" gutterBottom>
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSave}>
            <Stack spacing={5} padding={5}>
              <Typography variant="h4">Profile</Typography>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={email}
                disabled
                required
                color='secondary'
              />
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                color='secondary'
              />
              <TextField
                fullWidth
                label="Date Of Birth"
                name="dateOfBirth"
                value={dob}
                onChange={e => setDob(e.target.value)}
                required
                color='secondary'
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                color='secondary'
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                color='secondary'
              />
              <TextField
                fullWidth
                label="Counselor Registration Number"
                name="counselorrRegistrationNumber"
                value={registrationNo}
                onChange={e => setRegistrationNo(e.target.value)}
                required
                color='secondary'
                disabled
              />
              <Stack direction="row" spacing={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size={'large'} variant="contained" color="secondary" onClick={() => { window.location.reload() }}>
                  Discard
                </Button>
                <Button size={'large'} variant="contained" color="primary" type="submit" onClick={handleSave}>
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </>
      </Container>
    </Box>
    </ThemeProvider>
  );
}