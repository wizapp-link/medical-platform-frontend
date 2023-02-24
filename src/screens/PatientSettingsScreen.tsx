import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { FormEvent, useState } from 'react';

export default function PatientSettingsScreen(props: any) {
	const [email, setEmail] = useState("email_from@redux.store");
	const [password, setPassword] = useState("");
	const [newPassword1, setNewPassword1] = useState("");
	const [newPassword2, setNewPassword2] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
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
						</Stack>
					</Stack>
				</form>
			</Container>
		</Box >
	);
}