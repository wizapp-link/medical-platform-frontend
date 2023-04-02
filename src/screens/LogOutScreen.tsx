import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button, Paper, Stack, TextField, Link, Typography, Container, Box, FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { createTheme, ThemeProvider, colors } from '@mui/material';
import { baseTheme } from '../Themes';
import { selectUserLogIn, logIn, logOut } from '../features/auth/userLogInSlice';

export default function LogOutScreen() {

	const navigate = useNavigate();
	const userLogIn = useAppSelector(selectUserLogIn);
	const { userInfo, loading, error, errorMessage } = userLogIn;
	const dispatch = useAppDispatch();


	dispatch(logOut());


	useEffect(() => {
		if (userInfo == null) {
			window.location.reload();
			navigate("/");
		}
	}, [userInfo]);

	return (
		<Typography variant='h4'>Logging out...</Typography>
	);
}