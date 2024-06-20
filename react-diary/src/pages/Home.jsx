import Header from '@/components/Header.jsx';
import usePageTitle from '@/hooks/usePageTitle.js';
import {useContext, useState} from 'react';
import {DiaryStateContext} from '@/App.jsx';
import Button from '@/components/Button.jsx';
import DiaryList from '@/components/DiaryList.jsx';

const getMonthlyData = (pivotDate, list) => {
	const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
	const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1, 0, 23, 59, 59).getTime();
	return list.filter(item => beginTime <= item.createdDate && item.createdDate <= endTime);
}
const Home = () => {
	const [pivotDate, setPivotDate] = useState(new Date());
	usePageTitle(`욱이 일기장`);

	const onIncreaseMonth = () => {
		setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
	}
	const onDecreaseMonth = () => {
		setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1));
	}

	const diaryList = useContext(DiaryStateContext);
	const monthlyData = getMonthlyData(pivotDate, diaryList);

	return (
		<>
			<Header
				title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
				leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
				rightChild={<Button text={">"} onClick={onIncreaseMonth} /> } />
			<DiaryList list={monthlyData} />
		</>
	)
}

export default Home;