import './App.css';
import { useAuth } from './context/auth.context';
import AuthRoute from './routes/Auth.route';
import AppRoute from './routes/App.route';
import { Routes, Route } from 'react-router-dom';

function App() {
  const { user } = useAuth();
  return <>{user ? <AppRoute /> : <AuthRoute />}</>;
}

export default App;
