import { Box, Button, Container, makeStyles, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import { FormEvent, useState } from "react";
import { createTheme, ThemeProvider, colors} from '@mui/material';
import { doctorTheme } from '../Themes';
import { doctorState, profileUpdate } from "../features/doctor/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";


//id: "6400e5813cb00827c1c8bdde",
//     email: "shubhankar@gmail.com",
//     password: null,
//     role: "ROLE_PATIENT",
//     name: "Shubhankar Kulkarni",
//     address: "ch de la cote-des-neiges",
//     dob: "22-03-1998",
//     phone: "4379860077",
//     registrationNo: null,
//     status: "VERIFIED"


export default function DoctorProfileScreen() {
  const doctor = useSelector((state:RootState) => state.doctor)
  const dispatch = useDispatch()

  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    dispatch(profileUpdate({
      name,
      dob,
      phone,
      address,
      registrationNo,
      email
    }))
    // TODO: Save profile
  };
  //      state.email = email;
  //       state.name = name;
  //       state.dob = dob;
  //       state.phone = phone;
  //       state.address = address;
  const [name, setName] = useState(doctor.name)
  const [dob, setDob] = useState(doctor.dob)
  const [phone, setPhone] = useState(doctor.phone)
  const [address, setAddress] = useState(doctor.address)
  const [registrationNo, setRegistrationNo] = useState(doctor.registrationNo)
  const [email, setEmail] = useState(doctor.email);



  return (
    <ThemeProvider theme={doctorTheme}>
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
              />
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Date Of Birth"
                name="dateOfBirth"
                value={dob}
                onChange={e => setDob(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Doctor Registration Number"
                name="doctorRegistrationNumber"
                value={registrationNo}
                onChange={e => setRegistrationNo(e.target.value)}
                required
              />
              <Stack direction="row" spacing={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="secondary" onClick={() => { window.location.reload() }}>
                  Discard
                </Button>
                <Button variant="contained" color="primary" type="submit" onClick={handleSave}>
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