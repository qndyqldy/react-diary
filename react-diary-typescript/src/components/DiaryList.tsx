import './DiaryList.css';
import {Diary} from "../types/diary.ts";
import Button from "./Button.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DiaryItem from "./DiaryItem.tsx";

const DiaryList = ({list}: {list: Diary[]}) => {
    const nav: NavigateFunction = useNavigate();
    const [sortType, setSortType] = useState<string>('lastest');
    const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSortType(e.target.value);
    }

    const getSortedList = (): Diary[] => {
        return list.toSorted((a: Diary, b: Diary) => {
            if(sortType === 'latest') {
                return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
            } else {
                return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
            }
        })
    }

    const [sortedData, setSortedData] = useState<Diary[]>([]);
    useEffect(() => {
        setSortedData(getSortedList());
    }, [list, sortType]);

    return (
        <div className={"DiaryList"}>
            <div className={"menu_bar"}>
                <select onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button
                    text={"새 일기 쓰기"}
                    type={"POSITIVE"}
                    onClick={() => nav('/new')} ></Button>
            </div>
            <div className={"list_wrapper"}>
                {
                    sortedData.map((diary: Diary) => (
                        <DiaryItem key={diary.id} {...diary} />
                    ))
                }
            </div>
        </div>
    )
}

export default DiaryList;