import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './Components/List';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<List />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
