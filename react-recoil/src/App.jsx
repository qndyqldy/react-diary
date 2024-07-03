import './App.css'
import {useRecoilState, useSetRecoilState} from 'recoil';
import {textState} from './stores/textStore.js';
import Text from './components/Text.jsx';
import TodoList from './components/TodoList.jsx';
import {useRef} from 'react';
import {todoListFilterState, todoListState} from './stores/todo-list.js';
import axios from 'axios';
import UserInfo from './components/UserInfo.jsx';

function App() {
  const [text, setText] = useRecoilState(textState);
  const onChange = (e) => {
    setText(e.target.value);
  }
  const idRef = useRef(0);

  const setTodoList = useSetRecoilState(todoListState);
  const onClickAdd = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: idRef.current++,
        content: `내용 ${idRef.current}`
      }
    ])
  }
  const [todoListFilter, setTodoListFilter] = useRecoilState(todoListFilterState);
  const onChangeFilter = ({target: {value}}) => {
    setTodoListFilter(value);
  }

  const onClickExpress = async () => {
    const response = await axios.get('/api/home');
    console.log(response);
  }
  const onClickExpress2 = async () => {
    const response = await axios.get(`/api/user/${text}`);
    console.log(response);
  }

  return (
    <>
      <h1>Recoil Test</h1>
      <input type={"text"} value={text} onChange={onChange} />

      <div>
        <Text></Text>
      </div>
      <div>
        <button type={"button"} onClick={onClickExpress}>express 요청</button>
        <button type={"button"} onClick={onClickExpress2}>express2 요청</button>
      </div>
      <div>
        <UserInfo />
      </div>
      <div>
        <h4>Todo List</h4>
        <select value={todoListFilter} onChange={onChangeFilter}>
          <option value={""}>전체</option>
          <option value={"EVEN"}>짝수</option>
          <option value={"ODD"}>홀수</option>
        </select>
        <button type={"button"} onClick={onClickAdd} >추가</button>
        <TodoList />
      </div>
    </>
  )
}

export default App
