import './App.css'
import {Route, Routes} from 'react-router';
import Home from '@/pages/Home.jsx';
import New from '@/pages/New.jsx';
import Edit from '@/pages/Edit.jsx';
import Diary from '@/pages/Diary.jsx';
import NotFound from '@/pages/NotFound.jsx';

const App = () => {
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

export default App;
