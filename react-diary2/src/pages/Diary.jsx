import Header from '@/components/Header.jsx';
import {useNavigate, useParams} from 'react-router';
import {useEffect} from 'react';
import {getStringedDate} from '@/utils/date.js';
import Button from '@/components/Button.jsx';
import Viewer from '@/components/Viewer.jsx';

const Diary = ({getDiary}) => {
	const nav = useNavigate();
	const params = useParams();
	const diary = getDiary(params.id);

	useEffect(() => {
		if(!diary) {
			alert('잘못된 요청입니다.');
			nav('/');
		}
	}, [diary]);

	return (
		<div>
			<Header
				title={`${getStringedDate(new Date(diary.createdDate))} 일기`}
				leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} /> }
				rightChild={<Button text={"수정하기"} onClick={() => nav(`/edit/${diary.id}`)} />}></Header>
			<Viewer emotionId={diary.emotionId} content={diary.content}></Viewer>
		</div>
	)
}

export default Diary;