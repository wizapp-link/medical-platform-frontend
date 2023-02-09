import React, { FormEvent, useEffect, useState } from "react";
import {
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
	Container,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function RegisterScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<Container
			sx={{
				marginTop: 8,
				marginBottom: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Paper>
				<form onSubmit={handleSubmit}>
					<Stack spacing={5} padding={5}>
						<Typography variant="h4">Register</Typography>
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
						<Button variant="contained" color="secondary" type="submit">
							Sign Up
						</Button>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}
