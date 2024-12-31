import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "/Images/Logo.png";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="text-white text-center">
			<div className="bg-gradient-to-br from-gray-900 via-black to-gray-800  border-t border-b  border-gray-700 shadow-lg py-12">
				<div className="container mx-auto">
					<div className=" mb-5">
						{/* Logo */}
						<Link to="/" className="mb-5 flex justify-center">
							<img
								src={Logo}
								alt="Gamelo Logo"
								width={200}
								height={200}
								className="hover:scale-105 transition-transform duration-300"
							/>
						</Link>

						<p className="text-sm mb-3 text-gray-400 text-center">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Ratione veniam amet autem sunt, perspiciatis
							nemo.
						</p>
						<p className="text-sm mb-3 text-gray-400">
							<span className="text-red-500">Contact Us </span>
							+91 89898 89898
						</p>
						<div className="flex justify-center gap-6 ">
							<Link
								to="#"
								aria-label="Facebook"
								className="bg-black hover:bg-red-500 transition-all rounded-full p-3"
							>
								<FaFacebookF size={24} />
							</Link>
							<Link
								to="#"
								aria-label="Instagram"
								className="bg-black hover:bg-red-500 transition-all rounded-full p-3"
							>
								<FaInstagram size={24} />
							</Link>
							<Link
								to="#"
								aria-label="Twitter"
								className="bg-black hover:bg-red-500 transition-all rounded-full p-3"
							>
								<FaTwitter size={24} />
							</Link>
							<Link
								to="#"
								aria-label="YouTube"
								className="bg-black hover:bg-red-500 transition-all rounded-full p-3"
							>
								<FaYoutube size={24} />
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Copyright Section */}
			<div className="bg-black text-sm p-5 text-center">
				<p className="text-gray-400">
					Copyright &copy; {currentYear} Team Gamelo. Design By
					<Link to="#" className="text-red-500 hover:underline  ml-1">
						Gamelo
					</Link>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
