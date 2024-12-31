import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, Maximize } from "lucide-react";
import GameCard from "@/components/GameCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

const GameDetails = () => {
	const { id } = useParams();
	const iframeRef = useRef(null);
	const navigate = useNavigate();

	const [game, setGame] = useState(null);
	const [similarGames, setSimilarGames] = useState([]);
	const [likedGames, setLikedGames] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch game details
	const fetchGameDetails = useCallback(async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve));
			const response = await axiosInstance.get(`/game/getgame/${id}`);
			setGame(response.data.game);
		} catch (error) {
			console.error("Error fetching game details:", error);
		} finally {
			setLoading(false);
		}
	}, [id]);

	// Fetch liked and similar games
	const fetchGamesData = useCallback(async (game) => {
		try {
			const [likedResponse, similarResponse] = await Promise.all([
				axiosInstance.get("/game/get/like-games"),
				axiosInstance.get(`/game/filter?genre=${game.genre}`),
			]);
			setLikedGames(
				likedResponse.data?.likedGames.map((g) => g._id) || []
			);
			setSimilarGames(
				similarResponse.data.games.filter((g) => g._id !== game._id)
			);
		} catch (error) {
			console.error("Error fetching liked or similar games:", error);
		}
	}, []);

	useEffect(() => {
		fetchGameDetails();
	}, [fetchGameDetails]);

	useEffect(() => {
		if (game) {
			fetchGamesData(game);
		}
	}, [game, fetchGamesData]);

	const handleGamePlayed = () => {
		if (game?._id) {
			axiosInstance
				.post("/game/recent-games", { gameId: game._id })
				.catch((error) =>
					console.error(
						"Error adding game to recently played:",
						error
					)
				);
		}
	};

	const handleLikeGame = async () => {
		if (game?._id) {
			try {
				await axiosInstance.post("/game/like-game", {
					gameIds: [game._id],
				});
				setLikedGames((prev) => [...prev, game._id]);
			} catch (error) {
				console.error("Error liking game:", error);
			}
		}
	};

	const handleUnlikeGame = async () => {
		if (game?._id) {
			try {
				await axiosInstance.post("/game/unlike-games", {
					gameIds: [game._id],
				});
				setLikedGames((prev) => prev.filter((id) => id !== game._id));
			} catch (error) {
				console.error("Error unliking game:", error);
			}
		}
	};

	const handleFullscreenToggle = () => {
		if (iframeRef.current) {
			iframeRef.current.requestFullscreen().catch(console.error);
		}
	};

	const handleGameClick = (gameId) => {
		navigate(`/game-detail/${gameId}`);
	};

	if (loading) {
		return (
			<div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
				<div className="relative z-10 container mx-auto mt-10 px-4">
					{/* Loading Skeleton */}
					<div className="lg:flex justify-between gap-8 mb-12">
						<div className="relative border border-[#1c242f] p-3 lg:w-2/3 w-full h-[700px] rounded-xl bg-[#1a1a1d]">
							<Skeleton className="w-full h-[700px] rounded-xl" />
						</div>
						<div className="lg:w-1/3 lg:mt-0 mt-4 p-6 border border-[#1c242f] rounded-xl bg-[#1a1a1d]">
							<Skeleton className="w-1/2 h-12 mb-6 mx-auto" />
							<Skeleton className="w-full h-6 mb-4" />
							<Skeleton className="w-3/4 h-6 mb-4" />
							<Skeleton className="w-3/4 h-6 mb-4" />
							<Skeleton className="w-full h-12 mb-6" />
							<Skeleton className="w-full h-12 mb-6" />
							<Skeleton className="w-full h-12 mb-6" />
						</div>
					</div>
					{/* Thumbnails and Similar Games Skeleton */}
					<div className="relative lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
						{[...Array(2)].map((_, index) => (
							<Skeleton
								key={index}
								className="w-full h-52 rounded-lg"
							/>
						))}
					</div>
					<div className="relative">
						<Skeleton className="w-1/4 h-12 mb-6" />
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
							{[...Array(5)].map((_, index) => (
								<div
									key={index}
									className="bg-gray-800 p-4 rounded-lg"
								>
									<Skeleton className="h-56 w-full rounded-lg" />
									<div className="space-y-2 mt-4">
										<Skeleton className="h-6 w-3/4" />
										<Skeleton className="h-4 w-1/2" />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!game) {
		return <div className="text-white">No game details available.</div>;
	}

	const isLiked = likedGames.includes(game._id);

	return (
		<div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
			<div className="relative z-10 container mx-auto mt-10 px-4">
				{/* Game Details */}
				<div className="flex justify-center w-full items-center mb-6">
					<div className="lg:flex justify-between gap-8 mb-12">
						<div className="relative border border-[#1c242f] p-3 lg:w-2/3 w-full h-[700px] rounded-xl bg-[#1a1a1d]">
							<iframe
								ref={iframeRef}
								src={game.embedUrl}
								title={game.title}
								className="w-full h-full rounded-xl"
								allowFullScreen
								onLoad={handleGamePlayed}
							/>
							<button
								onClick={handleFullscreenToggle}
								className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg hover:bg-red-600 transition"
							>
								<Maximize className="w-6 h-6" />
							</button>
						</div>
						<div className="lg:w-1/3 lg:mt-0 mt-4 p-6 border border-[#1c242f] rounded-xl bg-[#1a1a1d]">
							<h1 className="text-5xl font-extrabold mb-6 bg-[#343444] p-6 rounded-xl text-center text-purple-400">
								{game.title}
							</h1>
							<p className="text-gray-300 mb-6 text-lg leading-relaxed">
								{game.description}
							</p>
							<div className="mb-6 inline-block text-lg bg-[#343444] py-3 px-6 rounded-xl w-full">
								<div className="flex justify-between items-center">
									<h3 className="font-semibold text-gray-200">
										Publisher:
									</h3>
									<p className="text-gray-300">
										{game.publisher}
									</p>
								</div>
							</div>
							<div className="mb-6 inline-block text-lg bg-[#343444] py-3 px-6 rounded-xl w-full">
								<div className="flex justify-between items-center">
									<h3 className="font-semibold text-gray-200">
										Publish Date:
									</h3>
									<p className="text-gray-300">
										{new Date(
											game.publishDate
										).toLocaleDateString()}
									</p>
								</div>
							</div>
							<div className="mb-6 inline-block text-lg bg-[#343444] py-3 px-6 rounded-xl w-full">
								<div className="flex justify-between items-center">
									<h3 className="font-semibold text-gray-200">
										Last Updated:
									</h3>
									<p className="text-gray-300">
										{new Date(
											game.lastUpdatedDate
										).toLocaleDateString()}
									</p>
								</div>
							</div>
							<button
								className={`text-white flex py-2 px-4 rounded-lg transition-colors duration-200 ${
									isLiked ? "bg-red-500" : "bg-gray-500"
								}`}
								onClick={
									isLiked ? handleUnlikeGame : handleLikeGame
								}
							>
								{isLiked
									? "Remove from Favourites"
									: "Add to Favourites"}{" "}
								<Bookmark className="ms-2" />
							</button>
						</div>
					</div>
				</div>
				{/* Thumbnails and Similar Games */}
				<div className="relative lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
					{game.thumbnails.map((thumbnail, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							whileHover={{
								boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
							}}
							className="relative overflow-hidden rounded-lg shadow-xl group"
						>
							<img
								src={thumbnail}
								alt={`Thumbnail ${index + 1}`}
								className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-500"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-500 flex items-center justify-center"></div>
						</motion.div>
					))}
				</div>
				<div className="relative">
					<div className="relative flex justify-between items-center">
						<h2 className="text-4xl font-bold text-white">
							SIMILAR GAMES 🔥
						</h2>
					</div>
					<Carousel
						opts={{ align: "start" }}
						className="w-full"
						loop
						plugins={[Autoplay({ delay: 2000 })]}
					>
						<CarouselContent className="lg:gap-6 py-12">
							{similarGames.map((game) => (
								<CarouselItem
									key={game._id}
									className="md:basis-1/3 lg:basis-1/5 basis-1/2"
								>
									<GameCard
										key={game._id}
										game={game}
										onClick={() =>
											handleGameClick(game._id)
										}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>
		</div>
	);
};

export default GameDetails;
