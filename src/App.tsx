import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LogInScreen from './screens/LogInScreen';
import LogOutScreen from './screens/LogOutScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import PatientHomeScreen from './screens/PatientHomeScreen';
import PatientDashboardScreen from './screens/PatientDashboardScreen';
import PatientProfileScreen from './screens/PatientProfileScreen';
import PatientAppointmentScreen from './screens/PatientAppointmentScreen';
import PatientAssessmentScreen from './screens/PatientAssessmentScreen';
import PatientChangePasswordScreen from './screens/PatientChangePasswordScreen';
import RegisterScreen from "./screens/RegisterScreen";
import { createTheme, ThemeProvider, colors } from '@mui/material';
import DoctorHomeScreen from './screens/DoctorHomeScreen';
import DoctorDashboardScreen from './screens/DoctorDashboardScreen';
import DoctorAppointmentScreen from './screens/DoctorAppointmentScreen';
import DoctorProfileScreen from './screens/DoctorProfileScreen';
import DoctorSettingsScreen from './screens/DoctorSettingsScreen';
{/* ~~~~~~~~~~this is for counselor ~~~~~~~~~~*/ }
import CounselorHomeScreen from './screens/CounselorHomeScreen';
import CounselorAppointmentScreen from './screens/CounselorAppointmentScreen';
import CounselorDashboardScreen from './screens/CounselorDashboardScreen';
import CounselorProfileScreen from './screens/CounselorProfileScreen';
import CounselorChangePasswordScreen from './screens/CounselorChangePasswordScreen';
import CounselorAssignmentScreen from './screens/CounselorAssignmentScreen';
{/* ~~~~~~~~~~this is for manager ~~~~~~~~~~*/ }
import MangerHomeScreen from './screens/MangerHomeScreen';
import ManagerMembersScreen from './screens/ManagerMembersScreen';
import ManagerDashboardScreen from './screens/ManagerDashboardScreen';
import ManagerProfileScreen from './screens/ManagerProfileScreen';
import ManagerSettingsScreen from './screens/ManagerSettingsScreen';
import CounselorModifyAppointmentScreen from './screens/CounselorModifyAppointmentScreen';
import DoctorModifyAppointmentScreen from "./screens/DoctorModifyAppointmentScreen";


const patientTheme = createTheme({
	palette: {
		primary: {
			main: '#DCE7D7',
			dark: '#A9C39E',
			contrastText: '#153D3C'
		},
		secondary: {
			main: '#F6B56B',
			dark: '#F1876F'
		}
	},
})





function App() {
	return (
		<Router>
			<div className="App"
				style={{ minHeight: "100vh" }}
			>
				<Routes>
					<Route path="signin" element={<LogInScreen />} />
					<Route path="signout" element={<LogOutScreen />} />
					<Route path="/" element={<LogInScreen />} />

					<Route path="patient" element={<PatientHomeScreen />}>
						<Route index element={<PatientDashboardScreen />} />
						<Route path="dashboard" element={<PatientDashboardScreen />} />
						<Route path="appointments" element={<PatientAppointmentScreen />} />
						<Route path="assessment" element={<PatientAssessmentScreen />} />
						<Route path="profile" element={<PatientProfileScreen />} />
						<Route path="changepassword" element={<PatientChangePasswordScreen />} />
					</Route>


					<Route path="doctor" element={<DoctorHomeScreen />}>
						<Route index element={<DoctorDashboardScreen />} />
						<Route path="dashboard" element={<DoctorDashboardScreen />} />
						<Route path="appointments" element={<DoctorAppointmentScreen />} />
						<Route path="profile" element={<DoctorProfileScreen />} />
						<Route path="settings" element={<DoctorSettingsScreen />} />
						<Route path="modify_appointment" element={<DoctorModifyAppointmentScreen />} />
					</Route>


					{/* ~~~~~~~~~~this is for counselor ~~~~~~~~~~*/}
					<Route path="counselor" element={<CounselorHomeScreen />}>
						<Route index element={<CounselorDashboardScreen />} />
						<Route path="dashboard" element={<CounselorDashboardScreen />} />
						<Route path="appointments" element={<CounselorAppointmentScreen />} />
						<Route path="assignment" element={<CounselorAssignmentScreen />} />
						<Route path="modify_appointment" element={<CounselorModifyAppointmentScreen />} />
						<Route path="profile" element={<CounselorProfileScreen />} />
						<Route path="changepassword" element={<CounselorChangePasswordScreen />} />
					</Route>

					{/* ~~~~~~~~~~this is for counselor ~~~~~~~~~~*/}
					<Route path="forgot_password" element={<ForgotPasswordScreen />} />
					<Route path="register" element={<RegisterScreen />} />

					{/* ~~~~~~~~~~this is for MANAGER ~~~~~~~~~~*/}
					<Route path="manager" element={<MangerHomeScreen />}>
						<Route index element={<ManagerDashboardScreen />} />
						<Route path="dashboard" element={<ManagerDashboardScreen />} />
						<Route path="members" element={<ManagerMembersScreen />} />
						<Route path="profile" element={<ManagerProfileScreen />} />
						<Route path="settings" element={<ManagerSettingsScreen />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;