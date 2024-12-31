import HeroSection from "./dashboard/HeroSection";
import GamesCard from "./dashboard/GamesCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios";
import { Search } from "lucide-react";

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        // Extract the token from the URL
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        console.log("token :::: ", token);
        if (token) {
            // Store the token in localStorage
            localStorage.setItem("token", token);

            // Remove the token from the URL and navigate to the root
            navigate("/", { replace: true });
        }
    }, [location, navigate]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axiosInstance.get("/game/getgame");
                setGames(response.data.games);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value.trim();
        setSearchTerm(value);

        if (value === "") {
            setFilteredGames([]);
        } else if (Array.isArray(games)) {
            // Filter games based on `title` property
            const filtered = games.filter((game) =>
                game.title?.toLowerCase().includes(value.toLowerCase())
            );
            console.log("Filtered Games:", filtered); // Debug filtered results
            setFilteredGames(filtered);
        }
    };

    const handleGameClick = (game) => {
        navigate(`/game-detail/${game._id}`, { state: { game } });
    };

    return (
        <div className="bg-primary border-b border-gray-700">
            {/* Sticky Search Bar */}
            <div className="px-2 w-full sticky top-0 z-50 bg-primary  py-4 text-center ">
                <div className="relative flex justify-center items-center mx-auto lg:w-[500px] sm:w-full">
                    <input
                        className="bg-gray-800 border-none text-white placeholder-gray-400 outline-none w-[400px] p-3 rounded-l-xl h-[48px]"
                        placeholder="Search for games..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-r-xl h-[48px] flex items-center justify-center"
                        onClick={() => handleSearch(searchTerm)}
                    >
                        <Search />
                    </button>
                </div>

                {/* Dropdown */}
                {filteredGames.length > 0 && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[400px] max-h-[400px] overflow-auto bg-gray-800 rounded-lg shadow-lg z-[999]">
                        {filteredGames.map((game) => (
                            <div
                                key={game.id}
                                className="p-3 text-gray-200 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleGameClick(game)}
                            >
                                {game.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Main Content */}
            <HeroSection />
            <GamesCard />
        </div>
    );
};

export default HomePage;
