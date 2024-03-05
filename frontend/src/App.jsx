import React, {useState} from "react";
import { Routes, Route } from "react-router";
import PrivateRoute from "./admin/PrivateRoute";
import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Admin from "./admin/Admin";
import SignIn from "./admin/SignIn";
import CharterList from './admin/CharterList'
import CommanderList from './admin/CommanderList'

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const updateAuthentication = (isAuthenticated) => {
		setIsAuthenticated(isAuthenticated);
	  };
	  
	return (
		<>
		{isAuthenticated && <Nav/>}
			<header>
				<img
					className="vfw-logo"
					alt="vfw-logo"
					src="/post.logo-full.color-1160.jpg"
				/>
			</header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="" element={<PrivateRoute updateAuthentication={updateAuthentication} />}>
					<Route path="/admin" element={<Admin />} />
					<Route path="/commanders" element={<CommanderList />} />
					<Route path="/charters" element={<CharterList />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
