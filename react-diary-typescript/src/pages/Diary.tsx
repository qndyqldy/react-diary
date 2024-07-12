import Header from "../components/Header.tsx";
import {getStringedDate} from "../utils/date.ts";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import useDiary from "../hooks/useDiary.ts";
import Button from "../components/Button.tsx";
import Viewer from "../components/Viewer.tsx";

const Diary = () => {
    const nav: NavigateFunction = useNavigate();
    const params = useParams();
    const diary = useDiary(Number(params.id));

    if(!diary) {
        return <div>로딩중</div>;
    }

    return (
        <div>
            <Header
                title={`${getStringedDate(diary.createdDate)} 일기`}
                leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)}/>}
                rightChild={<Button text={"수정하기"} onClick={() => nav(`/edit/${diary!.id}`)} />} />
            <Viewer emotionId={diary.emotionId} content={diary.content} />
        </div>
    )
}

export default Diary;