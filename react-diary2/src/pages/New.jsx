import Header from '@/components/Header.jsx';
import Editor from '@/components/Editor.jsx';
import Button from '@/components/Button.jsx';
import {useNavigate} from 'react-router';
import {useContext} from 'react';
import {DiaryDispatchContext} from '@/App.jsx';

const New = () => {
	const nav = useNavigate();
	const {onAdd} = useContext(DiaryDispatchContext);

	return (
		<div>
			<Header
				title={"새 일기 쓰기"}
				leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} /> }></Header>
			<Editor onSubmit={onAdd}></Editor>
		</div>
	)
}

export default New;