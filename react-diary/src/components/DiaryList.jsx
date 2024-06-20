import './DiaryList.css'
import {useNavigate} from 'react-router';
import Button from '@/components/Button.jsx';
import {useEffect, useState} from 'react';
import DiaryItem from '@/components/DiaryItem.jsx';

const DiaryList = ({list}) => {

	const nav = useNavigate();

	const [sortType,setSortType] = useState('latest');
	const onChangeSortType = (e) => {
		setSortType(e.target.value);
	}

	const getSortedList = () => {
		return list.toSorted((a, b)=> {
			if(sortType === 'latest') {
				return Number(b.createdDate) - Number(a.createdDate);
			} else {
				return Number(a.createdDate) - Number(b.createdDate);
			}
		});
	}

	const sortedData = getSortedList();

	return (
		<div className={"DiaryList"}>
			<div className={"menu_bar"}>
				<select onChange={onChangeSortType}>
					<option value={"latest"}>최신순</option>
					<option value={"oldest"}>오래된 순</option>
				</select>
				<Button
					text={"새 일기 쓰기"}
					type={"POSITIVE"}
					onClick={() => nav('/new')}/>
			</div>

			<div className={"list_wrapper"}>
				{
					sortedData.map(diary => {
						return <DiaryItem key={diary.id} {...diary} />
					})
				}
			</div>
		</div>
	)
}

export default DiaryList;