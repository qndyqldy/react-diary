const TodoItem = ({item}) => {

	return (
		<div>
			{item.id} / {item.content}
		</div>
	)
}

export default TodoItem;