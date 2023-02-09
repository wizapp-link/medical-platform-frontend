import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SigninScreen from './screens/LogInScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
	return (
		<Router>
			<div className="App" style={{ marginTop: 50 }}>
				<Header />
				<main>
					<Routes>
						<Route path="/signin" element={<SigninScreen />} />
						<Route path="/" element={<SigninScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;