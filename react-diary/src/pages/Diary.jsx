import {useParams} from 'react-router';

const Diary = ({getDiary}) => {

	const params = useParams();
	const diary = getDiary(params.id);
	console.log(diary);
	console.log(params);
	console.log(params.id);


	return (
		<div>
			<Hea
		</div>
	)
}

export default Diary;