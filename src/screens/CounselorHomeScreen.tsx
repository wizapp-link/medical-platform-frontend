import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DrawerOptionTextIconsType from '../types/DrawerOptionTextIconsType';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate, Link as RouterLink } from 'react-router-dom';
import PatientDashboardScreen from './PatientDashboardScreen';
import PatientProfileScreen from './PatientProfileScreen';
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { counselorTheme } from '../Themes';
import { selectUserLogIn } from '../features/auth/userLogInSlice';
import { useAppSelector } from '../app/hooks';
import UserProfileMenu from '../components/UserProfileMenu';
import Stack from '@mui/material/Stack';

const drawerWidth = 240;
const backgroundColor = '#BADFE7';
const textColor = '#0C293E';

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
	color: textColor,
	backgroundColor: backgroundColor
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
	color: textColor,
	backgroundColor: backgroundColor
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
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
	color: textColor,
	backgroundColor: backgroundColor
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

export default function CounselorHomeScreen() {
	const { userInfo } = useAppSelector(selectUserLogIn);

	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

	const handleIconButtonClicks = (text: string) => () => {
		// change text to lower case and remove whitespace, nagigate to the destination
		navigate(text.toLowerCase().replace(/\s/g, ''));
	}

	const drawerUserOptionsTextIcons: DrawerOptionTextIconsType[] = [{ text: "Dashboard", icon: HomeIcon }, { text: "Appointments", icon: CalendarMonthIcon }, { text: "Profile", icon: AccountBoxIcon }];
	const drawerUserOptionsList =
		<List>
			{drawerUserOptionsTextIcons.map(
				(item) => (
					<ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
						<ListItemButton sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5
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
	const drawerAccountOptionsTextIcons: DrawerOptionTextIconsType[] = [{ text: "Settings", icon: SettingsIcon }]
	const drawerAccountOptionsList =
		<List>
			{drawerAccountOptionsTextIcons.map(
				(item) => (
					<ListItem key={`${item.text}-ListItem`} disablePadding sx={{ display: 'block' }}>
						<ListItemButton sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5
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

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<ThemeProvider theme={counselorTheme}>
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
							}}
						>
							<MenuIcon />
						</IconButton>
						<Stack direction="row" sx={{ justifyContent: "space-between", flexGrow: 1, alignItems: "center" }}>
							<Typography variant="h6" noWrap component="div">
								Depression Care
							</Typography>
							<UserProfileMenu />
						</Stack>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open}>
					<DrawerHeader sx={{ justifyContent: 'space-between' }}>
						<Avatar>{userInfo?.userData.name.charAt(0)}</Avatar>
						<Typography>{userInfo?.userData.name}</Typography>
						<IconButton onClick={handleDrawerClose}>
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
		</ThemeProvider>
	);
}