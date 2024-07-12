import './Editor.css';
import Button from "./Button.tsx";
import {Diary, DiaryInput} from "../types/diary.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getStringedDate} from "../utils/date.ts";
import {emotionList} from "../utils/emotion.ts";
import {Emotion} from "../types/emotion.ts";
import EmotionItem from "./EmotionItem.tsx";

const Editor = ({initData, onSubmit}: {
    initData?: Diary | undefined;
    onSubmit: (diary) => Promise<void>
}) => {
    const nav: NavigateFunction = useNavigate();

    const [input, setInput] = useState<DiaryInput>({
        createdDate: new Date(),
        emotionId: 3,
        content: ''
    });

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const name: string = target.name;
        let value: string | Date = target.value;

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

    const onClickSubmit = async (): Promise<void> => {
        await onSubmit({...input});

        nav('/', {replace: true});
    }

    useEffect(() => {
        if(initData) {
            setInput({
                ...initData
            })
        }
    }, [initData]);

    return (
        <div className={"Editor"}>
            <section className={"date_section"}>
                <h4>오늘의 날짜</h4>
                <input
                    type={"date"}
                    name={"createdDate"}
                    onChange={onChangeInput}
                    value={getStringedDate(input.createdDate)} />
            </section>
            <section className={"emotion_section"}>
                <h4>오늘의 감정</h4>
                <div className={"emotion_list_wrapper"}>
                    {
                        emotionList.map((emotion: Emotion) => (
                            <EmotionItem
                                key={emotion.emotionId}
                                {...emotion}
                                isSelected={emotion.emotionId === input.emotionId}
                                onClick={() => onClickEmotion(emotion.emotionId)}></EmotionItem>
                        ))
                    }
                </div>
            </section>
            <section className={"content_section"}>
                <h4>오늘의 일기</h4>
                <textarea
                    name={"content"}
                    value={input.content}
                    onChange={onChangeInput}>

                </textarea>
            </section>
            <section className={"button_section"}>
                <Button text={"취소하기"} onClick={() => nav(-1)} />
                <Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmit} />
            </section>
        </div>
    )
}

export default Editor;