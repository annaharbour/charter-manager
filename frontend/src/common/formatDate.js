export function formatDate(dateString) {
	const date = new Date(dateString);
	const options = { month: "long", day: "numeric", year: "numeric" };
	return date.toLocaleDateString("en-US", options);
}

export function formatYear(dateString) {
	const date = new Date(dateString);
	return date.getFullYear();
}

export function formatMonth(dateString) {
	const month = new Date(dateString);
	return month.getMonth();
}

export function formatDay(dateString) {
	const day = new Date(dateString);
	return day.getDay();
}