import React, { useState, useEffect } from "react";
import { Grid, Typography, Chip, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Card, CardContent, Avatar, CardActions, Button, Box, Stepper, Step, StepLabel, Paper, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Alert, Snackbar } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DatePickerToolbar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import timeslots from "../constants/Timeslots";
import { UserData } from "../types/UserDataType";
import { display, style } from "@mui/system";
import SelfAssessmentForm from "../components/SelfAssessmentForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import { roleToPosition } from "../constants/PositionRoleMap";
import { useNavigate } from "react-router";
import { selectCounselorAssignment, assignSelf, assignDoctor, markCounsellingDone, resetToInitialState } from "../features/counselor/counselorAssignmentSlice";
import generateResultFromSelfAssessmentResult, { AssessmentSummary } from "../utils/GenerateResultFromSelfAssessmentResult";
import { userInfo } from "os";
import roles from "../constants/Roles";
import { setPatient as appointmentSetPatient } from "../features/appointment/appointmentSlice";


export default function CounselorAssignmentScreen() {

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userLogIn = useAppSelector(selectUserLogIn);
	const counselorAssignment = useAppSelector(selectCounselorAssignment);

	const [value, setValue] = useState("");
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

	// const experts = [
	// 	userLogIn.userInfo ? { name: userLogIn.userInfo?.userData.name, role: roleToPosition.get(userLogIn.userInfo?.userData.role) } : { name: "Myself", role: "counselor" },
	// 	{ name: 'John Doe', role: 'Cardiologist' },
	// 	{ name: 'Jane Doe', role: 'Neurologist' },
	// 	{ name: 'Bob Smith', role: 'Dermatologist' },
	// 	{ name: 'Alice Smith', role: 'Pediatrician' },
	// 	{ name: 'Mike Johnson', role: 'Oncologist' },
	// 	{ name: 'Sara Johnson', role: 'Psychiatrist' },
	// ];
	// const patient: UserData = {
	// 	id: "patientId",
	// 	email: "patient@front.end",
	// 	role: "ROLE_PATIENT",
	// 	name: "Patient Name",
	// 	address: "142 Rue Wellington S",
	// 	dob: "2000-01-01",
	// 	phone: "8199933118",
	// 	registrationNo: null,
	// 	status: "VERIFIED",
	// 	assessmentTaken: false,
	// 	assessmentOptionsSelected: [],
	// }

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [comment, setComment] = React.useState("");
	const [commentErrorMessage, setCommentErrorMessage] = React.useState("");

	const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComment(event.target.value);
	};

	const handleSubmit = (event: React.MouseEvent) => {
		event.preventDefault();
	}

	const handleAssignSelf = (event: React.MouseEvent) => {
		event.preventDefault();
		if (userLogIn.userInfo && comment !== "") {
			dispatch(assignSelf(userLogIn.userInfo.token, counselorAssignment.patient, userLogIn.userInfo?.userData, comment))
		}
		if (comment === "") {
			setCommentErrorMessage("A comment is required!");
		}
	}

	const handleAssignDoctor = (event: React.MouseEvent) => {
		event.preventDefault();
		if (userLogIn.userInfo && comment !== "") {
			dispatch(assignDoctor(userLogIn.userInfo.token, counselorAssignment.patient, userLogIn.userInfo?.userData, comment))
		}
		if (comment === "") {
			setCommentErrorMessage("A comment is required!");
		}
	}

	const assessmentSummary = generateResultFromSelfAssessmentResult(counselorAssignment.patient.assessmentOptionsSelected);


	useEffect(() => {
		if (counselorAssignment.success) {
			if (counselorAssignment.expertRole === roles.counselor) {
				// TODO, set patient in next slice
				dispatch(appointmentSetPatient(counselorAssignment.patient));
				dispatch(resetToInitialState())
				navigate(`/counselor/modify_appointment`);
			}
			if (counselorAssignment.expertRole === roles.doctor) {
				dispatch(resetToInitialState())
				navigate(`/counselor/dashboard`);
			}

		}
	}, [counselorAssignment.success])

	return (
		<Box>
			<Grid container spacing={4} padding={1}>
				<Grid id="main-grid" container item direction="column" md={8} sm={12} spacing={3}>

					<Grid item
						container
						id="patient-self-assessment-grid"
						direction="column"
						spacing={2}
					>
						<Grid item>
							<Typography variant="h4">Patient Self Asssessment Form</Typography>
						</Grid>
						<Grid item >
							<SelfAssessmentForm answerArr={counselorAssignment.patient.assessmentOptionsSelected} />
						</Grid>
					</Grid>
					<Grid item container direction="column" id="expert-picker" spacing={2}
						sx={{ marginTop: 2 }}
					>
						<Grid item>
							<Typography variant="h5">{"Counselor's comment"}</Typography>
						</Grid>

						<Grid item>
							<TextField
								id="outlined-multiline-flexible"
								label="Counselor's comment"
								placeholder="Please enter your comment..."
								required
								multiline
								maxRows={6}
								value={comment}
								onChange={handleCommentChange}
								sx={{ width: "60%" }}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid id="profile-grid" item container md={4} direction="column" spacing={3}>
					<Grid id="patient-details" item container spacing={2} direction="column">
						<Grid item>
							<Typography variant="h4">Assessment Summary</Typography>
						</Grid>
						<Grid item>
							<Paper sx={{ p: 3, paddingTop: 1, display: "flex", flexDirection: "column" }}>
								<Stack spacing={1}>
									<Typography>Score: {assessmentSummary.totalScore}</Typography>
									<Typography>Status: {assessmentSummary.status}</Typography>
									<Typography>Description: {assessmentSummary.description}</Typography>
								</Stack>
							</Paper>
						</Grid>
					</Grid>
					<Grid id="patient-details" item container spacing={2} direction="column">
						<Grid item>
							<Typography variant="h5">Patient Details</Typography>
						</Grid>
						<Grid item>
							<Paper sx={{ p: 3, paddingTop: 1, display: "flex", flexDirection: "column" }}>
								<Box display="flex" alignItems="center" justifyContent="flex-start" >
									<Avatar>{counselorAssignment.patient.name.charAt(0)}</Avatar>
									<Typography variant="h6" margin={3}>{counselorAssignment.patient.name}</Typography>
								</Box>
								<Stack spacing={1}>
									<Typography>ID: {counselorAssignment.patient.id}</Typography>
									<Typography>Email: {counselorAssignment.patient.email}</Typography>
									<Typography>Role: {roleToPosition.get(counselorAssignment.patient.role)}</Typography>
									<Typography>Address: {counselorAssignment.patient.address}</Typography>
									<Typography>Date of Birth: {counselorAssignment.patient.dob}</Typography>
									<Typography>Phone: {counselorAssignment.patient.phone}</Typography>
									<Typography>Status: {counselorAssignment.patient.status}</Typography>
								</Stack>
							</Paper>
						</Grid>
						<Grid item container display="flex" justifyContent="space-between">
							<Button variant="contained"
								onClick={() => { navigate("../") }}
								sx={{ backgroundColor: "secondary.dark" }}
							>Back</Button>
							<Button
								variant="contained" onClick={handleAssignSelf}>
								Assign Self
							</Button>
							<Button
								variant="contained" onClick={handleAssignDoctor}>
								Assign Doctor
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>


			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Finish with a comment</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Leave a comment for assigning the patient.
					</DialogContentText>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: 'fit-content',
						}}
					>
						<TextField
							id="outlined-multiline-flexible"
							label="Counselor's comment"
							placeholder="Please enter your comment..."
							required
							multiline
							maxRows={6}
							value={comment}
							onChange={handleCommentChange}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
					<Button variant="contained" onClick={handleSubmit}>Submit</Button>
				</DialogActions>
			</Dialog>


			<Snackbar
				open={commentErrorMessage !== ""}
				autoHideDuration={6000}
				onClose={handleClose}
				message={commentErrorMessage}
			/>
		</Box>
	)
}