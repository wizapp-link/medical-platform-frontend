import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DrawerOptionTextIconsType from '../types/DrawerOptionTextIconsType';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import UserProfileMenu from '../components/UserProfileMenu';
import { Stack, Avatar } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { selectUserLogIn } from '../features/auth/userLogInSlice';


const drawerWidth = 240;
const backgroundColor = '#388087';
const textColor = '#FFFFFF';
const text = '> Manager\'s Dashboard';

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
	backgroundColor: backgroundColor,
	color: textColor
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
	backgroundColor: backgroundColor,
	color: textColor
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,

}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
	backgroundColor: backgroundColor,
	color: textColor
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);

export default function ManagerHomeScreen() {
	const { userInfo } = useAppSelector(selectUserLogIn);

	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

	const handleIconButtonClicks = (text: string) => () => {
		// change text to lower case and remove whitespace, nagigate to the destination
		if (text === "Sign Out") {
			navigate("/signout");
		} else {
			navigate(text.toLowerCase().replace(/\s/g, ''));
		}
	}

	const drawerUserOptionsTextIcons: DrawerOptionTextIconsType[] = [{ text: "Dashboard", icon: HomeIcon }, { text: "Members", icon: People }];
	const drawerUserOptionsList =
		<List>
			{drawerUserOptionsTextIcons.map(
				(item) => (
					<ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
						<ListItemButton sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
							color: textColor
						}}
							onClick={handleIconButtonClicks(item.text)}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
									color: textColor
								}}
							>
								<item.icon />
							</ListItemIcon>
							<ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				)
			)}
		</List>
	const drawerAccountOptionsTextIcons: DrawerOptionTextIconsType[] = [{ text: "Settings", icon: SettingsIcon }, { text: "Sign Out", icon: LogoutIcon }]
	const drawerAccountOptionsList =
		<List>
			{drawerAccountOptionsTextIcons.map(
				(item) => (
					<ListItem key={`${item.text}-ListItem`} disablePadding sx={{ display: 'block' }}>
						<ListItemButton sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
							color: textColor
						}}
							onClick={handleIconButtonClicks(item.text)}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
									color: textColor
								}}
							>
								<item.icon />
							</ListItemIcon>
							<ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 , color: textColor}} />
						</ListItemButton>
					</ListItem>
				)
			)}
		</List>

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
							color: textColor
						}}
					>
						<MenuIcon />
					</IconButton>
					<Stack direction="row" sx={{ justifyContent: "start", flexGrow: 1, alignItems: "center" }}>
						<Typography variant="h6" noWrap component="div" color={'primary.contrastText'}>
							Depression Care
						</Typography>
						<Typography sx={{marginLeft: 1.5, marginTop: 0.25}}>
							{text}
						</Typography>
						{/* <UserProfileMenu /> */}
					</Stack>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader sx={{ justifyContent: 'space-between' }}>
					{/* <Avatar>{userInfo?.userData.name.charAt(0)}</Avatar> */}
					{/* <Typography>{userInfo?.userData.name}</Typography> */}
					<IconButton onClick={handleDrawerClose} sx={{color: textColor}}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				{drawerUserOptionsList}
				<Divider />
				{drawerAccountOptionsList}
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Outlet />
			</Box>
		</Box>
	);
}