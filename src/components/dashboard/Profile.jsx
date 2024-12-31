import React, { useState, useEffect, useCallback } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { ImCross } from "react-icons/im";
import axiosInstance from "@/axios";
import RecentGame from "../RecentGame";
import LikeGame from "../LikeGames";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [profilePicture, setProfilePicture] = useState("");
	const [profileData, setProfileData] = useState({
		id: "",
		userName: "",
		fullName: "",
		email: "",
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve));
				const response = await axiosInstance.get("/profile", {
					withCredentials: true,
				});
				const { user } = response.data;

				setProfileData({
					id: user._id,
					userName: user.userName || "",
					fullName: user.fullName || "",
					email: user.email || "",
				});
				setProfilePicture(
					user.profile_picture || "/Images/profile.png"
				);
			} catch (error) {
				console.error("Error fetching user data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	// Handle image upload
	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) setProfilePicture(file);
	};

	// Toggle edit mode
	const handleEditToggle = useCallback(() => {
		setIsEditing((prev) => !prev);
	}, []);

	// Save changes to profile
	const handleSave = useCallback(async () => {
		try {
			const formData = new FormData();
			formData.append("fullName", profileData.fullName);
			formData.append("userName", profileData.userName);

			if (profilePicture instanceof File) {
				formData.append("profile_picture", profilePicture);
			}

			const response = await axiosInstance.put(
				`/profile/${profileData.id}`,
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);

			const updatedUser = response.data.user;
			setProfileData({
				id: updatedUser._id,
				fullName: updatedUser.fullName,
				userName: updatedUser.userName,
				email: updatedUser.email,
			});
			setProfilePicture(updatedUser.profile_picture);
			setIsEditing(false);
			window.location.reload();
		} catch (error) {
			console.error("Error saving profile data:", error);
		}
	}, [profileData, profilePicture]);

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfileData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Skeleton loader while fetching data
	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-primary p-6">
				<div className="container mx-auto relative shadow-xl rounded-xl p-8 w-full flex items-center bg-white bg-opacity-10 backdrop-blur-md border border-gray-700">
					<div className="flex flex-col sm:flex-row items-center w-full">
						<div className="w-40 h-40 sm:w-52 sm:h-52 mb-6 sm:mb-0">
							<Skeleton className="w-full h-full rounded-full" />
						</div>
						<div className="ml-0 sm:ml-10 w-full max-w-sm">
							<Skeleton className="h-8 w-1/3 mb-2" />
							<Skeleton className="h-6 w-1/2 mb-2" />
							<Skeleton className="h-4 w-full" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-primary p-6">
			<div className="container mx-auto relative shadow-xl rounded-xl p-8 w-full flex items-center bg-white bg-opacity-10 backdrop-blur-md border border-gray-700">
				<button
					onClick={handleEditToggle}
					className="absolute top-4 right-4 bg-transparent border border-gray-500 text-white p-2 rounded-lg"
				>
					{isEditing ? <ImCross /> : <MdModeEditOutline />}
				</button>
				<div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-r from-purple-800 to-indigo-500 rounded-xl"></div>
				<div className="flex flex-col sm:flex-row items-center w-full">
					<div className="w-40 h-40 sm:w-52 sm:h-52 mb-6 sm:mb-0 relative">
						<img
							src={
								profilePicture instanceof File
									? URL.createObjectURL(profilePicture)
									: profilePicture
							}
							alt="Profile"
							className="w-full h-full object-cover rounded-full border-4 border-gray-300 shadow-md cursor-pointer hover:opacity-90"
							onClick={() =>
								isEditing &&
								document.getElementById("fileInput").click()
							}
						/>
						{isEditing && (
							<input
								id="fileInput"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleImageUpload}
							/>
						)}
					</div>
					<div className="ml-0 sm:ml-10 w-full max-w-sm">
						{isEditing ? (
							<input
								type="text"
								name="userName"
								value={profileData.userName}
								onChange={handleInputChange}
								className="text-xl font-bold bg-transparent text-white rounded-md px-2 py-1 mb-2 outline-none w-full"
							/>
						) : (
							<h2 className="text-3xl font-extrabold text-white tracking-wide text-center sm:text-left">
								{profileData.userName}
							</h2>
						)}
						{isEditing ? (
							<input
								type="text"
								name="fullName"
								value={profileData.fullName}
								onChange={handleInputChange}
								className="text-lg font-medium bg-transparent text-white rounded-md px-2 py-1 mt-2 outline-none w-full"
							/>
						) : (
							<p className="text-lg font-medium text-gray-300 mt-2 text-center sm:text-left">
								{profileData.fullName}
							</p>
						)}
						{isEditing ? (
							<input
								type="email"
								name="email"
								value={profileData.email}
								onChange={handleInputChange}
								className="font-light bg-transparent text-white rounded-md px-2 py-1 mt-2 outline-none w-full"
								disabled
							/>
						) : (
							<p className="text-sm font-light text-gray-400 mt-1 text-center sm:text-left">
								{profileData.email}
							</p>
						)}
					</div>
				</div>
				{isEditing && (
					<button
						onClick={handleSave}
						className="mt-4 bg-red-500 px-6 py-2 rounded-lg font-semibold hover:bg-red-600 text-white transition absolute bottom-4 right-4"
					>
						Save
					</button>
				)}
			</div>
			<RecentGame />
			<LikeGame />
		</div>
	);
};

export default Profile;
