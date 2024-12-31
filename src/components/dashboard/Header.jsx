import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "@/axios";
import { LogIn, UserRoundPen } from "lucide-react";

const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Games", href: "/allGames", current: false },
    { name: "Contact Us", href: "/allGames", current: false },
    { name: "Support", href: "/allGames", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [userName, setUserName] = useState("");
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            fetchUserProfile();
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance.get("/profile", {
                withCredentials: true,
            });
            const userData = response.data.user;
            setProfilePic(userData.profile_picture || "/Images/profile.png");
            setUserName(userData.fullName || userData.userName || "User");
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post("/logout");
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <header className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border-b border-gray-700 shadow-lg">
            <div className="container mx-auto px-2 flex items-center justify-between py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src="/Images/Logo.png" alt="Logo" className="h-10" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex space-x-6">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                                item.current
                                    ? "relative text-purple-600"
                                    : "relative text-white text-lg font-medium mx-2 py-2 group"
                            )}
                        >
                            {item.name}
                            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <div className="lg:flex hidden items-center space-x-4">
                            <Link
                                to="/profile"
                                className="flex items-center space-x-2"
                            >
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full border-2 border-red-500"
                                />
                                <span className="text-white font-medium">
                                    {userName}
                                </span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 px-4 text-sm flex justify-between items-center font-semibold py-2 rounded-md text-white hover:bg-red-700"
                            >
                                Sign Out
                                <LogIn className="ms-2" />
                            </button>
                        </div>
                    ) : (
                        <div className="lg:flex hidden gap-4">
                            <Link to="/login">
                                <button className="bg-red-600 flex justify-between px-4 font-semibold py-2 rounded-md text-white hover:bg-red-700">
                                    Sign In
                                    <LogIn className="ms-2" />
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="bg-red-600 flex justify-between px-4 font-semibold py-2 rounded-md text-white hover:bg-red-700">
                                    Register
                                    <UserRoundPen className="ms-2" />
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOffCanvasOpen(!isOffCanvasOpen)}
                    className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
                >
                    {isOffCanvasOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Off-Canvas Menu */}
            <div
                className={`fixed top-0 left-0 h-full z-[100] w-80 bg-gray-800 transform transition-transform duration-300 ease-in-out ${
                    isOffCanvasOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col p-4 space-y-4 h-full">
                    {/* Logo in Off-Canvas */}
                    <div className="flex flex-col  space-y-4 h-full">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                            <Link
                                to="/"
                                onClick={() => setIsOffCanvasOpen(false)}
                            >
                                <img
                                    src="/Images/Logo.png"
                                    alt="Logo"
                                    className="h-10"
                                />
                            </Link>
                            <button
                                onClick={() => setIsOffCanvasOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-white text-lg text-center font-medium relative"
                                onClick={() => setIsOffCanvasOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    {/* Profile and Sign-Out */}
                    {isLoggedIn ? (
                        <div className="mt-auto">
                            <Link
                                to="/profile"
                                className="flex items-center space-x-2 border-y border-gray-700 py-3"
                                onClick={() => setIsOffCanvasOpen(false)}
                            >
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full border-2 border-red-500"
                                />
                                <span className="text-white font-medium">
                                    {userName}
                                </span>
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOffCanvasOpen(false);
                                }}
                                className="bg-red-600 px-4 text-sm flex justify-between items-center font-semibold py-2 rounded-md text-white hover:bg-red-700 w-full mt-4"
                            >
                                Sign Out
                                <LogIn className="ms-2" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Link to="/login">
                                <button className="bg-red-600 flex justify-between px-4 font-semibold py-2 w-full rounded-md text-white hover:bg-red-700">
                                    Sign In
                                    <LogIn className="ms-2" />
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="bg-red-600 flex justify-between px-4 font-semibold py-2 w-full rounded-md text-white hover:bg-red-700">
                                    Register
                                    <UserRoundPen className="ms-2" />
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
