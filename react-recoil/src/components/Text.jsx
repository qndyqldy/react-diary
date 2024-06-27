import {useRecoilValue} from 'recoil';
import {textCountState, textState} from '../stores/textStore.js';

const Text = () => {
	const text = useRecoilValue(textState);
	const count = useRecoilValue(textCountState);

	return (
		<div>
			<h3>{text}</h3>
			<h4>text count : {count}</h4>
		</div>
	)
}

export default Text;