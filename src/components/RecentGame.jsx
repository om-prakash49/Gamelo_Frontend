import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/axios";
import GameCard from "./GameCard";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const RecentGame = () => {
	const [recentGames, setRecentGames] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	// Memoize the fetch function to avoid re-creating it on every render
	const fetchRecentGames = useCallback(async () => {
		try {
			await new Promise((resolve) => setTimeout(resolve));
			const { data } = await axiosInstance.get("/game/recent-games", {
				withCredentials: true,
			});
			setRecentGames(data.recentGames || []);
		} catch (err) {
			console.error("Error fetching recent games:", err);
			setError("Failed to load recently played games.");
		} finally {
			setLoading(false);
		}
	}, []);

	// Fetch recent games once on component mount
	useEffect(() => {
		fetchRecentGames();
	}, [fetchRecentGames]);

	// Render skeleton loader while fetching data
	if (loading) {
		return (
			<div className="container mx-auto py-24">
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

	// Render error message if there's an issue
	if (error) {
		return <div className="text-white text-center mt-10">{error}</div>;
	}

	// Render a message if no recent games are found
	if (!recentGames.length) {
		return (
			<div className="text-white text-center mt-10">
				No recently played games found.
			</div>
		);
	}

	// Render the list of recent games
	return (
		<div className="container mx-auto text-white mt-4 py-[50px]">
			<h2 className="text-4xl font-bold text-white mb-6">
				RECENT GAMES 🔥
			</h2>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 gap-4">
				{recentGames.map((game) => (
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

export default RecentGame;
