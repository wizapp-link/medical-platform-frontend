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
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function RegisterScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [position, setPosition] = useState("");
	const [phoneNumber, setPhoneNumber] = useState('');
	const [addr, setAddr] = useState("");
	const [dob, setDob] = useState("");
	const [doctorRegNumber, setDoctorRegNumber] = useState('');


	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<Box>
			<Header />
			<Container
				sx={{
					marginTop: 8,
					marginBottom: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<form onSubmit={handleSubmit}>
					<Stack spacing={5} padding={5} mb={15}>
						<Typography variant="h4">Register</Typography>
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
									defaultValue={""}
								>
									<MenuItem value="">Select Position</MenuItem>
									<MenuItem value="patient">Patient</MenuItem>
									<MenuItem value="doctor">Doctor</MenuItem>
									<MenuItem value="counselor">Counselor</MenuItem>
									<MenuItem value="manager">Manager</MenuItem>
								</Select>
							</FormControl>

						</div>

						{position === 'patient' && (
							<div>
								<h2>Patient Registration Form</h2>
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
									/>
									<TextField
										id="email-field"
										label="E-mail"
										variant="outlined"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="email"
										required
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
								</Stack>
							</div>
						)}
						{position === 'doctor' && (
							<div>
								<h2>Doctor Registration Form</h2>
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
									/>
									<TextField
										id="email-field"
										label="E-mail"
										variant="outlined"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="email"
										required
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
									<TextField
										id="number-field"
										variant="outlined"
										label="Number"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
										required
									/>
									<TextField
										id="dateOfBirth"
										label="Date of Birth"
										type="date"
										value={dob}
										onChange={e => setDob(e.target.value)}
										variant="outlined"
										required
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
									/>
									<TextField
										id="doctorRegNumber"
										label="Doctor Registration Number"
										value={doctorRegNumber}
										onChange={e => setDoctorRegNumber(e.target.value)}
										variant="outlined"
										required
									/>


								</Stack>
							</div>
						)}
						{position === 'counselor' && (
							<div>
								<h2>Counselor Registration Form</h2>
								{/* Add Counselor-specific form fields here */}
							</div>
						)}
						{position === 'manager' && (
							<div>
								<h2>Manager Registration Form</h2>
								{/* Add Manager-specific form fields here */}
							</div>
						)}

						<Stack direction="row" alignItems="baseline" spacing={5}>
							<Link component={RouterLink} to={`/signin`}>
								Have an account? Log in!
							</Link>
							<Button variant="contained" color="secondary" type="submit">
								Register now!
							</Button>
						</Stack>
					</Stack>
				</form>
			</Container>
			<Footer />
		</Box >
	);
}
