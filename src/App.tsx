import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SigninScreen from './screens/LogInScreen';
import PatientRegisterScreen from './screens/PatientRegisterScreen';
import PatientHomeScreen from './screens/PatientHomeScreen';
import PatientDashboardScreen from './screens/PatientDashboardScreen';
import PatientProfileScreen from './screens/PatientProfileScreen';
import PatientAppointmentScreen from './screens/PatientAppointmentScreen';
import PatientAssessmentScreen from './screens/PatientAssessmentScreen';
import PatientSettingsScreen from './screens/PatientSettingsScreen';
import RegisterScreen from "./screens/RegisterScreen";

import DoctorHomeScreen from './screens/DoctorHomeScreen';
import DoctorDashboardScreen from './screens/DoctorDashboardScreen';
import DoctorAppointmentScreen from './screens/DoctorAppointmentScreen';
import DoctorProfileScreen from './screens/DoctorProfileScreen';
import DoctorSettingsScreen from './screens/DoctorSettingsScreen';

{/* ~~~~~~~~~~this is for counselor ~~~~~~~~~~*/}
import CounselorHomeScreen from './screens/CounselorHomeScreen';
import CounselorAppointmentScreen from './screens/CounselorAppointmentScreen';
import CounselorDashboardScreen from './screens/CounselorDashboardScreen';
import CounselorProfileScreen from './screens/CounselorProfileScreen';
import CounselorSettingsScreen from './screens/CounselorSettingsScreen';



{/* ~~~~~~~~~~this is for manager ~~~~~~~~~~*/}
import MangerHomeScreen from './screens/MangerHomeScreen';
import ManagerAppointmentScreen from './screens/ManagerAppointmentScreen';
import ManagerDashboardScreen from './screens/ManagerDashboardScreen';
import ManagerProfileScreen from './screens/ManagerProfileScreen';
import ManagerSettingsScreen from './screens/ManagerSettingsScreen';


function App() {
	return (
		<Router>
			<div className="App"
				style={{ minHeight: "100vh" }}
			>
				<Routes>
					<Route path="signin" element={<SigninScreen />} />
					<Route path="/" element={<SigninScreen />} />
					<Route path="patient" element={<PatientHomeScreen />}>
						<Route index element={<PatientDashboardScreen />} />
						<Route path="dashboard" element={<PatientDashboardScreen />} />
						<Route path="appointments" element={<PatientAppointmentScreen />} />
						<Route path="assessment" element={<PatientAssessmentScreen />} />
						<Route path="profile" element={<PatientProfileScreen />} />
						<Route path="settings" element={<PatientSettingsScreen />} />
					</Route>


					<Route path="doctor" element={<DoctorHomeScreen />}>
						<Route index element={<DoctorDashboardScreen />} />
						<Route path="dashboard" element={<DoctorDashboardScreen />} />
						<Route path="appointments" element={<DoctorAppointmentScreen />} />
						<Route path="profile" element={<DoctorProfileScreen />} />
						<Route path="settings" element={<DoctorSettingsScreen />} />
					</Route>


					{/* ~~~~~~~~~~this is for counselor ~~~~~~~~~~*/}
					<Route path="counselor" element={<CounselorHomeScreen />}>
						<Route index element={<CounselorDashboardScreen />} />
						<Route path="dashboard" element={<CounselorDashboardScreen />} />
						<Route path="appointments" element={<CounselorAppointmentScreen />} />
						<Route path="profile" element={<CounselorProfileScreen />} />
						<Route path="settings" element={<CounselorSettingsScreen />} />
					</Route>

					{/* ~~~~~~~~~~this is for counselor ~~~~~~~~~~*/}
					<Route path="patientregister" element={<PatientRegisterScreen />} />
					<Route path="register" element={<RegisterScreen />} />

					{/* ~~~~~~~~~~this is for MANAGER ~~~~~~~~~~*/}
					<Route path="manager" element={<MangerHomeScreen />}>
						<Route index element={<ManagerDashboardScreen />} />
						<Route path="dashboard" element={<ManagerDashboardScreen />} />
						<Route path="appointments" element={<ManagerAppointmentScreen />} />
						<Route path="profile" element={<ManagerProfileScreen />} />
						<Route path="settings" element={<ManagerSettingsScreen />} />
					</Route>

				</Routes>
			</div>
		</Router>
	);
}

export default App;