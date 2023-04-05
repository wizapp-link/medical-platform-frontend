import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { managerTheme } from '../Themes';
import { selectUserLogIn } from '../features/auth/userLogInSlice';
import { useAppSelector } from '../app/hooks';

export default function ManagerChangePasswordScreen(props: any) {

	const { userInfo } = useAppSelector(selectUserLogIn);

	const [email, setEmail] = useState(userInfo?.userData.email);
	const [password, setPassword] = useState("");
	const [newPassword1, setNewPassword1] = useState("");
	const [newPassword2, setNewPassword2] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<ThemeProvider theme={managerTheme}>
			<Box>
				<Container>
					<form onSubmit={handleSubmit}>
						<Stack spacing={5} padding={5}>
							<Typography variant="h4" color={'primary.contrastText'}>Settings</Typography>
							<TextField
								id="email-field"
								label="E-mail"
								variant="outlined"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								required
								disabled
								sx={{color:'secondary.main'}}
								
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
								color='secondary'
								disabled
							/>
							<TextField
								id="new-password-field-1"
								label="New Password"
								variant="outlined"
								value={newPassword1}
								onChange={(e) => setNewPassword1(e.target.value)}
								type="password"
								required
								color='secondary'
								disabled
							/>
							<TextField
								id="new-password-field-2"
								label="Confirm New Password"
								variant="outlined"
								value={newPassword2}
								onChange={(e) => setNewPassword2(e.target.value)}
								type="password"
								required
								color='secondary'
								disabled

							/>
							<Stack direction="row" spacing={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Button disabled size={'large'} variant="contained" color="secondary" onClick={() => { window.location.reload() }}>
									Discard
								</Button>
								<Button disabled size={'large'} variant="contained" type="submit" onClick={handleSubmit}
									sx={{ backgroundColor: 'primary.main', ":hover": { backgroundColor: 'primary.dark' } }}
								>
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