import { Outlet } from "react-router-dom";
import Header from "./dashboard/Header";
import Footer from "./dashboard/Footer";

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
