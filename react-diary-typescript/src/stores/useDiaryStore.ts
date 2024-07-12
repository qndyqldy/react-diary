import { create } from 'zustand'
import {
	addDiary,
	loadDiaryList,
	removeDiary,
	updateDiary
} from '@/api/diary.ts';
import {Diary} from "../types/diary.ts";

interface DiaryState {
	list: Diary[],
	loadList: () => Promise<void>;
	getDiary: (id: number) => Diary | undefined;
	addDiary: (diary: Diary) => Promise<void>;
	removeDiary: (id: number) => Promise<void>;
	updateDiary: (diary: Diary) => Promise<void>;
}

export const useDiaryStore = create<DiaryState>((set, get) => ({
	list: [],
	loadList: async () => {
		const data = await loadDiaryList();
		set({
			list: data.map(item => {
				return {
					...item,
					createdDate: new Date(item.createdDate)
				}
			})
		})
	},
	getDiary: (id: number) => {
		return get().list.find(item => item.id === id);
	},
	addDiary: async (diary: Diary): Promise<void> => {
		const result = await addDiary(diary);

		console.log(result);

		await get().loadList();
	},

	removeDiary: async (id: number) => {
		const result = await removeDiary(id);

		console.log(result);

		await get().loadList();
	},

	updateDiary: async (diary: Diary) => {
		const result = await updateDiary(diary);
		console.log(result);

		await get().loadList();
	}
}));