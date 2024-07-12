import './DiaryItem.css';
import {NavigateFunction, useNavigate} from "react-router-dom";
import {getEmotionImage} from "../utils/emotion.ts";
import Button from "./Button.tsx";
import {useDiaryStore} from "../stores/useDiaryStore.ts";

const DiaryItem = ({id, emotionId, createdDate, content}: {
    id: number;
    emotionId: number;
    createdDate: number;
    content: string;
}) => {
    const nav: NavigateFunction = useNavigate();

    const removeDiary = useDiaryStore((state) => state.removeDiary);
    const onClickDelete = async (): Promise<void> => {
        await removeDiary(id);
    }

    return (
        <div className={"DiaryItem"}>
            <div
                className={`img_section img_section_${emotionId}`}
                onClick={() => nav(`/diary/${id}`)}>
                <img src={getEmotionImage(emotionId)} />
            </div>
            <div
                className={"info_section"}
                onClick={() => nav(`/diary/${id}`)}>
                <div className={"created_date"}>
                    {new Date(createdDate).toLocaleDateString()}
                </div>
                <div className={"content"}>
                    {content}
                </div>
            </div>
            <div className={"button_section"}>
                <Button
                    text={"수정하기"}
                    onClick={() => nav(`/edit/${id}`)} />
                <Button
                    text={"삭제하기"}
                    type={"NEGATIVE"}
                    onClick={onClickDelete} />
            </div>
        </div>
    )
}

export default DiaryItem;