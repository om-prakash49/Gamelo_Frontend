import React, { useState, useEffect, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstance from "@/axios";
import GameCard from "./GameCard";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const LikeGame = () => {
	const [likedGames, setLikedGames] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	// Use useCallback to memoize the fetch function
	const fetchLikedGames = useCallback(async () => {
		try {
			await new Promise((resolve) => setTimeout(resolve));
			const response = await axiosInstance.get("/game/get/like-games", {
				withCredentials: true,
			});
			setLikedGames(response.data.likedGames || []);
		} catch (err) {
			console.error("Error fetching liked games:", err);
			setError("Failed to load liked games.");
		} finally {
			setLoading(false);
		}
	}, []);

	// Fetch liked games once on component mount
	useEffect(() => {
		fetchLikedGames();
	}, [fetchLikedGames]);

	// Render skeleton loader while fetching data
	if (loading) {
		return (
			<div className="container mx-auto">
				<Skeleton className="w-1/4 h-12 mb-6" />
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{Array.from({ length: 5 }).map((_, index) => (
						<div key={index} className="bg-gray-800 p-4 rounded-lg">
							<Skeleton className="h-56 w-full rounded-lg" />
							<div className="space-y-2 mt-4">
								<Skeleton className="h-6 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	// Render error message
	if (error) {
		return <div className="text-white text-center mt-10">{error}</div>;
	}

	// Render message if no liked games are found
	if (likedGames.length === 0) {
		return (
			<div className="text-white text-center mt-10">
				No liked games found.
			</div>
		);
	}

	// Render list of liked games
	return (
		<div className="container mx-auto text-white mt-4 py-[50px]">
			<h2 className="text-4xl font-bold text-white mb-6">
				FAVORITE GAMES ⭐
			</h2>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 gap-4">
				{likedGames.map((game) => (
					<GameCard
						key={game._id}
						game={game}
						onClick={() => navigate(`/game-detail/${game._id}`)}
					/>
				))}
			</div>
		</div>
	);
};

export default LikeGame;
