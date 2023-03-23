import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SelfAssessmentForm from "../components/SelfAssessmentForm";
import timeslots from "../constants/Timeslots";
import { getTimeslot, selectAppointment, setAppointmentDateTime } from "../features/appointment/appointmentSlice";
import { selectUserLogIn } from "../features/auth/userLogInSlice";

export default function CounselorModifyAppointmentScreen() {

	const [date, setDate] = useState<string | null>(null);
	// timestamp value
	const [value, setValue] = useState("");

	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector(selectUserLogIn);
	const appointment = useAppSelector(selectAppointment);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [comment, setComment] = React.useState("");

	const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComment(event.target.value);
	};

	const handleSubmit = (event: React.MouseEvent) => {
		event.preventDefault();
		if (userInfo && date) {
			dispatch(setAppointmentDateTime(userInfo?.userData, appointment.patient, date, value));
		}
	};

	const handleReset = () => {
		setDate(null);
		setValue("");
		setComment("");
	}

	const handleDateChange = (dateStr: string | null) => {
		setDate(dateStr);
		const formattedDate = dayjs(dateStr).format("YYYY-MM-DD");
		console.log(`new date ${formattedDate}`);
		if (userInfo) {
			dispatch(getTimeslot(userInfo.userData, formattedDate));
		}
	}

	return (
		<Box>
			<Grid id="main-grid" container direction="column" spacing={3}>
				<Grid item container id="date-timeslot-picker-grid">
					<Grid
						item
						container
						direction="column"
						id="date-picker"
						spacing={2}
						md={12}
						lg={8}
					>
						<Grid item>
							<Typography variant="h4">Date Picker</Typography>
						</Grid>
						<Card
							sx={{
								marginTop: 5,
								marginRight: 15,
								marginLeft: 5,
								boxShadow: 3,
							}}
						>
							<CardContent>
								<Grid item>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<StaticDatePicker
											orientation="landscape"
											disablePast
											slotProps={{
												actionBar: {
													actions: undefined,
												},
											}}
											value={date}
											onChange={handleDateChange}
										/>
									</LocalizationProvider>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
					<Grid
						item
						container
						direction="column"
						spacing={2}
						id="timeslot-picker"
						lg={4}
						md={12}
					>
						<Grid item>
							<Typography variant="h4">Timeslot Picker</Typography>
						</Grid>
						<Card
							sx={{
								marginTop: 5,
								marginRight: 22,
								marginLeft: 4,
								boxShadow: 3,
								padding: 4,
							}}
						>
							<CardContent>
								<Grid item>
									<FormControl>
										<RadioGroup
											aria-labelledby="demo-controlled-radio-buttons-group"
											name="controlled-radio-buttons-group"
											value={value}
											onChange={handleChange}
											row
										>
											{appointment.timeslot.length === 0 &&
												<Typography>No Available Timeslot</Typography>}
											{appointment.timeslot.map((entry) => (
												<FormControlLabel
													sx={{ width: "9rem" }}
													key={entry}
													value={entry}
													control={<Radio />}
													label={entry}
												/>
											))}
										</RadioGroup>
									</FormControl>
								</Grid>
							</CardContent>
						</Card>
						<Box sx={{ marginTop: 5 }}>
							<Box display="flex" marginRight="11rem" marginLeft="2rem">
								<TextField
									id="outlined-multiline-flexible"
									label="Comment"
									placeholder="Please enter your comment..."
									required
									multiline
									maxRows={6}
									value={comment}
									onChange={handleCommentChange}
									sx={{ flexGrow: 1 }}
								/>
							</Box>

							<Stack
								direction={"row"}
								sx={{ justifyContent: "space-around", marginTop: 7 }}
								width={"100%"}
							>

								<Box display="flex">
									<Button variant="contained" color="secondary" sx={{ marginLeft: "1rem", marginRight: 3, fontSize: 18 }} onClick={handleReset}>
										RESET
									</Button>
									<Button variant="contained" color="secondary" sx={{ marginLeft: "1rem", fontSize: 18, marginRight: 12 }} onClick={handleSubmit}>
										SUBMIT
									</Button>
								</Box>
							</Stack>
						</Box>
					</Grid>
				</Grid>
			</Grid>
			{/* <Dialog open={open} onClose={handleClose}>
				<DialogTitle>Finish with a comment</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Leave a comment for the appointment with patient.
					</DialogContentText>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "fit-content",
						}}
					>
						<TextField
							id="outlined-multiline-flexible"
							label="Comment"
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
					<Button onClick={handleClose}>Close</Button>
					<Button onClick={handleSubmit}>Submit</Button>
				</DialogActions>
			</Dialog> */}
		</Box>
	);
}
