import {useEffect} from 'react';

const usePageTitle = (title: string): void => {
	useEffect((): void => {
		const $title: HTMLTitleElement = document.getElementsByTagName('title')[0];
		$title.innerText = title;
	}, [title]);

}

export default usePageTitle;