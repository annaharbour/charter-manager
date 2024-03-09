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

export function generateMonthsOptions() {
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    return months.map((month, index) => (
        <option key={index + 1} value={index + 1}>{month}</option>
    ));
}

export function generateDaysOptions() {
    const days = Array.from({ length: 31 }, (_, index) => index + 1);
    return days.map((day) => (
        <option key={day} value={day}>{day}</option>
    ));
}

export function generateYearsOptions() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
    return years.map((year) => (
        <option key={year} value={year}>{year}</option>
    ));
}