import './App.css'
import {Route, Routes} from 'react-router';
import Home from '@/pages/Home.jsx';
import New from '@/pages/New.jsx';
import Edit from '@/pages/Edit.jsx';
import Diary from '@/pages/Diary.jsx';
import NotFound from '@/pages/NotFound.jsx';
import {createContext, useMemo, useReducer, useRef, useState} from 'react';

const reducer = (state, action) => {
  let nextState;

  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      nextState = [...state, action.data];
      break;
    case 'UPDATE':
      nextState = state.map(item => String(item.id) === String(action.data.id) ? action.data : item);
      break;
    case 'DELETE':
      nextState = state.filter(item => String(item.id) !== String(action.targetId));
      break;
    default:
      nextState = state;
      break;
  }
  localStorage.setItem('diary', JSON.stringify(nextState));

  return nextState;
}
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
function App() {
  const [diaryList, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  const getDiary = (id) => {
    return diaryList.find(item => String(item.id) === String(id));
  }
  const onAdd = (diary) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        ...diary
      }
    });
  }

  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId
    })
  }

  const onUpdate = (diary) => {
    dispatch({
      type: 'UPDATE',
      data: {...diary}
    })
  }

  const memorizedDispatch = useMemo(() => {
    return {
      onAdd, onUpdate, onDelete
    }
  }, [])

  return (
    <>
      <DiaryStateContext.Provider value={diaryList}>
        <DiaryDispatchContext.Provider value={memorizedDispatch}>
          <Routes>
            <Route path={"/"} element={<Home />}></Route>
            <Route path={"/new"} element={<New />}></Route>
            <Route path={"/edit/:id"} element={<Edit />}></Route>
            <Route path={"/diary/:id"} element={<Diary />}></Route>
            <Route path={"*"} element={<NotFound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
