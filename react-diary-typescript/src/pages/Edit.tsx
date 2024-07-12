import Header from "../components/Header.tsx";
import Editor from "../components/Editor.tsx";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import useDiary from "../hooks/useDiary.ts";
import {useDiaryStore} from "../stores/useDiaryStore.ts";
import usePageTitle from "../hooks/usePageTitle.ts";
import Button from "../components/Button.tsx";

const Edit = () => {
    const nav: NavigateFunction = useNavigate();
    const params = useParams();
    const diary = useDiary(Number(params.id));
    const removeDiary = useDiaryStore((state) => state.removeDiary);
    const updateDiary = useDiaryStore((state) => state.updateDiary);

    usePageTitle(`${params.id}번 일기 수정`);

    const onClickDelete = async (): Promise<void> => {
        await removeDiary(Number(diary!.id));
        nav('/', {replace: true});
    }

    return (
        <div>
            <Header
                title={"일기 수정하기"}
                leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} /> }
                rightChild={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />} />
            <Editor
                initData={diary}
                onSubmit={updateDiary} />
        </div>
    )
}

export default Edit;