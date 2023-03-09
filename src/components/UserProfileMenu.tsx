import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut, selectUserLogIn } from '../features/auth/userLogInSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { roleToPosition } from '../constants/PositionRoleMap';
import { Stack } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function UserProfileMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { userInfo } = useAppSelector(selectUserLogIn);

	const handleClick = (e: any) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSettings = () => {
		const position = roleToPosition.get(userInfo!.userData.role);
		navigate(`/${position}/settings`);
	}
	const handleProfile = () => {
		const position = roleToPosition.get(userInfo!.userData.role);
		navigate(`/${position}/profile`);
	}
	const handleLogOut = () => {
		setAnchorEl(null);
		navigate("/signout");
	};
	const handleLogInClick = () => {
		// let redirect = location.pathname;
		// if (redirect === '/register' || redirect === '/signin') redirect = '';
		// console.log(`redirecting to /signin?redirect=${redirect}`);
		// console.log(`localStorage.getItem('userInfo') = ${localStorage.getItem('userInfo')}`);
		navigate(`/`);
	};

	return (
		<div>
			{userInfo ? (
				<div>
					{/* <Button id="user-profile" onClick={handleClick} color="inherit" variant="text">
						{userInfo.userData.name}
					</Button> */}
					<Button onClick={handleClick}>
						<Stack direction="row" spacing={2} alignItems="center" >
							<Avatar>{userInfo?.userData.name.charAt(0)}</Avatar>
							<Typography sx={{ color: 'primary.contrastText' }}>{userInfo?.userData.name}</Typography>
							<ArrowDropDownIcon sx={{ color: "primary.contrastText" }} />
						</Stack>
					</Button>
					<Menu
						id="user-profile-menu"
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleSettings}>Settings</MenuItem>
						<MenuItem onClick={handleProfile}>Profile</MenuItem>
						<MenuItem onClick={handleLogOut}>Log Out</MenuItem>
					</Menu>
				</div>
			) : (
				<Button type="submit" color="inherit" onClick={handleLogInClick}>
					Sign In
				</Button>
			)
			}
		</div >
	);
}
