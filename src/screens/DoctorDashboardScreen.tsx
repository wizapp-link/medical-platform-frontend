import { CheckBox } from '@mui/icons-material';
import { Box, Typography, Stack, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, Checkbox, IconButton } from '@mui/material';
import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { createTheme, ThemeProvider, colors} from '@mui/material';
import { doctorTheme } from '../Themes';
import {RootState} from "../app/store";
import { useSelector } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { selectUserLogIn } from "../features/auth/userLogInSlice";

export default function DoctorDashboardScreen(props: any) {
	const doctor = useSelector((state:RootState) => state.doctor)
	const { userInfo } = useAppSelector(selectUserLogIn);
	return <ThemeProvider theme={doctorTheme}>
	<Stack padding={2} spacing={2}>
		<Typography variant='h3'>
			Good day! {userInfo?.userData.name}!
		</Typography>
		<Typography variant='h5'>
			How can we help you?
		</Typography>
		{/* if the assessment is not completed */}
		{/* <Button variant="contained">Complete the assessment</Button> */}
		{/* if the assessment is completed, the patient can view the appointment schedule and decide to accept/reject it */}
		<Button variant="contained">View Appointments</Button>
		<Divider />


		<Stack>
			<Typography variant='h5'>
				Recent Appointments
			</Typography>
			<List>
				<ListItem
					secondaryAction={
						<Stack
							direction={'column'}
							spacing={1}
						>
							<Button variant="contained">Accept</Button>
							<Button variant="contained" color="secondary">Reject</Button>
							{/* <IconButton color="primary"><CheckCircleIcon /></IconButton>
						<IconButton color="secondary"><CancelIcon /></IconButton> */}
						</Stack>
					}
				>
					<ListItemAvatar>
						<Avatar alt="doctor" src="/static/images/doctor/sampleDoctor.jpg" />
					</ListItemAvatar>
					<ListItemText
						primary="Dr. Gregory House"
						secondary="Date: 2023-02-12 "
					>
						{" - 16:00 to 17:00"}
					</ListItemText>

					<Divider variant="inset" component="li" />
				</ListItem>
			</List>

		</Stack>
	</Stack>
	</ThemeProvider> 
}