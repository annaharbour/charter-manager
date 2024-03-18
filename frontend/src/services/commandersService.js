import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5000/api/commanders",
});

export function getCommanders() {
	return axiosInstance.get("/");
}

export function getCommandersByCharter(charterId){
	return axiosInstance.get(`/charter/${charterId}`)
}

export function alterCommander(updatedCommander) {
	return axiosInstance.put(`/${updatedCommander._id}`, updatedCommander);
}

export function createCommander(newCommander) {
	return axiosInstance.post('/', newCommander);
}

export function delCommander(commanderId) {
	return axiosInstance.delete(`/${commanderId}`);
}
