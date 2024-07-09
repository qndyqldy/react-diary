import {useTodoStore} from '../stores/useTodoStore.js';

const TodoList = () => {

		const todoList = useTodoStore((state) => state.todoList);
	return (

		<div>
			{
				todoList.map(todo => (
					<div key={todo.id}>
						{todo.id} {todo.name}
					</div>
				))
			}

		</div>
	)
}

export default TodoList;