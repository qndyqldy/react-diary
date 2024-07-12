import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDiaryStore} from '@/stores/useDiaryStore.ts';
import {Diary} from "../types/diary.ts";

const useDiary = (id: number): Diary | undefined => {
	const getDiary = useDiaryStore((state) => state.getDiary);
	const nav = useNavigate();
	const [curDiaryItem, setCurDiaryItem] = useState<Diary | undefined>(undefined);

	useEffect((): void => {
		const currentDiaryItem = getDiary(id);

		if(!currentDiaryItem) {
			alert('존재하지 않는 일기장입니다.');
			nav('/', {replace: true});
		}

		setCurDiaryItem(currentDiaryItem);
	}, [id, getDiary]);

	return curDiaryItem;
}

export default useDiary;