import './App.css'
import TodoList from './components/TodoList.jsx';
import Form from './components/Form.jsx';

function App() {
  return (
    <>
      <div>
        <h4>Todo List</h4>

        <div>
          <Form />
        </div>
        <div>
          <TodoList />
        </div>
      </div>
    </>
  )
}

export default App
