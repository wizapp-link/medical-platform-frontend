import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button, Paper, Stack, TextField, Link, Typography, Container, Box, FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import loginImage from "./../assets/images/loginImage.jpg";
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { baseTheme } from '../Themes';
import { selectUserLogIn, logIn } from '../features/auth/userLogInSlice';
import { roleToPosition } from '../constants/PositionRoleMap';
import { red } from '@mui/material/colors';

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
			<Box sx={{ minHeight: '100vh'}}>
				<Header />
				<Container
					sx={{
						marginTop: 8,
						marginBottom: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'left',
					}}
				>
					<Stack direction={'row'} spacing={10} sx={{marginTop: 10}}>
						<img src={loginImage} height={550} width={610}/>
						<form onSubmit={handleSubmit}>
						<Stack spacing={5} padding={5}>
							<Typography variant="h4" sx={{color: 'primary.main'}}>Log In</Typography>
							<TextField
								id="email-field"
								label="Email"
								variant="outlined"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								required
								autoFocus
								color= "primary"
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
								color='primary'
							/>
							{userLogIn.error && <Typography color={red[500]}>{userLogIn.errorMessage}</Typography>}
							<Stack direction="row" spacing={5}>
								<Stack>
									<Link component={RouterLink} to={`/Register`} color='primary' fontSize={18}>
										New user? Sign up!
									</Link>
									<Link component={RouterLink} to={`/forgot_password`} color='primary' fontSize={18}>
										Forgot password?
									</Link>
								</Stack>

								<Button variant="contained" color="primary" type="submit" size="large" sx={{fontSize: '30'}}>
									Log In
								</Button>

							</Stack>
						</Stack>
					</form>
					</Stack>
					

				</Container>
				<Footer />
			</Box>
		</ThemeProvider>

	);
}