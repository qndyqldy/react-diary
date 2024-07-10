import Header from '@/components/Header.jsx';
import DiaryList from '@/components/DiaryList.jsx';
import Button from '@/components/Button.jsx';
import {useEffect, useState} from 'react';
import usePageTitle from '@/hooks/usePageTitle.js';
import {useDiaryStore} from '@/stores/useDiaryStore.js';

const getMonthlyData = (pivotDate, list) => {
	const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
	const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1, 0, 23, 59, 59).getTime();
		return list.filter(item => beginTime <= new Date(item.createdDate).getTime() && new Date(item.createdDate).getTime() <= endTime);
}
const Home = () => {
	const [pivotDate, setPivotDate] = useState(new Date());
	usePageTitle('나만의 일기장');
	const diaryList = useDiaryStore((state) => state.list);

	const onClickDecrease = () => {
		setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
	}
	const onClickIncrease = () => {
		setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
	}

	let [monthlyData, setMonthlyData] = useState([]);
	useEffect(() => {
		setMonthlyData(getMonthlyData(pivotDate, diaryList));
	}, [diaryList, pivotDate]);

	return (
		<div>
			<Header
				title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
				leftChild={<Button text={"<"} onClick={onClickDecrease}/>}
				rightChild={<Button text={">"} onClick={onClickIncrease}/>}></Header>
			<DiaryList list={monthlyData} ></DiaryList>
		</div>
	)
}

export default Home;