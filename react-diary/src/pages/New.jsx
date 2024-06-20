import Header from '@/components/Header.jsx';
import Button from '@/components/Button.jsx';
import {useNavigate} from 'react-router';
import Editor from '@/components/Editor.jsx';

const New = () => {
	const nav = useNavigate();

	return (
		<div>
			<Header
				title={"새 일기 쓰기"}
				leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} /> } />
			<Editor
				/>
		</div>
	)
}

export default New;