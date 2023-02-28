import React, { FormEvent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Badge } from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { createTheme, ThemeProvider, colors} from '@mui/material';
import { baseTheme } from '../Themes';

export default function Header() {
	const navigate = useNavigate();
	const { url } = useParams();

	return (
		<ThemeProvider theme={baseTheme}>
		<AppBar position="fixed" color="primary">
			<Toolbar>
				
				<Typography variant="h6" flexGrow={1} align="center" fontSize={30}>
					<Link to="/" component={RouterLink} justifyContent='center' sx={{ textDecoration: 'none', color: 'inherit'}}>
						Depression Care
					</Link>
				</Typography>
				{/* <Typography variant='h6'>
					UserName
				</Typography> */}
			</Toolbar>
		</AppBar>
		</ThemeProvider>
	);
}