import { create } from 'zustand'
import {
	addDiary,
	loadDiaryList,
	removeDiary,
	updateDiary
} from '@/api/diary.js';

export const useDiaryStore = create((set, get) => ({
	list: [],
	loadList: async () => {
		const data = await loadDiaryList();
		set({
			list: [...data]
		})
	},
	getDiary: (id) => {
		return get().list.find(item => item.id === id);
	},
	addDiary: async (diary) => {
		const result = await addDiary(diary);

		console.log(result);

		await get().loadList();
	},

	removeDiary: async (id) => {
		const result = await removeDiary(id);

		console.log(result);

		await get().loadList();
	},

	updateDiary: async (diary) => {
		const result = await updateDiary(diary);
		console.log(result);

		await get().loadList();
	}
}));