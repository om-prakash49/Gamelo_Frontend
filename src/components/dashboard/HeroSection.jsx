import { useTransform, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

const HeroSection = ({ scrollY }) => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

    return (
        <div
            className=" relative w-full md:py-24 py-12 bg-primary overflow-hidden"
            style={{
                backgroundImage: "url('/Images/banner_bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="container mx-auto relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                <div className="flex flex-wrap justify-center">
                    <h1
                        className="lg:text-[8rem] text-[5rem] font-extrabold leading-tight mb-6"
                        style={{ textShadow: "-4px 10px 0px red" }}
                    >
                        Online Gaming Platform
                    </h1>
                    <p className="md:text-[2rem] text-[1.5rem] font-medium leading-relaxed w-full mb-6">
                        Experience the thrill of playing with friends on the go.
                    </p>
                    <Link
                        to={"/allGames"}
                        className="bg-red-600 px-8 text-2xl flex justify-between items-center font-bold py-3 rounded-xl text-white  hover:scale-105 transition-transform duration-300"
                    >
                        EXPLORE <Gamepad2 size={28} className="ms-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
