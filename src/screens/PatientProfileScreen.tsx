import { Box, Button, Container, Link, Stack, TextField, Typography } from '@mui/material';
import React, { FormEvent, useState } from 'react';

export default function PatientProfileScreen(props: any) {
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [addr, setAddr] = useState("");
	const [dob, setDob] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<Box>
			<Container>
				<form onSubmit={handleSubmit}>
					<Stack spacing={5} padding={5}>
						<Typography variant="h4">Profile</Typography>
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
					</Stack>
				</form>
			</Container>
		</Box >
	);
}