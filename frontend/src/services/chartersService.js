import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5000/api/charters",
});

export function updateCharterReq(updatedCharter) {
	return axiosInstance.put(`/${updatedCharter._id}`, updatedCharter);
}

export function getCharters() {
	return axiosInstance.get("/");
}

export function addCharter(newCharter) {
	return axiosInstance.post("/", newCharter);
}

export function delCharter(charterId) {
	axiosInstance.delete(`/${charterId}`);
}
