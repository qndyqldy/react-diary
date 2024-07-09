import {useRef, useState} from 'react';
import {useTodoStore} from '../stores/useTodoStore.js';

const Form = () => {
	const addTodo = useTodoStore((state) => state.addTodo);
	const [content, setContent] = useState('');
	const onChangeText = ({target}) => {
		setContent(target.value);
	}

	const idRef = useRef(3);
	const onClickAdd = () => {
		addTodo({
			id: idRef.current++,
			name: content
		})

		setContent('');
	}

	return (

		<div>
			<input type={"text"} value={content} onChange={onChangeText} />

			<button type={"button"} onClick={onClickAdd} >추가</button>
		</div>
	)
}

export default Form;