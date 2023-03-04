import { createTheme, ThemeProvider, colors} from '@mui/material';
import { Box, Typography, Stack, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper } from '@mui/material';
import * as React from 'react';
import { patientTheme } from '../Themes';



export default function PatientAppointmentScreen(props: any) {
	return (
		<ThemeProvider theme={patientTheme}>
		<Stack>
			<Typography variant='h5' color={'primary.contrastText'}>
				Appointment History
			</Typography>
			<List>
				<ListItem
					secondaryAction={
						<Stack
							direction={'column'}
							spacing={1}
						>
							<Button variant="contained"  sx={{backgroundColor:'primary.dark',color:'primary.contrastText', ":hover":{backgroundColor:'primary.main'}}}>Accept</Button>
							<Button variant="contained" color='secondary' sx={{ color:'primary.contrastText', borderColor:'secondary.dark',":hover":{backgroundColor:'secondary.dark'}}}>Reject</Button>
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
						sx={{color:'primary.contrastText'}}
					>
						{" - 16:00 to 17:00"}
					</ListItemText>

					<Divider variant="inset" component="li" />
				</ListItem>
			</List>

		</Stack>
		</ThemeProvider>
	)
}
