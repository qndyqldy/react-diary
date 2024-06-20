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

const reducer = (state, action) => {
  let nextState;
  switch(action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      nextState = [...state, action.data];
      break;
    case 'UPDATE':
      nextState = state.map(item => item.id === action.data.id ? action.data : item);
      break;
    case 'DELETE':
      nextState = state.filter(item => item.id !== action.targetId);
      break;
    default:
      nextState = state;
      break;
  }

  localStorage.set('diary', JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    });
  }
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id, createdDate, emotionId, content
      }
    });
  }
  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId
    })
  };

  const memorizedDispatch = useMemo(() => {
    return {
      onCreate, onUpdate, onDelete
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem('diary');
    if(!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);

    if(!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach(item => {
      if(Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: 'INIT',
      data: parsedData
    })

    setIsLoading(false);
  }, []);

  if(isLoading) {
    return <div>데이터 로딩 중입니다..</div>
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
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

export default App;
