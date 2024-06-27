import Header from '@/components/Header.jsx';
import DiaryList from '@/components/DiaryList.jsx';
import Button from '@/components/Button.jsx';
import {useState} from 'react';
import usePageTitle from '@/hooks/usePageTitle.js';

const getMonthlyData = (pivotDate, list) => {
	const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
	const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1, 0, 23, 59, 59).getTime();
	return list.filter(item => beginTime <= item.createdDate && item.createdDate <= endTime);
}
const Home = ({list, onDelete}) => {
	
	const [pivotDate, setPivotDate] = useState(new Date());
	usePageTitle('나만의 일기장');

	const onClickDecrease = () => {
		setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
	}
	const onClickIncrease = () => {
		setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
	}

	const monthlyData = getMonthlyData(pivotDate, list);
	return (
		<div>
			<Header
				title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
				leftChild={<Button text={"<"} onClick={onClickDecrease}/>}
				rightChild={<Button text={">"} onClick={onClickIncrease}/>}></Header>
			<DiaryList list={monthlyData} onDelete={onDelete}></DiaryList>
		</div>
	)
}

export default Home;