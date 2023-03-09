import React, { FormEvent, useEffect, useState } from "react";
import {
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
	Container,
	Box,
	Link, FormControl, NativeSelect, InputLabel, Select, MenuItem
} from "@mui/material";
import { useLocation, useNavigate, Link as RouterLink, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { baseTheme } from '../Themes';
import { register, selectUserRegister, userRegisterReset } from "../features/auth/userRegisterSlice";
import { red } from "@mui/material/colors";
import loginImage from "./../assets/images/loginImage.jpg";

export default function RegisterScreen() {

	const textColor = '#6B6891';
	const [searchParams, setSearchParams] = useSearchParams();
	let initPosition = searchParams.get("position");
	if (!initPosition) initPosition = "patient";
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [position, setPosition] = useState(initPosition);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [addr, setAddr] = useState("");
	const [dob, setDob] = useState("");
	// const [doctorRegNumber, setDoctorRegNumber] = useState("");
	// const [counselorRegNumber, setCounselorRegNumber] = useState("");
	const [registrationNumber, setRegistrationNumber] = useState("");

	const userRegister = useAppSelector(selectUserRegister);
	const dispatch = useAppDispatch();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(register(position, name, email, password, phoneNumber, registrationNumber, dob, addr));
	};

	useEffect(() => {
		if (userRegister.success) {
			setTimeout(() => {
				dispatch(userRegisterReset());
				navigate("/signin");
			}, 5000);
		}
	}, [userRegister.success])

	return (
		<ThemeProvider theme={baseTheme}>
			<Box>
				<Header />
				<Container
					sx={{
						// marginTop: 8,
						marginBottom: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Stack direction={'row'} spacing={10} sx={{ marginTop: 6 }}>
						<img src={loginImage} height={550} width={610} />
						<form onSubmit={handleSubmit}>
							<Stack spacing={2} padding={5} mb={15}>
								<Typography variant="h4" color="primary">Register</Typography>
								<div>
									<FormControl fullWidth>
										<InputLabel variant="outlined" htmlFor="position" color="primary">
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
											color="primary"
										>
											<MenuItem value="patient">Patient</MenuItem>
											<MenuItem value="doctor">Doctor</MenuItem>
											<MenuItem value="counselor">Counselor</MenuItem>
										</Select>
									</FormControl>

								</div>

								{position === 'patient' && (
									<div style={{ marginTop: 0 }}>
										<h2 style={{ color: textColor }}>Patient Registration Form</h2>
										<Stack spacing={2} padding={0}>
											<TextField
												id="name-field"
												label="Name"
												variant="outlined"
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
												autoFocus
												autoComplete="name"
												color="primary"
											/>
											<TextField
												id="email-field"
												label="E-mail"
												variant="outlined"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												autoComplete="email"
												required
												color="primary"
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
												color="primary"
											/>
											<TextField
												id="number-field"
												variant="outlined"
												label="Phone Number"
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
												required
												color="primary"
											/>
											<TextField
												id="dateOfBirth"
												label="Date of Birth"
												type="date"
												value={dob}
												onChange={e => setDob(e.target.value)}
												variant="outlined"
												required
												color="primary"
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
												color="primary"
											/>
										</Stack>
									</div>
								)}
								{position === 'doctor' && (
									<div style={{ marginTop: 0 }}>
										<h2 style={{ color: textColor }}>Doctor Registration Form</h2>
										<Stack spacing={5} padding={0}>
											<TextField
												id="name-field"
												label="Name"
												variant="outlined"
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
												autoFocus
												autoComplete="name"
												color="primary"
											/>
											<TextField
												id="email-field"
												label="E-mail"
												variant="outlined"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												autoComplete="email"
												required
												color="primary"
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
												color="primary"
											/>
											<TextField
												id="number-field"
												variant="outlined"
												label="Phone Number"
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
												required
												color="primary"
											/>
											<TextField
												id="dateOfBirth"
												label="Date of Birth"
												type="date"
												value={dob}
												onChange={e => setDob(e.target.value)}
												variant="outlined"
												required
												color="primary"
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
												color="primary"
											/>
											<TextField
												id="doctorRegNumber"
												label="Doctor Registration Number"
												value={registrationNumber}
												onChange={e => setRegistrationNumber(e.target.value)}
												variant="outlined"
												required
												color="primary"
											/>
										</Stack>
									</div>
								)}
								{position === 'counselor' && (
									<div style={{ marginTop: 0 }}>
										<h2 style={{ color: textColor }}>Counselor Registration Form</h2>
										{/* Add Counselor-specific form fields here */}
										<Stack spacing={5} padding={0}>
											<TextField
												id="name-field"
												label="Name"
												variant="outlined"
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
												autoFocus
												autoComplete="name"
												color="primary"
											/>
											<TextField
												id="email-field"
												label="E-mail"
												variant="outlined"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												autoComplete="email"
												required
												color="primary"
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
												color="primary"
											/>
											<TextField
												id="phoneNumber"
												label="Phone Number"
												value={phoneNumber}
												onChange={e => setPhoneNumber(e.target.value)}
												variant="outlined"
												required
												color="primary"
											/>
											<TextField
												id="dateOfBirth"
												label="Date of Birth"
												type="date"
												value={dob}
												onChange={e => setDob(e.target.value)}
												variant="outlined"
												required
												color="primary"
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
												color="primary"
											/>
											<TextField
												id="counselorRegNumber"
												label="Counselor Registration Number"
												value={registrationNumber}
												onChange={e => setRegistrationNumber(e.target.value)}
												variant="outlined"
												required
												color="primary"
											/>
										</Stack>
									</div>
								)}
								{userRegister.error && <Typography color={red[500]}>{userRegister.errorMessage}</Typography>}
								{userRegister.success && <Typography color="primary">Registeration Successful! Redirect to Log In Page in 5 Seconds...</Typography>}
								<Stack direction="row" alignItems="baseline" spacing={5} justifyContent="space-between">
									<Link component={RouterLink} to={`/signin?position=${position}`} fontSize={18}>
										Have an account? Log in!
									</Link>
									<Button variant="contained" color="primary" type="submit" disabled={userRegister.success || userRegister.loading} size={'large'}>
										Sign Up
									</Button>
								</Stack>
							</Stack>
						</form>
					</Stack>
				</Container>
				<Footer />
			</Box >
		</ThemeProvider>
	);
}
