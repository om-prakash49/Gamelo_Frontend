import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/authapi";
import { motion } from "framer-motion";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleSendOtp = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await forgotPassword(email);
			console.log("OTP sent successfully:", response);
			localStorage.setItem("forgotPasswordEmail", email);
			toast({
				title: "Success!",
				description: "OTP sent successfully. Check your email.",
				type: "success",
			});
			navigate("/otp");
		} catch (error) {
			setError(error.message || "Failed to send OTP. Please try again.");
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
							Forget Password
						</CardTitle>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSendOtp} className="space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="text-lg text-gray-700"
								>
									Registered Email
								</Label>
								<Input
									id="email"
									type="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									autoComplete="email"
								/>
							</div>

							{error && (
								<p className="text-red-500 text-sm text-center">
									{error}
								</p>
							)}

							<Button
								className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl "
								type="submit"
								disabled={!email || loading}
							>
								{loading ? "Sending OTP..." : "Send OTP"}
							</Button>
						</form>
					</CardContent>

					<CardFooter className="text-center">
						<Link
							to="/login"
							className="text-indigo-600 hover:text-indigo-800 font-medium"
						>
							Back to Login
						</Link>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
};

export default ForgotPassword;
