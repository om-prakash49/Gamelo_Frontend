import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/axios";
import GameCard from "../GameCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function GamesCarousel({ scrollToRef }) {
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [visiblePages, setVisiblePages] = useState(5);
	const itemsPerPage = 25;
	const navigate = useNavigate();

	useEffect(() => {
		const fetchGames = async () => {
			setLoading(true);
			try {
				await new Promise((resolve) => setTimeout(resolve));
				const response = await axiosInstance.get("/game/getgame");
				setGames(response.data.games);
			} catch (error) {
				console.error("Error fetching games:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchGames();
	}, []);

	useEffect(() => {
		const updateVisiblePages = () => {
			setVisiblePages(window.innerWidth >= 1024 ? 5 : 3);
		};

		updateVisiblePages();
		window.addEventListener("resize", updateVisiblePages);
		return () => window.removeEventListener("resize", updateVisiblePages);
	}, []);

	const totalPages = Math.ceil(games.length / itemsPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		scrollToRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	const getLoopedPages = (page) => {
		const pages = [];
		for (let i = 0; i < visiblePages; i++) {
			pages.push(((page - 1 + i) % totalPages) + 1);
		}
		return pages;
	};

	const paginatedGames = games.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handleCardClick = (game) => {
		navigate(`/game-detail/${game._id}`);
	};

	return (
		<div ref={scrollToRef} className="container mx-auto py-24 px-4">
			<div className="flex items-center lg:justify-between justify-center mb-8">
				<h2 className="text-4xl font-bold text-white hidden lg:flex">
					TRENDING GAMES 🔥
				</h2>
				<div className="flex items-center gap-4 bg-gray-800 p-2 rounded-xl">
					<button
						className="bg-red-600 text-white font-bold px-4 py-2 rounded-md"
						onClick={() =>
							handlePageChange(
								currentPage > 1 ? currentPage - 1 : totalPages
							)
						}
					>
						Previous
					</button>

					<div className="relative flex overflow-hidden justify-center">
						<AnimatePresence mode="popLayout">
							{getLoopedPages(currentPage).map((pageIndex) => (
								<motion.button
									disabled
									key={pageIndex}
									className={`px-3 py-2 rounded-md font-bold mx-1 ${
										currentPage === pageIndex
											? "bg-white text-black"
											: "bg-gray-800 text-white"
									}`}
									initial={{ x: 100, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: -100, opacity: 0 }}
									onClick={() => handlePageChange(pageIndex)}
								>
									{pageIndex}
								</motion.button>
							))}
						</AnimatePresence>
					</div>

					<button
						className="bg-red-600 text-white font-bold px-4 py-2 rounded-md"
						onClick={() =>
							handlePageChange(
								currentPage < totalPages ? currentPage + 1 : 1
							)
						}
					>
						Next
					</button>
				</div>
			</div>

			{loading ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{Array.from({ length: itemsPerPage }).map((_, index) => (
						<div key={index} className="bg-gray-800 p-4 rounded-lg">
							<Skeleton className="h-56 w-full rounded-lg" />
							<div className="space-y-2 mt-4">
								<Skeleton className="h-6 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
							</div>
						</div>
					))}
				</div>
			) : (
				<motion.div
					key={currentPage}
					initial={{ x: 300, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: -300, opacity: 0 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 gap-4"
				>
					{paginatedGames.map((game) => (
						<div
							key={game._id}
							onClick={() => handleCardClick(game)}
						>
							<GameCard game={game} />
						</div>
					))}
				</motion.div>
			)}
		</div>
	);
}
