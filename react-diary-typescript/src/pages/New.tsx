import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import Editor from "../components/Editor.tsx";
import {useDiaryStore} from "../stores/useDiaryStore.ts";

const New = () => {
    const nav: NavigateFunction = useNavigate();
    const addDiary = useDiaryStore((state) => state.addDiary);

    return (

        <div>
            <Header
                title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />} ></Header>
            <Editor onSubmit={addDiary} />
        </div>
    )
}

export default New;