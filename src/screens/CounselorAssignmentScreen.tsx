import React, { useState, useEffect } from "react";
import { Grid, Typography, Chip, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Card, CardContent, Avatar, CardActions, Button, Box, Stepper, Step, StepLabel, Paper, Stack } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DatePickerToolbar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import timeslots from "../constants/Timeslots";
import { UserData } from "../types/UserDataType";
import { display, style } from "@mui/system";


export default function CounselorAssignmentScreen() {

	const [value, setValue] = React.useState('female');
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};


	const experts = [
		{ name: 'John Doe', role: 'Cardiologist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.' },
		{ name: 'Jane Doe', role: 'Neurologist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.' },
		{ name: 'Bob Smith', role: 'Dermatologist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.' },
		{ name: 'Alice Smith', role: 'Pediatrician', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.' },
		{ name: 'Mike Johnson', role: 'Oncologist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.' },
		{ name: 'Sara Johnson', role: 'Psychiatrist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.' },
	];
	const patient: UserData = {
		id: "patientId",
		email: "patient@front.end",
		role: "ROLE_PATIENT",
		name: "Patient Name",
		address: "142 Rue Wellington S",
		dob: "2000-01-01",
		phone: "8199933118",
		registrationNo: null,
		status: "VERIFIED",
		assessmentTaken: false,
		assessmentOptionsSelected:[],
	}

	return (
		<Box>
			<Stepper activeStep={activeStep} sx={{ marginBottom: 2 }}>
				<Step>
					<StepLabel>Select a Date</StepLabel>
				</Step>
				<Step>
					<StepLabel>Select a Timeslot</StepLabel>
				</Step>
				<Step>
					<StepLabel>Select an Expert</StepLabel>
				</Step>
			</Stepper>
			<Grid container spacing={4} padding={1}>
				<Grid id="main-grid" container item direction="column" md={8} sm={12}>
					<Grid item container id="date-timeslot-picker-grid">
						<Grid item container direction="column" id="date-picker" spacing={2} md={12} lg={8}>
							<Grid item>
								<Typography variant="h4">Date Picker</Typography>
							</Grid>
							<Grid item>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<StaticDatePicker orientation="landscape" disablePast
										slotProps={{
											actionBar: {
												actions: undefined
											}
										}}
									/>
								</LocalizationProvider>
							</Grid>

						</Grid>
						<Grid item container direction="column" spacing={2} id="timeslot-picker" lg={4} md={12}>
							<Grid item>
								<Typography variant="h4">Timeslot Picker</Typography>
							</Grid>
							<Grid item>
								<FormControl>
									<RadioGroup
										aria-labelledby="demo-controlled-radio-buttons-group"
										name="controlled-radio-buttons-group"
										value={value}
										onChange={handleChange}
										row
									>
										{timeslots.map((entry) =>
											<FormControlLabel sx={{ width: "9rem" }} key={entry} value={entry} control={<Radio />} label={entry} />
										)}
									</RadioGroup>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
					<Grid item container direction="column" id="expert-picker" spacing={2}>
						<Grid item>
							<Typography variant="h4">Expert Picker</Typography>
						</Grid>

						<Grid item container spacing={3}>
							{experts.map((expert) => (
								<Grid item xs={12} sm={6} xl={4} key={expert.name}>
									<Card
										sx={{ minHeight: "5rem", minWidth: "16rem" }}
									>
										<Box display="flex" flexDirection="row" padding={2}>
											<Box display="flex" alignItems="center" >
												<Avatar>{expert.name.charAt(0)}</Avatar>
											</Box>
											<Box flexGrow={1} marginLeft={2}>
												<Typography variant="h5" component="h2">
													{expert.name}
												</Typography>
												<Typography color="textSecondary">{expert.role}</Typography>
											</Box>
											<Box>
												<CardActions>
													<Button variant="contained" color="primary">
														Select
													</Button>
												</CardActions>
											</Box>
										</Box>
									</Card>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
				<Grid id="profile-grid" item container md={4} direction="column" spacing={3}>
					<Grid id="patient-details" item container spacing={2} direction="column">
						<Grid item>
							<Typography variant="h4">Patient Details</Typography>
						</Grid>
						<Grid item>
							<Paper sx={{ p: 3, paddingTop: 1, display: "flex", flexDirection: "column" }}>
								<Box display="flex" alignItems="center" justifyContent="flex-start" >
									<Avatar>{patient.name.charAt(0)}</Avatar>
									<Typography variant="h5" margin={3}>{patient.name}</Typography>
								</Box>
								<Stack spacing={1}>
									<Typography>ID: {patient.id}</Typography>
									<Typography>Email: {patient.email}</Typography>
									<Typography>Role: {patient.role}</Typography>
									<Typography>Address: {patient.address}</Typography>
									<Typography>Date of Birth: {patient.dob}</Typography>
									<Typography>Phone: {patient.phone}</Typography>
									<Typography>Status: {patient.status}</Typography>
								</Stack>
							</Paper>
						</Grid>
					</Grid>
					<Grid id="expert-details" item container spacing={2} direction="column">
						<Grid item>
							<Typography variant="h4">Expert Details</Typography>
						</Grid>
						<Grid item>
							<Paper sx={{ p: 3, paddingTop: 1, display: "flex", flexDirection: "column" }}>
								<Box display="flex" alignItems="center" justifyContent="flex-start" >
									<Avatar>{patient.name.charAt(0)}</Avatar>
									<Typography variant="h5" margin={3}>{patient.name}</Typography>
								</Box>
								<Stack spacing={1}>
									<Typography>ID: {patient.id}</Typography>
									<Typography>Email: {patient.email}</Typography>
									<Typography>Role: {patient.role}</Typography>
									<Typography>Address: {patient.address}</Typography>
									<Typography>Date of Birth: {patient.dob}</Typography>
									<Typography>Phone: {patient.phone}</Typography>
									<Typography>Status: {patient.status}</Typography>
								</Stack>
							</Paper>
						</Grid>
						<Grid item container>
							<Button variant="outlined" color="secondary" sx={{ flexGrow: 1, marginRight: "1rem" }}>Back</Button>
							<Button disabled variant="contained" sx={{ flexGrow: 1, marginLeft: "1rem" }}>Finish</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}