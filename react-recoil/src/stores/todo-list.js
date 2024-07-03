import {atom, selector} from 'recoil';

export const todoListState = atom({
	key: 'todoListState',
	default: []
});

export const todoListFilterState = atom({
	key: 'todoListFilter',
	default: ''
});

export const filteredTodoListState = selector({
	key: 'filteredTodoList',
	get: ({get}) => {
		const filter = get(todoListFilterState);
		const list = get(todoListState);

		switch(filter) {
			case 'ODD':
				return list.filter(item => item.id % 2 === 1);
			case 'EVEN':
				return list.filter(item => item.id % 2 === 0);
			default:
				return list;
		}
	}
})