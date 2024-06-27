import './App.css'
import {Route, Routes} from 'react-router';
import Home from '@/pages/Home.jsx';
import New from '@/pages/New.jsx';
import Edit from '@/pages/Edit.jsx';
import Diary from '@/pages/Diary.jsx';
import NotFound from '@/pages/NotFound.jsx';
import {useRef, useState} from 'react';

function App() {
  const [diaryList, setDiaryList] = useState([]);
  const idRef = useRef(0);

  const getDiary = (id) => {
    return diaryList.find(item => String(item.id) === String(id));
  }
  const onAdd = (diary) => {
    setDiaryList([
      ...diaryList,
      {
        id: idRef.current++,
        ...diary
      }
    ])
  }

  const onDelete = (id) => {
    setDiaryList(
      diaryList.filter(diary => diary.id !== id)
    );
  }

  const onUpdate = (diary) => {
    setDiaryList(
      diaryList.map(item => diary.id === item.id ? diary : item)
    )
  }

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home list={diaryList} onDelete={onDelete}/>}></Route>
        <Route path={"/new"} element={<New onSubmit={onAdd} />}></Route>
        <Route path={"/edit/:id"} element={<Edit getDiary={getDiary} onSubmit={onUpdate} onDelete={onDelete}/>}></Route>
        <Route path={"/diary/:id"} element={<Diary getDiary={getDiary}/>}></Route>
        <Route path={"*"} element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
