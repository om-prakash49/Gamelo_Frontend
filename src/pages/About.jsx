import React, { useState } from "react";
import { motion } from "framer-motion";

const About = () => {
	const [products, setProducts] = useState([
		{
			id: 1,
			name: "Gamezop",
			description: "Grow revenue with games!",
			image: "/Images/product1.avif",
		},
		{
			id: 2,
			name: "Quizzop",
			description: "Grow revenue with quizzes!",
			image: "/Images/product2.jpg",
		},
		{
			id: 3,
			name: "Newszop",
			description: "Grow revenue with newsmaker!",
			image: "/Images/product3.jpg",
		},
		{
			id: 4,
			name: "Astrozop",
			description: "Grow revenue with astrology!",
			image: "/Images/product4.avif",
		},
	]);

	const [support, setSupport] = useState([
		{
			id: 1,
			image: "/Images/Support1.png",
		},
		{
			id: 2,
			image: "/Images/Support2.png",
		},
		{
			id: 3,
			image: "/Images/Support3.png",
		},
		{
			id: 4,
			image: "/Images/Support4.png",
		},
	]);

	return (
		<div className="relative bg-gradient-to-br from-gray-800 via-black to-gray-900 overflow-hidden">
			{/* Moving Gradient Effect */}
			{/* <motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 5, scale: 1.3 }}
				transition={{
					duration: 2.5,
					ease: [0.25, 0.8, 0.25, 1],
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute inset-0 z-0"
			></motion.div> */}

			{/* Floating sphere */}
			<motion.div
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 0.2, y: 200 }}
				transition={{
					duration: 3,
					ease: [0.25, 0.8, 0.25, 1],
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-yellow-500 opacity-25 rounded-full z-0"
			></motion.div>

			{/* Floating Squares */}
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 0.3, scale: 1.2 }}
				transition={{
					delay: 1,
					duration: 2.5,
					ease: [0.25, 0.8, 0.25, 1],
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute top-10 left-10 w-[200px] h-[200px] bg-blue-600 opacity-40 rounded-md z-0"
			></motion.div>

			{/* About Section */}
			<div className="container mx-auto px-4 md:px-10 lg:px-24 pb-10 relative z-10">
				<div className="text-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6, duration: 1 }}
						className="font-bold pt-16 md:pt-28 pb-10 md:pb-16 text-2xl md:text-4xl max-w-xl md:max-w-3xl mx-auto flex text-red-500"
					>
						Our goal is to build the world's largest distribution
						network for digital content.
					</motion.div>
				</div>

				{/* About Image */}
				<div className="flex justify-center items-center bg-white">
					<motion.img
						src="/Images/about-us.png"
						className="w-full max-w-md md:max-w-xl h-auto"
						alt="About Us"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7, duration: 1.2 }}
					/>
				</div>

				{/* About Content */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 1.2 }}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-10 pb-10 md:pb-20 text-white text-md md:text-xl">
						<div className="p-4">
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.2, duration: 1 }}
								className="pt-6"
							>
								We started operations on the 27th of July, 2015
								with a simple objective: making game-consumption
								frictionless...
							</motion.p>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.4, duration: 1 }}
								className="pt-6"
							>
								We started as a publisher of HTML5 games. HTML5
								is the language of the web, and of the future...
							</motion.p>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.6, duration: 1 }}
								className="pt-6"
							>
								What makes us unique is the way we distribute
								our games, or in other words, the way we acquire
								users...
							</motion.p>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.8, duration: 1 }}
								className="pt-6"
							>
								As the number of our partnerships grew, we
								expanded beyond distributing games. We now
								operate 4 products...
							</motion.p>
						</div>
						<div className="p-4">
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 2, duration: 1 }}
								className="pt-6"
							>
								Gamezop, Quizzop, Newszop, and Astrozop. Our
								products entertain over 45 million users around
								the world every month!
							</motion.p>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 2.2, duration: 1 }}
								className="pt-6"
							>
								Quizzop, like Gamezop, is a B2B2C offering. At
								Quizzop, we power fun-filled quizzing
								experiences within apps and websites...
							</motion.p>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 2.4, duration: 1 }}
								className="pt-6"
							>
								Similarly, Newszop is a news property that our
								partners can integrate within their apps and
								websites...
							</motion.p>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 2.6, duration: 1 }}
								className="pt-6"
							>
								Astrozop is an astrology destination. The aim is
								to build a comprehensive astrology product with
								valuable content in Western Astrology, Vedic
								Astrology, Horoscopes...
							</motion.p>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 2.8, duration: 1 }}
								className="pt-6"
							>
								And this is not the end. The universe of Zop
								products will only grow from here...
							</motion.p>
						</div>
					</div>
				</motion.div>

				{/* Products Section */}
				<div className="py-10 md:py-20 font-customFont">
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 2.5, duration: 1 }}
						className="text-center text-2xl md:text-3xl font-semibold pb-8 text-white"
					>
						<span className="text-5xl text-red-500">O</span>UR{" "}
						<span className="text-5xl text-red-500">P</span>RODUCTS
					</motion.h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{products.map((product) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 3, duration: 1 }}
								className="rounded-xl border bg-white shadow-md"
							>
								<div className="px-10 pt-8 py-6">
									<img
										src={product.image}
										alt={product.name}
										className="rounded-xl w-3/4 sm:w-3/4 md:w-full mx-auto"
									/>
									<h1 className="text-center text-xl md:text-2xl font-bold pt-6">
										{product.name}
									</h1>
									<p className="text-center text-lg  md:text-xl text-gray-600 pt-4">
										{product.description}
									</p>
								</div>
								<div>
									<p className="text-center py-4 border-t-2 text-blue-700 font-bold text-md md:text-xl">
										VISIT
									</p>
								</div>
							</motion.div>
						))}
					</div>
					<p className="text-center text-sm md:text-xl text-white mt-10 p-2 md:p-0">
						Interested in integrating our products and growing your
						revenue?
					</p>
				</div>

				{/* Support Section */}
				<div className="py-10 md:py-20 font-customFont">
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 3.2, duration: 1 }}
						className="text-center text-2xl md:text-3xl font-bold pb-8 text-white"
					>
						<span className="text-5xl text-red-500">W</span>E BACKED
						BY
					</motion.h1>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
						{support.map((support) => (
							<motion.div
								key={support.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 3.4, duration: 1 }}
								className="bg-gray-100 rounded-xl p-5 md:px-10 md:pt-8 md:py-6 lg:px-16 lg:pt-8 lg:py-6"
							>
								<img
									src={support.image}
									className="rounded-2xl "
									alt="Support"
								/>
							</motion.div>
						))}
					</div>
				</div>

				{/* Contact Us Section */}
				<div className="py-10 md:py-20 px-4 md:px-10 lg:px-60 bg-blue-600 rounded-2xl  text-center">
					<h1 className="text-white text-2xl md:text-3xl font-semibold pt-6">
						GET IN TOUCH
					</h1>
					<p className="text-white text-lg md:text-xl pt-6 pb-12">
						We’d love to hear from you!
					</p>
					<a
						href="#"
						className="bg-red-500 text-white px-10 py-3 text-lg rounded-full font-bold"
					>
						CONTACT US
					</a>
				</div>
			</div>
		</div>
	);
};

export default About;
