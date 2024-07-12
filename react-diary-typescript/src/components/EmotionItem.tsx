import './EmotionItem.css';
import {getEmotionImage} from "../utils/emotion.ts";

const EmotionItem = ({emotionId, emotionName, isSelected, onClick}: {
    emotionId: number;
    emotionName: string;
    isSelected: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ''}`}
            onClick={onClick}>
            <img className={"emotion_img"} src={getEmotionImage(emotionId)} />
            <div className={"emotion_name"}>{emotionName}</div>
        </div>
    )
}

export default EmotionItem;