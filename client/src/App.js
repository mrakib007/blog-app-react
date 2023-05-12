import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Post from "./components/Post/Post";
import Layout from "./Layout/Layout";
import IndexPage from "./pages/IndexPage/IndexPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { UserContextProvider } from "./contexts/UserContext";
import CreatePost from "./pages/CreatePost/CreatePost";
import PostPage from "./pages/PostPage/PostPage";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={"/login"} element={<Login/>} />
        <Route path={"/register"} element={<Register/>}/>
        <Route path={"/create"} element={<CreatePost/>}/>
        <Route path={"/post/:id"} element={<PostPage/>}/>
        <Route path={"/edit/:id"} element={<EditPost/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
