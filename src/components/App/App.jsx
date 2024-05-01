import { useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='app'>
      <Header />
      <Main />
    </div>
  );
}

export default App;
