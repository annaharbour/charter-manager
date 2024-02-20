import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					throw new Error("No token found");
				}

				const response = await axios.get("http://localhost:5000/api/auth", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.data.isAuthenticated) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
				setIsAuthenticated(false);
			} finally {
				setLoading(false);
			}
		};

		checkAuthentication();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return isAuthenticated ? <Component /> : <Navigate to="/admin" />;
};
export default PrivateRoute;
