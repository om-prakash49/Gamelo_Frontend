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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authapi";
import { motion } from "framer-motion";

const LoginPage = () => {
    const [login, setLogin] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

	const getTokenFromCookies = () => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === "authToken") return value;
        }
        return null;
    };

	useEffect(() => {
        const token = getTokenFromCookies();
        if (token) {
            localStorage.setItem("token", token);
            navigate("/");
        }
    }, [navigate]);
	
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(login.email, login.password);
            toast({
                title: "Welcome Back!",
                description: "You've successfully logged in.",
                type: "success",
            });
            navigate("/");
        } catch (error) {
            toast({
                title: "Oops!",
                description:
                    error.message ||
                    "Unable to log in. Please check your credentials.",
                type: "error",
            });
        } finally {
            setLogin({ email: "", password: "" });
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to backend Google authentication endpoint
        toast({
            title: "Redirecting to Google...",
            description: "Please wait while we redirect you to sign in.",
            type: "info",
        });

        window.location.href = "http://localhost:5000/auth/google/";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
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
                            Sign In
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="space-y-4">
                                <Label
                                    htmlFor="email"
                                    className="text-lg text-gray-700"
                                >
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={login.email}
                                    onChange={handleChange}
                                    placeholder="johndoe@example.com"
                                    autoComplete="email"
                                />
                            </div>

                            <div className="space-y-4">
                                <Label
                                    htmlFor="password"
                                    className="text-lg text-gray-700"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={login.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-1 top-0 text-gray-500"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Button
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
                                type="submit"
                                disabled={!login.email || !login.password}
                            >
                                Log In
                            </Button>
                            <Link
                                to="/forgetPassword"
                                className="text-indigo-600 hover:text-indigo-800 font-medium pt-2"
                            >
                                Forgot Password?
                            </Link>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col items-center space-y-4">
                        <div className="text-gray-500">or continue with</div>
                        <GoogleButton onClick={handleGoogleLogin} className="w-full" />
                        <Link
                            to="/register"
                            className="text-indigo-600 font-medium"
                        >
                            Don't have an account?{" "}
                            <span className="text-red-600">Register</span>
                        </Link>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
};

export default LoginPage;
