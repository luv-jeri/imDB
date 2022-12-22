import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './page/SignIn';
import Home from './page/Home';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
