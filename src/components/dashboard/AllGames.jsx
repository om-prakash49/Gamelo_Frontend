import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/axios";
import GameCard from "../GameCard";
import { Skeleton } from "@/components/ui/skeleton";

const AllGames = () => {
	const [games, setGames] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState("Action");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	// Memoize genres list since it doesn't change
	const genres = useMemo(
		() => [
			"Action",
			"Adventure",
			"Puzzle",
			"Dress-up",
			"Cooking",
			"Sports",
			"Cards",
			"Shooter",
			"Battle",
			"Multiplayer",
		],
		[]
	);

	// Fetch games on genre change
	useEffect(() => {
		const fetchGames = async () => {
			setLoading(true);
			setError(null); // Reset error on new fetch

			try {
				await new Promise((resolve) => setTimeout(resolve));
				const response = await axiosInstance.get(
					`/game/filter?genre=${selectedGenre}`
				);
				setGames(response.data.games);
			} catch (err) {
				setError("Failed to fetch games. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchGames();
	}, [selectedGenre]);

	// Handle genre change
	const handleGenreChange = useCallback((genre) => {
		setSelectedGenre(genre);
	}, []);

	// Render the genre filter buttons
	const renderGenreButtons = () => (
		<div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 mb-10">
			{genres.map((genre) => (
				<button
					key={genre}
					className={`p-1 transition-transform duration-200 rounded-md py-2 font-semibold ${
						selectedGenre === genre
							? "bg-white text-black"
							: "bg-red-600"
					} hover:scale-95`}
					onClick={() => handleGenreChange(genre)}
				>
					{genre}
				</button>
			))}
		</div>
	);

	// Render skeleton loader
	const renderSkeletonLoader = () => (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{Array.from({ length: 10 }).map((_, index) => (
				<div key={index} className="bg-gray-800 p-4 rounded-lg">
					<Skeleton className="h-56 w-full rounded-lg" />
					<div className="space-y-2 mt-4">
						<Skeleton className="h-6 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
					</div>
				</div>
			))}
		</div>
	);

	// Render the game cards
	const renderGames = () => (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 gap-4">
			{games.map((game) => (
				<GameCard
					key={game._id}
					game={game}
					onClick={() => navigate(`/game-detail/${game._id}`)}
				/>
			))}
		</div>
	);

	// Handle error state
	const renderError = () => (
		<p className="text-center text-red-500">{error}</p>
	);

	// Handle no games found
	const renderNoGames = () => (
		<p className="text-center">No games found for the selected genre.</p>
	);

	return (
		<div className="min-h-screen bg-primary text-white py-10">
			<div className="container mx-auto px-4">
				{/* Genre Filter Buttons */}
				{renderGenreButtons()}

				{/* Display Games */}
				{loading && renderSkeletonLoader()}
				{error && renderError()}
				{!loading && games.length === 0 && renderNoGames()}
				{!loading && games.length > 0 && renderGames()}
			</div>
		</div>
	);
};

export default AllGames;
