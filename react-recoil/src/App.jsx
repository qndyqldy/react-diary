import './App.css'
import {useRecoilState} from 'recoil';
import {textState} from './stores/textStore.js';
import Text from './components/Text.jsx';

function App() {
  const [text, setText] = useRecoilState(textState);
  const onChange = (e) => {
    setText(e.target.value);
  }

  return (
    <>
      <h1>Recoil Test</h1>
      <input type={"text"} value={text} onChange={onChange} />

      <div>
        <Text></Text>
      </div>
    </>
  )
}

export default App
