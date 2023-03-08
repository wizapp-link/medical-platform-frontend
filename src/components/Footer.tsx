import { Box, Typography } from '@mui/material';
import React from 'react';
import { createTheme, ThemeProvider, colors} from '@mui/material';
import { baseTheme } from '../Themes';

export default function Footer() {
	return (
		<ThemeProvider theme={baseTheme}>
		<Box
			sx={{ background: 'linear-gradient(to right, #6B6891, #388087, #6FB3B8,  #A9C39E, #BADFE7)', padding: 3, position: 'fixed', bottom: 0, minWidth: '100vw' }}
			component="footer">
			<Typography variant="h6" align="center" color={'secondary'}>
				Project: A Platform Connecting Patients with Depression to Medical Experts
			</Typography>
			<Typography variant="h6" align="center" color={'secondary'}>
				Copyright © SPM-TEAM-8
			</Typography>
		</Box>
		</ThemeProvider>
	);
}