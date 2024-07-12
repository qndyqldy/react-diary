export const getStringedDate = (targetDate: Date): string => {
	let year: number = targetDate.getFullYear();
	let month: string = String(targetDate.getMonth() + 1);
	let date: string = String(targetDate.getDate());

	if(month < 10) {
		month = `0${month}`;
	}
	if(date < 10) {
		date = `0${date}`;
	}

	return `${year}-${month}-${date}`;
}