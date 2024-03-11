export function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00Z`);
	date.setDate(date.getDate() + 1); // Add one day
	return date.toLocaleDateString("en-US", { timezone: 'UTC', month: "long", day: "numeric", year: "numeric" });
}

export function formatYear(dateString) {
	const date = new Date(dateString);
	return date.getFullYear();
}
