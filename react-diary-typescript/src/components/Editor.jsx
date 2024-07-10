import './Editor.css';
import Button from '@/components/Button.jsx';
import {useNavigate} from 'react-router';
import {emotionList} from '@/utils/emotion.js';
import EmotionItem from '@/components/EmotionItem.jsx';
import {useEffect, useState} from 'react';
import {getStringedDate} from '@/utils/date.js';
import usePageTitle from '@/hooks/usePageTitle.js';

const Editor = ({initData, onSubmit}) => {
	const nav = useNavigate();

	const [input, setInput] = useState({
		createdDate: new Date(),
		emotionId: 3,
		content: ''
	});
	const onChangeInput = (e) => {
		const target = e.target;
		const name = target.name;
		let value = target.value;

		if(name === 'createdDate') {
			value = new Date(value);
		}

		setInput({
			...input,
			[name]: value
		});
	}

	const onClickEmotion = (id) => {
		setInput({
			...input,
			emotionId: id
		});
	}

	const onClickSubmit = async () => {
		await onSubmit({...input});

		nav('/', {replace: true});
	}

	useEffect(() => {
		if(initData) {
			setInput({
				...initData,
				createdDate: new Date(initData.createdDate)
			})
		}
	}, [initData]);

	return (
		<div className={"Editor"}>
			<section className={"date_section"}>
				<h4>오늘의 날짜</h4>
				<input type={"date"} name={"createdDate"}
				       onChange={onChangeInput}
				       value={getStringedDate(input.createdDate)}/>
			</section>
			<section className={"emotion_section"}>
				<h4>오늘의 감정</h4>
				<div className={"emotion_list_wrapper"}>
					{
						emotionList.map(emotion => {
							return <EmotionItem
								key={emotion.emotionId}
								{...emotion}
								isSelected={emotion.emotionId === input.emotionId}
								onClick={() => onClickEmotion(emotion.emotionId)}></EmotionItem>
						})
					}
				</div>
			</section>
			<section className={"content_section"}>
				<h4>오늘의 일기</h4>
				<textarea name={"content"} value={input.content}
					onChange={onChangeInput}>
				</textarea>
			</section>
			<section className={"button_section"}>
				<Button text={"취소하기"} onClick={() => nav(-1)} ></Button>
				<Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmit}></Button>
			</section>
		</div>
	)
}

export default Editor;