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
import CounselorProfileScreen from './screens/counselorFile/CounselorProfileScreen';
import DoctorHomeScreen from './screens/DoctorHomeScreen';
import DoctorDashboardScreen from './screens/DoctorDashboardScreen';
import DoctorAppointmentScreen from './screens/DoctorAppointmentScreen';
import DoctorProfileScreen from './screens/DoctorProfileScreen';
import DoctorSettingsScreen from './screens/DoctorSettingsScreen';


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
						<Route path="counselorProfile" element={<CounselorProfileScreen />} />
					</Route>
					<Route path="doctor" element={<DoctorHomeScreen />}>
						<Route index element={<DoctorDashboardScreen />} />
						<Route path="dashboard" element={<DoctorDashboardScreen />} />
						<Route path="appointments" element={<DoctorAppointmentScreen />} />
						<Route path="profile" element={<DoctorProfileScreen />} />
						<Route path="settings" element={<DoctorSettingsScreen />} />
					</Route>
					<Route path="patientregister" element={<PatientRegisterScreen />} />
					<Route path="register" element={<RegisterScreen />} />
				</Routes>

				{/* ~~~~~~~~~~this is for counselor ~~~~~~~~~~*/}
				{/* ~~~~~~~~~~this is for counselor ~~~~~~~~~~*/}
				

			</div>
		</Router>
	);
}

export default App;