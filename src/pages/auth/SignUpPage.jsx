import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerUser } from "../../api/authapi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignUpPage() {
	const [user, setUser] = useState({
		fullName: "",
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const isFormValid = () => {
		return (
			user.fullName &&
			user.userName &&
			user.email &&
			user.password &&
			user.confirmPassword &&
			user.password === user.confirmPassword
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await registerUser(user);
			console.log("User Registered Successfully:", response);
			setUser({
				fullName: "",
				userName: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
			navigate("/login");
		} catch (err) {
			setError(err.message || "Registration failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -50 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="w-full max-w-lg"
			>
				<Card className="md:p-8 p-4 rounded-2xl bg-white shadow-2xl">
					<CardHeader className="mb-6">
						<CardTitle className="text-4xl font-bold text-center text-gray-800">
							Sign Up
						</CardTitle>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="space-y-4">
								{["fullName", "userName", "email"].map(
									(field) => (
										<div key={field} className="space-y-2">
											<Label
												htmlFor={field}
												className="text-lg text-gray-700"
											>
												{field.charAt(0).toUpperCase() +
													field.slice(1)}
											</Label>
											<Input
												type={
													field === "email"
														? "email"
														: "text"
												}
												id={field}
												name={field}
												value={user[field]}
												onChange={handleInputChange}
												placeholder={`Enter Your ${
													field
														.charAt(0)
														.toUpperCase() +
													field.slice(1)
												}`}
												autoComplete={
													field === "email"
														? "email"
														: ""
												}
											/>
										</div>
									)
								)}
							</div>

							<div className="space-y-4">
								{["password", "confirmPassword"].map(
									(field) => (
										<div
											key={field}
											className="space-y-2 relative"
										>
											<Label
												htmlFor={field}
												className="text-lg text-gray-700"
											>
												{field === "password"
													? "Password"
													: "Confirm Password"}
											</Label>
											<div className="relative">
												<Input
													type={
														showPassword
															? "text"
															: "password"
													}
													id={field}
													name={field}
													value={user[field]}
													onChange={handleInputChange}
													placeholder={
														field === "password"
															? "••••••••"
															: "••••••••"
													}
													autoComplete={
														field === "password"
															? "current-password"
															: ""
													}
												/>
												<Button
													type="button"
													variant="ghost"
													onClick={
														togglePasswordVisibility
													}
													className="absolute right-1 top-0 text-gray-500"
												>
													{showPassword ? (
														<AiOutlineEyeInvisible />
													) : (
														<AiOutlineEye />
													)}
												</Button>
											</div>
										</div>
									)
								)}
							</div>

							{error && (
								<p className="text-red-500 text-sm text-center">
									{error}
								</p>
							)}

							<Button
								className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
								type="submit"
								disabled={!isFormValid() || loading}
							>
								{loading
									? "Creating Account..."
									: "Create Account"}
							</Button>
						</form>
					</CardContent>

					<CardFooter className="flex flex-col items-center">
						<div className="text-gray-500">
							Already have an account?
						</div>
						<Link
							to="/login"
							className="text-indigo-600 font-medium"
						>
							Sign In
						</Link>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
}
