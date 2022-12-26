import { Routes, Route } from 'react-router-dom';
import SignIn from '../page/SignIn';

const AuthRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
    </Routes>
  );
};

export default AuthRoute;
