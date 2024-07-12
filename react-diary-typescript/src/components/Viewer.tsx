import './Viewer.css';
import {emotionList, getEmotionImage} from "../utils/emotion.ts";

const Viewer = ({emotionId, content}: {
    emotionId: number;
    content: string;
}) => {
    const emotionItem = emotionList.find(emotion => emotion.emotionId === emotionId);

    return (
        <div className={"Viewer"}>
            <section className={"img_section"}>
                <h4>오늘의 감정</h4>
                <div>
                    <img src={getEmotionImage(emotionId)} />
                    <div>{emotionItem!.emotionName}</div>
                </div>
            </section>

            <section className={"content_section"}>
                <h4>오늘의 일기</h4>
                <div className={"content_wrapper"}>
                    <p>{content}</p>
                </div>
            </section>
        </div>
    )
}

export default Viewer;