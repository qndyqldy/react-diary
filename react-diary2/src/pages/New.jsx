import Header from '@/components/Header.jsx';
import Editor from '@/components/Editor.jsx';
import Button from '@/components/Button.jsx';
import {useNavigate} from 'react-router';

const New = ({onSubmit}) => {
	const nav = useNavigate();

	return (
		<div>
			<Header
				title={"새 일기 쓰기"}
				leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} /> }></Header>
			<Editor onSubmit={onSubmit}></Editor>
		</div>
	)
}

export default New;