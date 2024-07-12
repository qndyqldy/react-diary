import axios from 'axios';

export const loadDiaryList = async () => {
	const { data } = await axios.get('/api/diaries');

	console.log(data);

	return data;
}

export const loadDiary = async (id) => {
	const { data } = await axios.get(`/api/diaries/${id}`);

	return data;
}

export const addDiary = async (diary) => {
	const response = await axios.post('/api/diaries', {
		...diary
	});

	return response;
}

export const removeDiary = async (id) => {
	const response = await axios.delete(`/api/diaries/${id}`);

	return response;
}

export const updateDiary = async (diary) => {
	const response = await axios.patch(`/api/diaries`, {...diary});

	return response;
}