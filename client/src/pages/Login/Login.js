import React, { useState } from "react";
import { toast } from "react-toastify";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Navigate, useLocation, useNavigate} from 'react-router-dom';

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const response = await fetch('http://localhost:5000/login',{
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    console.log(response);
    setUsername('');
    setPassword('');
    if(response.ok){
      toast.success('You are successfully logged in.', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        setTimeout(()=>{
          navigate(from,{replace:true});
        },2000)
    } else{
      toast.error('There are some errors here. Please do try again.', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }
  return (
    <form onSubmit={handleSubmit} action="" className=" max-w-[600px] mx-auto my-10">
     <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className="text-2xl font-bold my-2 text-center">Login Now</h1>
      <input
        className="w-full my-3 py-2 px-2 border bg-gray-100 rounded"
        type="text"
        placeholder="username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <input
        className="w-full py-2 my-3 px-2 border bg-gray-100 rounded"
        type="password"
        placeholder="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button className="w-full text-xl my-2 py-2 px-2  bg-indigo-200 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
