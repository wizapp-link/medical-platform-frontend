import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button, Paper, Stack, TextField, Link, Typography, Container,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export default function LogInScreen() {
	// const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');


	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<Container
			sx={{
				marginTop: 8,
				marginBottom: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>

			<Paper>
				<form onSubmit={handleSubmit}>
					<Stack spacing={5} padding={5}>
						<Typography variant="h4">Sign In</Typography>
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
							<Link component={RouterLink} to={`/register`}>
								New user? Sign up!
							</Link>
							<Button variant="contained" color="secondary" type="submit">
								Sign In
							</Button>
						</Stack>
					</Stack>
				</form>
			</Paper>

		</Container>
	);
}