import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { resetPassword } from "../../api/authapi";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResetPassword() {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { toast } = useToast();
	const email = localStorage.getItem("forgotPasswordEmail");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (newPassword !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		if (newPassword.length < 6) {
			setError("Password must be at least 6 characters long.");
			return;
		}

		setLoading(true);

		try {
			const response = await resetPassword(
				email,
				newPassword,
				confirmPassword
			);
			console.log("Password reset successfully:", response);
			toast({
				title: "Success!",
				description: "Your password has been reset successfully.",
				type: "success",
			});
			localStorage.removeItem("forgotPasswordEmail");
			navigate("/login");
		} catch (error) {
			console.error("Error resetting password:", error);
			setError(
				error.response?.data?.message ||
					error.message ||
					"Failed to reset password. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen p-4 grid items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -50 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="w-[75rem] max-w-lg"
			>
				<Card className="md:p-8 p-4 rounded-2xl bg-white shadow-2xl">
					<CardHeader className="text-center mb-6">
						<CardTitle className="text-4xl font-bold text-gray-800">
							Reset Your Password
						</CardTitle>
						<CardDescription className="text-sm text-gray-500">
							Enter your new password below.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form
							aria-label="Reset Password Form"
							onSubmit={handleSubmit}
						>
							<div className="space-y-6">
								<div>
									<Label htmlFor="newPassword">
										New Password
									</Label>
									<Input
										type="password"
										id="newPassword"
										placeholder="Enter a new password"
										value={newPassword}
										onChange={(e) =>
											setNewPassword(e.target.value)
										}
										autoComplete="new-password"
									/>
								</div>

								<div>
									<Label htmlFor="confirmPassword">
										Confirm New Password
									</Label>
									<Input
										type="password"
										id="confirmPassword"
										placeholder="Confirm new password"
										value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
										autoComplete="new-password"
									/>
								</div>

								{error && (
									<p
										className="text-red-500 text-sm text-center"
										aria-live="polite"
									>
										{error}
									</p>
								)}
							</div>
						</form>
					</CardContent>

					<CardFooter>
						<Button
							className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl"
							type="submit"
							disabled={
								!newPassword || !confirmPassword || loading
							}
							onClick={handleSubmit}
						>
							{loading
								? "Resetting Password..."
								: "Reset my password"}
						</Button>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
}
