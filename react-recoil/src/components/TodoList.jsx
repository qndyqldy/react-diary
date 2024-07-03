import {useRecoilValue} from 'recoil';
import {filteredTodoListState, todoListState} from '../stores/todo-list.js';
import TodoItem from './TodoItem.jsx';

const TodoList = () => {
	const todoList = useRecoilValue(todoListState);
	const filteredTodoList = useRecoilValue(filteredTodoListState);

	return (
		<div>
			{
				filteredTodoList.map(todo => (
					 <TodoItem key={todo.id} item={todo} />
				))
			}
		</div>
	)
}


export default TodoList;