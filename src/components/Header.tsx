import React, { FormEvent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Badge } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';

export default function Header() {
	const navigate = useNavigate();

	return (
		<header className="App-header">
			<AppBar position="fixed" color="primary">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" flexGrow={1}>
						<Link to="/" component={RouterLink} sx={{ textDecoration: 'none', color: 'inherit' }}>
							Platform Name Placeholder
						</Link>
					</Typography>
					<Typography variant='h6'>
						UserPlaceholder
					</Typography>
				</Toolbar>
			</AppBar>
		</header>
	);
}