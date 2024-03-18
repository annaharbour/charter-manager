import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5000/api/upload",
});

export function addImage(formData) {
	return axiosInstance.post("", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
