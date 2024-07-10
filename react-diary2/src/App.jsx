import './App.css'
import {Route, Routes} from 'react-router';
import Home from '@/pages/Home.jsx';
import New from '@/pages/New.jsx';
import Edit from '@/pages/Edit.jsx';
import Diary from '@/pages/Diary.jsx';
import NotFound from '@/pages/NotFound.jsx';
import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react';
import {useDiaryStore} from '@/stores/useDiaryStore.js';

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
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [diaryList, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);


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

  const loadDiaryList = useDiaryStore((state) => state.loadList);

  useEffect(() => {
    const loadData = async () => {
      console.log('mounted');
      await loadDiaryList();
      setIsLoading(false);
    };

    loadData();

  }, [loadDiaryList]);

  if(isLoading) {
    return <div>데이터 로딩 중입니다..</div>
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
