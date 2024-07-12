import Header from "../components/Header.tsx";
import {Diary} from "../types/diary.ts";
import {useEffect, useState} from "react";
import usePageTitle from "../hooks/usePageTitle.ts";
import Button from "../components/Button.tsx";
import DiaryList from "../components/DiaryList.tsx";
import {useDiaryStore} from "../stores/useDiaryStore.ts";

const getMonthlyData = (pivotDate: Date, list: Diary[]): Diary[] => {
    const beginTime: number = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    const endTime: number = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1, 0, 23, 59, 59).getTime();
    return list.filter(item => beginTime <= new Date(item.createdDate).getTime() && new Date(item.createdDate).getTime() <= endTime);
}

const Home = () => {
    const [pivotDate, setPivotDate] = useState<Date>(new Date());
    usePageTitle('나만의 일기장');
    const diaryList: Diary[] = useDiaryStore((state) => state.list);

    const onClickDecrease = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    const onClickIncrease = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }

    const [monthlyData, setMonthlyData] = useState<Diary[]>([]);
    useEffect(() => {
        console.log(diaryList);
        setMonthlyData(getMonthlyData(pivotDate, diaryList));
    }, [diaryList, pivotDate]);

    return (

        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
                leftChild={<Button text={"<"} onClick={onClickDecrease} />}
                rightChild={<Button text={">"} onClick={onClickIncrease} /> }>
            </Header>
            <DiaryList list={monthlyData} ></DiaryList>
        </div>
    )
}

export default Home;