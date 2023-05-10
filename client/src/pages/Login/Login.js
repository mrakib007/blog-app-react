import React, { useState } from "react";

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const response = fetch('http://localhost:5000/login',{
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type': 'application/json'}
    })
  }
  return (
    <form onSubmit={handleSubmit} action="" className=" max-w-[600px] mx-auto my-10">
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
