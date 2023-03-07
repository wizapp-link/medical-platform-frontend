import { Box, Button, Container, Link, Stack, TextField, Typography } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { patientTheme } from '../Themes';
import { selectUserLogIn } from '../features/auth/userLogInSlice';
import { useAppSelector } from '../app/hooks';

export default function ManagerProfileScreen(props: any) {

	const { userInfo } = useAppSelector(selectUserLogIn);

	const [name, setName] = useState(userInfo?.userData.name);
	const [phoneNumber, setPhoneNumber] = useState(userInfo?.userData.phone);
	const [addr, setAddr] = useState(userInfo?.userData.address);
	const [dob, setDob] = useState(userInfo?.userData.dob);
	const [registrationNumber, setRegistrationNumber] = useState(userInfo?.userData.registrationNo);


	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<ThemeProvider theme={patientTheme}>
			<Box>
				<Container>
					<form onSubmit={handleSubmit}>
						<Stack spacing={5} padding={5}>
							<Typography variant="h4">Profile</Typography>
							<TextField
								id="name-field"
								label="Name"
								variant="outlined"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								autoFocus
								autoComplete="name"
								color='secondary'
							/>
							<TextField
								id="number-field"
								variant="outlined"
								label="Number"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								required
								color='secondary'
							/>
							<TextField
								id="dateOfBirth"
								label="Date of Birth"
								type="date"
								value={dob}
								onChange={e => setDob(e.target.value)}
								variant="outlined"
								required
								color='secondary'
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								id="address"
								label="Address"
								value={addr}
								onChange={e => setAddr(e.target.value)}
								variant="outlined"
								fullWidth
								required
								color='secondary'
							/>
							<TextField
								id="registrationNo"
								label="RegistrationNumber"
								value={registrationNumber}
								onChange={e => setRegistrationNumber(e.target.value)}
								variant="outlined"
								fullWidth
								required
								color='secondary'
							/>
							<Stack direction="row" spacing={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Button variant="contained" color="secondary" onClick={() => { window.location.reload() }}>
									Discard
								</Button>
								<Button variant="contained" type="submit" onClick={handleSubmit} sx={{ backgroundColor: 'primary.dark', ":hover": { backgroundColor: 'primary.main' } }}>
									Submit
								</Button>
							</Stack>
						</Stack>
					</form>
				</Container>
			</Box >
		</ThemeProvider>
	);
}