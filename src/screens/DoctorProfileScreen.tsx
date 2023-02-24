import { Box, Button, makeStyles, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";

type DoctorProfile = {
  name: string;
  address: string;
  phone: string;
  specialty: string;
  doctorRegistrationNumber: string;
  dateOfBirth: string;
  email: string;

};

const initialDoctorProfile = {
  name: "Sherlock",
  address: "Montreal",
  dateOfBirth: "01/01/1970",
  phone: "555-555-5555",
  doctorRegistrationNumber: "12345",
  specialty: "Cardiology",
  email:"Sherlock@gmail.com"

};

export default function DoctorProfileScreen() {



  const [editableProfile, setEditableProfile] = useState<DoctorProfile>(initialDoctorProfile);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditableProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Save profile
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Doctor {editableProfile.name}'s Profile
      </Typography>
      <form noValidate autoComplete="off">
        <Stack direction="column" spacing={3} pt={3}>
          <TextField
            fullWidth
            variant="filled"
            label="Email"
            name="email"
            value={editableProfile.email}
          />
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={editableProfile.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Date Of Birth"
            name="dateOfBirth"
            value={editableProfile.dateOfBirth}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={editableProfile.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={editableProfile.address}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Specialty"
            name="specialty"
            value={editableProfile.specialty}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Doctor Registration Number"
            name="doctorRegistrationNumber"
            value={editableProfile.doctorRegistrationNumber}
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </form>
    </>
  );
}