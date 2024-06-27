import Header from '@/components/Header.jsx';
import Editor from '@/components/Editor.jsx';
import Button from '@/components/Button.jsx';
import {useNavigate, useParams} from 'react-router';
import usePageTitle from '@/hooks/usePageTitle.js';
import useDiary from '@/hooks/useDiary.js';
import {useContext} from 'react';
import {DiaryDispatchContext} from '@/App.jsx';

const Edit = () => {
	const nav = useNavigate();
	const params = useParams();
	const diary = useDiary(params.id);
	const {onDelete, onUpdate} = useContext(DiaryDispatchContext);

	usePageTitle(`${params.id}번 일기 수정`);

	const onClickDelete = () => {
		onDelete(diary.id);
		nav('/', {replace: true});
	}

	return (
		<div>
			<Header title={"일기 수정하기"}
				leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
				rightChild={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />}>
			</Header>
			<Editor initData={diary} onSubmit={onUpdate}>
			</Editor>
		</div>
	)
}

export default Edit;