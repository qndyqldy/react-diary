import Header from '@/components/Header.jsx';
import {useNavigate, useParams} from 'react-router';
import {getStringedDate} from '@/utils/date.js';
import Button from '@/components/Button.jsx';
import Viewer from '@/components/Viewer.jsx';
import useDiary from '@/hooks/useDiary.js';

const Diary = () => {
	const nav = useNavigate();
	const params = useParams();
	const diary = useDiary(params.id);

	if(!diary) {
		return <div>로딩중</div>;
	}

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