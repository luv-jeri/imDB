import { Routes, Route } from 'react-router-dom';
import Home from './../page/Home';

const AppRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  );
};

export default AppRoute;
