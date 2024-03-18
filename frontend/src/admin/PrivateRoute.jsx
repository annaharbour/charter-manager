import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Admin from "./Admin";
import { getAuth } from "../services/authService";

const PrivateRoute = ({ updateAuthentication }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					throw new Error("No token found");
				}
				const response = await getAuth(token);
				if (response.status === 200 && response.data.length > 0) {
					setIsAuthenticated(true);
					updateAuthentication(true);
				} else {
					setIsAuthenticated(false);
					updateAuthentication(false);
				}
			} catch (error) {
				setIsAuthenticated(false);
				updateAuthentication(false);
			} finally {
				setLoading(false);
			}
		};

		checkAuthentication();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return isAuthenticated ? <Admin /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
