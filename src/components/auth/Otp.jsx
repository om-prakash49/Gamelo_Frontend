import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../../api/authapi";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { motion } from "framer-motion";

export default function Otp() {
	const navigate = useNavigate();
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { toast } = useToast();
	const email = localStorage.getItem("forgotPasswordEmail");

	const handleOtpChange = (value) => setOtp(value || "");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await verifyOTP(email, otp);
			toast({
				title: "Success!",
				description: "OTP verified successfully.",
				type: "success",
			});
			navigate("/resetPassword");
		} catch (error) {
			setError(error.message || "Failed to verify OTP.");
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
					<CardHeader className="text-center mb-6">
						<CardTitle className="text-4xl font-bold text-gray-800">
							Enter OTP Code
						</CardTitle>
						<CardDescription className="text-sm text-gray-500">
							Please enter the verification code sent to your
							email
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<InputOTP
								maxLength={6}
								value={otp || ""}
								onChange={handleOtpChange}
							>
								<InputOTPGroup className="mx-auto text-black">
									{[...Array(6)].map((_, index) => (
										<InputOTPSlot
											key={index}
											index={index}
											value={otp[index] || ""}
										/>
									))}
								</InputOTPGroup>
							</InputOTP>

							{error && (
								<p className="text-red-500 text-sm text-center">
									{error}
								</p>
							)}

							<Button
								type="submit"
								disabled={otp.length !== 6 || loading}
								className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl"
							>
								{loading ? "Verifying OTP..." : "Confirm OTP"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
