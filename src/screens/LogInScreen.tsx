import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button, Paper, Stack, TextField, Link, Typography, Container, Box, FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backdrop from "./../assets/images/backdrop.jpg";
import { createTheme, ThemeProvider, colors} from '@mui/material';
import { baseTheme } from '../Themes';

export default function LogInScreen() {
	const [searchParams, setSearchParams] = useSearchParams();
	let initPosition = searchParams.get("position");
	if (!initPosition) initPosition = "patient";

	// const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [position, setPosition] = useState(initPosition);


	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

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
						<Typography variant="h4">Sign In</Typography>
						<div>
							<FormControl fullWidth>
								<InputLabel variant="outlined" htmlFor="position">
									Position
								</InputLabel>
								<Select
									labelId="position-field"
									id="position"
									value={position}
									onChange={e => setPosition(e.target.value)}
									label="Position"
									required
									autoFocus
								>
									<MenuItem value="patient">Patient</MenuItem>
									<MenuItem value="doctor">Doctor</MenuItem>
									<MenuItem value="counselor">Counselor</MenuItem>
									<MenuItem value="manager">Manager</MenuItem>
								</Select>
							</FormControl>

						</div>
						<TextField
							id="username-field"
							label="Username"
							variant="outlined"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							autoComplete="username"
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
						<Stack direction="row" alignItems="baseline" spacing={5}>
							<Link component={RouterLink} to={`/Register?position=${position}`} color='primary'>
								New user? Sign up!
							</Link>
							<Button variant="contained" color="primary" type="submit">
								Sign In
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