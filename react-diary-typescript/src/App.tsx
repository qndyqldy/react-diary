import './App.css'
import {Routes, Route} from "react-router";
import Home from "./pages/Home.tsx";
import {useDiaryStore} from "./stores/useDiaryStore.ts";
import {useEffect, useState} from "react";
import New from "./pages/New.tsx";
import Diary from "./pages/Diary.tsx";
import Edit from "./pages/Edit.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadDiaryList = useDiaryStore((state) => state.loadList);

    useEffect((): void => {
        const loadData = async (): Promise<void> => {
            console.log('load');
            await loadDiaryList();
            setIsLoading(false);
        };

        loadData();
    }, [loadDiaryList]);

    if(isLoading) {
        return <div>데이터 로딩 중입니다...</div>
    }

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/new"} element={<New />}></Route>
        <Route path={"/edit/:id"} element={<Edit />}></Route>
        <Route path={"/diary/:id"} element={<Diary />}></Route>
        <Route path={"*"} element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
