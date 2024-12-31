import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPassword from "./components/auth/ForgotPassword";
import Otp from "./components/auth/Otp";
import ResetPassword from "./components/auth/ResetPassword";
import SignUpPage from "./pages/auth/SignUpPage";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import About from "./pages/About";
import Profile from "./components/dashboard/Profile";
import AllGames from "./components/dashboard/AllGames";
import GameDetails from "./pages/GameDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<>
			<Routes>
				{/* Public routes */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<SignUpPage />} />
				<Route path="/forgetPassword" element={<ForgotPassword />} />
				<Route path="/resetPassword" element={<ResetPassword />} />
				<Route path="/otp" element={<Otp />} />

				{/* Private routes */}
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="about" element={<About />} />
					<Route
						path="profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route path="allGames" element={<AllGames />} />
					<Route
						path="game-detail/:id"
						element={
							<ProtectedRoute>
								<GameDetails />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
