import {atom, selector, selectorFamily} from 'recoil';
import axios from 'axios';

export const userIdState = atom({
	key: 'userInfo',
	default: 'qndyqldy'
});

export const userNameState = selector({
	key: 'userName',
	get: async ({get}) => {
		const response = await axios.get(`/api/user/${get(userIdState)}`);

		console.log(response);
		return response.data.name;
	}
});


export const userNameQuery = selectorFamily({
	key: 'userNameQuery',
	get: (userId) => async () => {
		console.log(userId);
		const response = await axios.get(`/api/user/${userId}`);

		return response;
	}
});