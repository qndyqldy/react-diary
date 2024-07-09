import {create} from 'zustand';

export const useTodoStore = create((set) => ({
	todoList: [],
	addTodo: (todo) => set((state) => ({
		todoList: [...state.todoList, todo]
	}))
}));