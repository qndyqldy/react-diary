import axios, {AxiosResponse} from 'axios';
import {Diary} from "../types/diary.ts";

export const loadDiaryList = async (): Promise<Diary[]> => {
	const  response = await axios.get<Diary[]>('/api/diaries');

	return response.data as Diary[];
}

export const loadDiary = async (id: number) => {
	const { data } = await axios.get<Diary>(`/api/diaries/${id}`);

	return data;
}

export const addDiary = async (diary: Diary) => {
	const response:AxiosResponse = await axios.post('/api/diaries', {
		...diary
	});

	return response;
}

export const removeDiary = async (id: number) => {
	const response:AxiosResponse = await axios.delete(`/api/diaries/${id}`);

	return response;
}

export const updateDiary = async (diary: Diary) => {
	const response:AxiosResponse = await axios.patch(`/api/diaries`, {...diary});

	return response;
}