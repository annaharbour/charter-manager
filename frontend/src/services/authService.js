import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5000/api/auth",
});

export function logOutUser() {
	return axiosInstance.post("/signout");
}

export function signInUser(email, password) {
	return axiosInstance.post("/signin", {
		email: email,
		password: password,
	});
}

export function getAuth(token) {
	return axiosInstance.get("/", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}
