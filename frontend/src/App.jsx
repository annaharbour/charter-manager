import React, {useState} from "react";
import { Routes, Route } from "react-router";
import PrivateRoute from "./auth/PrivateRoute";
import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Admin from "./auth/Admin";
import SignIn from "./auth/SignIn";
import CharterList from './auth/CharterList'
import CommanderList from './auth/CommanderList'

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
