import React, { FormEvent, useEffect, useState } from "react";
import {
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
	Container,
	Box,
	Link,
} from "@mui/material";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ForgotPasswordScreen() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [name, setName] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	const handleReturnToLogIn = () => {
		navigate('/');
	}

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
					<Stack spacing={5} padding={5}>
						<Typography variant="h4">Reset Password</Typography>
						<TextField
							id="email-field"
							label="E-mail"
							variant="outlined"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="email"
							required
							autoFocus
						/>
						<Stack direction="row" spacing={1}>
							<TextField
								id="otp-field"
								label="OTP"
								variant="outlined"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
							<Button>Resend</Button>
						</Stack>
						<TextField
							id="password-field"
							label="New Password"
							variant="outlined"
							value={password1}
							onChange={(e) => setPassword1(e.target.value)}
							type="password"
							required
						/>
						<TextField
							id="password-field"
							label="Confirm Password"
							variant="outlined"
							value={password2}
							onChange={(e) => setPassword2(e.target.value)}
							type="password"
							required
						/>
						<Stack direction="row" alignItems="baseline" spacing={5}>
							<Button variant="contained" color="secondary" onClick={handleReturnToLogIn}>
								Return to Log In
							</Button>
							<Button variant="contained" color="primary" type="submit">
								Submit
							</Button>
						</Stack>
					</Stack>
				</form>
			</Container>
			<Footer />
		</Box >
	);
}
