import { Box, Button, Container, makeStyles, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import { FormEvent, useState } from "react";

import { createTheme, ThemeProvider, colors} from '@mui/material';
import { counselorTheme } from '../Themes';
type DoctorProfile = {
  name: string;
  address: string;
  phone: string;
//   specialty: string;
  counselorRegistrationNumber: string;
  dateOfBirth: string;
  email: string;

};

const initialDoctorProfile = {
  name: "Sherlock",
  address: "Montreal",
  dateOfBirth: "01/01/1970",
  phone: "555-555-5555",
  counselorRegistrationNumber: "12345",
//   specialty: "Cardiology",
  email:"Sherlock@gmail.com"

};

export default function CounselorProfileScreen() {



  const [editableProfile, setEditableProfile] = useState<DoctorProfile>(initialDoctorProfile);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditableProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Save profile
  };

  return (
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
                variant="filled"
                label="Email"
                name="email"
                value={editableProfile.email}
                color='secondary'
              />
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={editableProfile.name}
                onChange={handleChange}
                color='secondary'
              />
              <TextField
                fullWidth
                label="Date Of Birth"
                name="dateOfBirth"
                value={editableProfile.dateOfBirth}
                onChange={handleChange}
                color='secondary'
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={editableProfile.phone}
                onChange={handleChange}
                color='secondary'
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={editableProfile.address}
                onChange={handleChange}
                color='secondary'
              />
              {/* <TextField
                fullWidth
                label="Specialty"
                name="specialty"
                value={editableProfile.specialty}
                onChange={handleChange}
              /> */}
              <TextField
                fullWidth
                label="Counselor Registration Number"
                name="counselorRegistrationNumber"
                value={editableProfile.counselorRegistrationNumber}
                onChange={handleChange}
                color='secondary'
              />
              <Stack direction="row" spacing={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" sx={{backgroundColor:'primary.dark',":hover":{backgroundColor: 'primary.light'}}} onClick={() => { window.location.reload() }}>
                  Discard
                </Button>
                <Button variant="contained" color="primary" type="submit"  onClick={handleSave}>
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </>
      </Container>
    </Box>

  );
}