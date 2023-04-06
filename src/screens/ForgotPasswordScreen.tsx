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
import ReduxSnackbar from "../components/ReduxSnackbar";
import { closeSnackbar, newError, requestOtp, resetPassword, selectForgotPassword } from "../features/auth/forgotPasswordSlice";

export default function ForgotPasswordScreen() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [otp, setOtp] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (password1 === password2 && password1.length >= 8) {
			dispatch(resetPassword(undefined, email, otp, password1));
		} else {
			dispatch(newError("Passwords do not match or are too short"));
		}
	};

	const handleResend = (e: FormEvent) => {
		e.preventDefault();
		dispatch(requestOtp(undefined, email));
	}

	const forgotPassoword = useAppSelector(selectForgotPassword);
	const dispatch = useAppDispatch();
	useEffect(() => {
		// dispatch(requestOtp(email));
	}, []);

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
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								required
							/>
							<Button onClick={handleResend}>Resend</Button>
						</Stack>
						<TextField
							id="password-field1"
							label="New Password"
							variant="outlined"
							value={password1}
							onChange={(e) => setPassword1(e.target.value)}
							type="password"
							required
						/>
						<TextField
							id="password-field2"
							label="Confirm Password"
							variant="outlined"
							value={password2}
							onChange={(e) => setPassword2(e.target.value)}
							type="password"
							required
						/>
						<Stack direction="row" alignItems="baseline" spacing={5} justifyContent="space-between">
							<Link component={RouterLink} to={`/signin`} color='primary'>
								Return to Log In
							</Link>
							<Button variant="contained" color="primary" type="submit">
								Submit
							</Button>
						</Stack>
					</Stack>
				</form>
			</Container>
			<Footer />
			<ReduxSnackbar
				show={forgotPassoword.showSnackbar}
				loading={forgotPassoword.loading}
				success={forgotPassoword.success}
				error={forgotPassoword.error}
				message={forgotPassoword.message}
				onClose={() => dispatch(closeSnackbar())}
				autoHideDuration={5000}
			/>
		</Box >
	);
}
