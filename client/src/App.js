import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Post from './components/Post/Post';

function App() {
  return (
    <Routes>
      <Route index element={
        <main>
          <NavBar/>
          <Post/>
          <Post/>
        </main>
      }/>
      <Route path={'/login'} element={
      <div>Login</div>}/>
    </Routes>
  );
}

export default App;
