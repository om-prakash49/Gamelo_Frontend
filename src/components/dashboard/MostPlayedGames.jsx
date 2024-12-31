import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstance from "@/axios";

const MostPlayedGames = () => {
	const [recentGames, setRecentGames] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecentGames = async () => {
			try {
				const response = await axiosInstance.get("/game/recent-games", {
					withCredentials: true, // Ensure cookies are sent with the request
				});
				setRecentGames(response.data.recentGames || []); // Handle the fetched games
			} catch (err) {
				console.error("Error fetching recent games:", err);
				setError("Failed to load recently played games.");
			} finally {
				setLoading(false);
			}
		};
	
		fetchRecentGames();
	}, []);
	

	if (loading) {
		return <div className="text-white text-center mt-10">Loading...</div>;
	}

	if (error) {
		return <div className="text-white text-center mt-10">{error}</div>;
	}

	if (recentGames.length === 0) {
		return (
			<div className="text-white text-center mt-10">
				No recently played games found.
			</div>
		);
	}

	return (
		<div className="text-white p-4 mt-4 max-w-7xl py-[50px]">
			<h1 className="text-3xl font-semibold mb-8 text-center pb-15">
				<span className="text-5xl text-red-500">R</span>ecent{" "}
				<span className="text-5xl text-red-500">G</span>ames
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
				{recentGames.map((game, index) => (
					<div
						key={index}
						className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
					>
						<img
							src={game.thumbnails[0]} // Assuming the first thumbnail is displayed
							alt={game.title}
							className="w-full h-58 object-cover"
						/>
						<div className="p-4">
							<h2 className="text-xl font-bold">{game.title}</h2>
							<p className="text-yellow-400 text-sm mt-2 flex items-center gap-2">
								<FaStar /> {game.rating?.toFixed(1) || "N/A"} / 5
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MostPlayedGames;
