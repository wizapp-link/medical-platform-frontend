import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button, Paper, Stack, TextField, Link, Typography, Container, Box, FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backdrop from "./../assets/images/backdrop.jpg";
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { baseTheme } from '../Themes';
import { selectUserLogIn, logIn } from '../features/auth/userLogInSlice';
import { roleToPosition } from '../constants/PositionRoleMap';

export default function LogInScreen() {
	const [searchParams, setSearchParams] = useSearchParams();
	let initPosition = searchParams.get("position");
	if (!initPosition) initPosition = "patient";

	const location = useLocation();
	const navigate = useNavigate();
	const userLogIn = useAppSelector(selectUserLogIn);
	const { userInfo, loading, error, errorMessage } = userLogIn;
	const dispatch = useAppDispatch();

	// const [email, setEmail] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(logIn(email, password));
	};

	useEffect(() => {
		if (userInfo) {
			const redirect = `/${roleToPosition.get(userInfo.userData.role)}`
			navigate(redirect);
		}
	}, [userInfo]);

	return (
		<ThemeProvider theme={baseTheme}>
			<Box sx={{ minHeight: '100vh' }}>
				<Header />
				<Container
					sx={{
						marginTop: 8,
						marginBottom: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<form onSubmit={handleSubmit}>
						<Stack spacing={5} padding={5}>
							<Typography variant="h4">Log In</Typography>
							<TextField
								id="email-field"
								label="Email"
								variant="outlined"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								required
								autoFocus
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
							/>

							<Stack direction="row" spacing={5}>
								<Stack>
									<Link component={RouterLink} to={`/Register`} color='primary'>
										New user? Sign up!
									</Link>
									<Link component={RouterLink} to={`/forgot_password`} color='primary'>
										Forgot password?
									</Link>
								</Stack>

								<Button variant="contained" color="primary" type="submit">
									Log In
								</Button>

							</Stack>
						</Stack>
					</form>

				</Container>
				<Footer />
			</Box>
		</ThemeProvider>

	);
}