import { Box, Typography, Stack, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper } from '@mui/material';
import * as React from 'react';

export default function DoctorAppointmentScreen(props: any) {
	return (
		<Stack>
			<Typography variant='h5'>
				Appointment History
			</Typography>
			<List>
				<ListItem
					secondaryAction={
						<Stack
							direction={'column'}
							spacing={1}
						>
							<Button variant="contained">Accept</Button>
							<Button variant="outlined" color="secondary">Reject</Button>
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
	)
}
