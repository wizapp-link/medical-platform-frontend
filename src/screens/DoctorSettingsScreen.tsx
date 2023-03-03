import { Box, Button, Container, Snackbar, Stack, TextField, Typography } from "@mui/material";
import * as React from 'react';
import { FormEvent, useState } from "react";
import { createTheme, ThemeProvider, colors} from '@mui/material';
import { doctorTheme } from '../Themes';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { passwordUpdate } from "../features/doctor/doctorSlice";

export default function PatientSettingsScreen(props: any) {
	const doctor = useSelector((state:RootState) => state.doctor)
	const dispatch = useDispatch()

	const [email, setEmail] = useState(doctor.email);
	const [password, setPassword] = useState("");
	const [newPassword1, setNewPassword1] = useState("");
	const [newPassword2, setNewPassword2] = useState("");

	const [openNotMatch, setOpenNotMatch] = useState(false)
	const [openUncorrectPsw, setOpenUncorrectPsw] = useState(false)
	const [openChanged, setOpenChanged] = useState(false)

	const handleSnackbarClose = () => {
		setOpenNotMatch(false)
		setOpenUncorrectPsw(false)
		setOpenChanged(false)
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if(password != doctor.password){
			setOpenUncorrectPsw(true)
			return;
		}
		if(newPassword1 != newPassword2) {
			setOpenNotMatch(true)
			return;
		}

		dispatch(passwordUpdate(newPassword1
		))
		setPassword("")
		setNewPassword1("")
		setNewPassword2("")
		setOpenChanged(true)
	};

	return (
		<ThemeProvider theme={doctorTheme}>
		<Box>
			<Container>
				<form onSubmit={handleSubmit}>
					<Stack spacing={5} padding={5}>
						<Typography variant="h4">Settings</Typography>
						<TextField
							id="email-field"
							label="E-mail"
							variant="outlined"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="email"
							required
							disabled
						/>
						<TextField
							id="password-field"
							label="Current Password"
							variant="outlined"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							autoComplete="current-password"
							required
						/>
						<TextField
							id="new-password-field-1"
							label="New Password"
							variant="outlined"
							value={newPassword1}
							onChange={(e) => setNewPassword1(e.target.value)}
							type="password"
							required
						/>
						<TextField
							id="new-password-field-2"
							label="Confirm New Password"
							variant="outlined"
							value={newPassword2}
							onChange={(e) => setNewPassword2(e.target.value)}
							type="password"
							required
						/>
						<Stack direction="row" spacing={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button variant="contained" color="secondary" onClick={() => { window.location.reload() }}>
								Discard
							</Button>
							<Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
								Submit
							</Button>

							<Snackbar
								open={openNotMatch}
								message="NEW PASSWORD DID NOT MATCH CONFIRM PASSWORD"
								autoHideDuration={3000}
								onClose={handleSnackbarClose}
							/>
							<Snackbar
								open={openUncorrectPsw}
								message="CURRENT PASSWORD IS NOT CORRECT"
								autoHideDuration={3000}
								onClose={handleSnackbarClose}
							/>
							<Snackbar
								open={openChanged}
								message="PASSWORD CHANGED SUCCESSFUL"
								autoHideDuration={3000}
								onClose={handleSnackbarClose}
							/>
						</Stack>
					</Stack>
				</form>
			</Container>
		</Box >
		</ThemeProvider>
	);
}