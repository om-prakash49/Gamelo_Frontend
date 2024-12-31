import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";

const GameCard = ({ game, onClick }) => {
    return (
        <Card
            className="bg-gray-800 rounded-xl cursor-pointer shadow-lg overflow-hidden flex flex-col border border-transparent relative transform hover:scale-110 transition-transform duration-300"
            onClick={onClick}
        >
            <div className="w-full lg:h-[200px] h-[150px] overflow-hidden p-2">
                <img
                    src={game.thumbnails[0]}
                    alt={game.title}
                    className="w-full h-full object-cover transition-all rounded-xl"
                />
            </div>
            <CardContent className="flex-1 p-4 relative">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-white truncate">
                        {game.title}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="text-md text-gray-400 py-2 px-0">
                    {game.genre}
                </CardFooter>
            </CardContent>
        </Card>
    );
};

export default GameCard;
