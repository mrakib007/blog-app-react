import React, { useState } from "react";

const Register = () => {
  const [name,setName] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleRegister = (event) =>{
    event.preventDefault();
    fetch('http://localhost:5000/register',{
      method: 'POST',
      body: JSON.stringify({name,username,password}),
      headers: {'Content-Type': 'application/json'},
    })
  }
  return (
    <form onSubmit={handleRegister} className=" max-w-[600px] mx-auto my-10">
      <h1 className="text-2xl font-bold my-2 text-center">Signup From Here</h1>
      <input
        className="w-full my-3 py-2 px-2 border bg-gray-100 rounded"
        type="text"
        placeholder="Your Name"
        value={name}
        onChange = {event => setName(event.target.value)}
      />

      <input
        className="w-full my-3 py-2 px-2 border bg-gray-100 rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <input
        className="w-full py-2 my-3 px-2 border bg-gray-100 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button className="w-full text-xl my-2 py-2 px-2  bg-indigo-200 rounded">
        Signup
      </button>
    </form>
  );
};

export default Register;
