import {useRecoilValue} from 'recoil';
import {userNameQuery, userNameState} from '../stores/user-info.js';
import {useEffect, useState} from 'react';

const UserInfo = () => {
	const userName = useRecoilValue(userNameState);
	const gildongName = useRecoilValue(userNameQuery('gildong'));
	console.log(gildongName);

	if(!userName) {
		return <div>Loading...</div>
	}

	return (
		<div>
			{userName}
			{gildongName.data.name}
		</div>
	)
}

export default UserInfo;