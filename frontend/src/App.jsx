import React from "react";
import { Routes, Route } from "react-router";
import PrivateRoute from "./auth/PrivateRoute";
import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Admin from "./auth/Admin";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
        <Route path="" element={<PrivateRoute />}>
        <Route path="/admin" element={<Admin />} />
				</Route>
        
      
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
			</Routes>
		</>
	);
}

export default App;
