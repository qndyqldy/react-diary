import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDiaryStore} from '@/stores/useDiaryStore.js';

const useDiary = (id) => {
	const getDiary = useDiaryStore((state) => state.getDiary);
	const nav = useNavigate();
	const [curDiaryItem, setCurDiaryItem] = useState();

	useEffect(() => {
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