import './Editor.css';
import Button from '@/components/Button.jsx';
import {useNavigate} from 'react-router';
import {useEffect, useState} from 'react';
import {getStringedDate} from '@/utils/date.js';
import {emotionList} from '@/utils/emotion.js';
import EmotionItem from '@/components/EmotionItem.jsx';

const Editor = ({initData, onSubmit}) => {
	const nav = useNavigate();

	const [input, setInput] = useState({
		createdDate: new Date(),
		emotionId: 3,
		content: ''
	});

	const onClickSubmit = () => {
		onSubmit(input);
	}

	const onChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		if(name === 'createdDate') {
			value = new Date(value);
		}

		setInput({
			...input,
			[name]: value
		});
	}

	const onClick = (emotionId) => {
		setInput({
			...input,
			emotionId
		})
	}

	useEffect(() => {
		if(initData) {
			setInput({
				...initData,
				createdDate: new Date(Number(initData.createdDate))
			});
		}
	}, [initData]);

	return (
		<div className={"Editor"}>
			<section className={"date_section"}>
				<h4>오늘의 날짜</h4>
				<input
					type={"date"}
					name={"createdDate"}
					value={getStringedDate(input.createdDate)}
					onChange={onChange} />
			</section>
			<section className={"emotion_section"}>
				<h4>오늘의 감정</h4>
				<div className={"emotion_list_wrapper"}>
				{
					emotionList.map((emotion) => (
						<EmotionItem
							key={emotion.emotionId}
							{...emotion}
							isSelected={input.emotionId === emotion.emotionId}
							onClick={() => onClick(emotion.emotionId)} />
					))
				}
				</div>
			</section>
			<section className={"content_section"}>
				<h4>오늘의 일기</h4>
				<textarea
					name={"content"}
					value={input.content}
					onChange={onChange}>

				</textarea>
			</section>
			<section className={"button_section"}>
				<Button
					text={"취소하기"}
					onClick={() => nav(-1)} />
				<Button
					text={"작성완료"}
					type={"POSITIVE"}
					onClick={onClickSubmit} />

			</section>
		</div>
	)
}

export default Editor;