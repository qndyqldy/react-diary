import Header from '@/components/Header.jsx';
import Editor from '@/components/Editor.jsx';
import Button from '@/components/Button.jsx';
import {useNavigate, useParams} from 'react-router';
import {useEffect} from 'react';
import usePageTitle from '@/hooks/usePageTitle.js';

const Edit = ({getDiary, onSubmit, onDelete}) => {
	const nav = useNavigate();
	const params = useParams();
	const diary = getDiary(params.id);

	useEffect(() => {
		if(!diary) {
			alert('잘못된 요청입니다.');
			nav('/');
		}
	}, [diary]);

	const onClickDelete = () => {
		onDelete(diary.id);
		nav('/', {replace: true});
	}
	
	usePageTitle(`${diary.id}번 일기 수정`)

	return (
		<div>
			<Header title={"일기 수정하기"}
				leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
				rightChild={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />}>
			</Header>
			<Editor initData={diary} onSubmit={onSubmit}>
				
			</Editor>
		</div>
	)
}

export default Edit;