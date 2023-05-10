import React from "react";

const Login = () => {
  return (
    <form action="" className=" max-w-[600px] mx-auto my-10">
      <h1 className="text-2xl font-bold my-2 text-center">Login Now</h1>
      <input
        className="w-full my-3 py-2 px-2 border bg-gray-100 rounded"
        type="text"
        placeholder="username"
      />
      <input
        className="w-full py-2 my-3 px-2 border bg-gray-100 rounded"
        type="password"
        placeholder="password"
      />
      <button className="w-full text-xl my-2 py-2 px-2  bg-indigo-200 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
