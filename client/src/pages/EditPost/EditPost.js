import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Editor from "../Editor/Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
    const [cover,setCover] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // fetch("http://localhost:5000/post/"+id)
    fetch(`http://localhost:5000/post/${id}`)
      .then(res => res.json())
      .then(postInfo => {
        console.log(postInfo)
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  },[]);

  const updatePost = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id",id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await fetch("http://localhost:5000/post", {
      method: "PUT",
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      navigate(from, { replace: true });
    }
  };
  return (
    <div className="mt-5">
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
      <h1 className="text-2xl mx-3 my-3">
        Feel That You Can Write Better Than You Did? Update Your Post From Here.
      </h1>
      <form onSubmit={updatePost}>
        <input
          className="w-full mx-3 my-3 py-2 px-2 border bg-gray-100 rounded"
          type="title"
          placeholder={"Title"}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className="w-full mx-3 my-3 py-2 px-2 border bg-gray-100 rounded"
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
        <input
          className="w-full mx-3 my-3 py-2 px-2 border bg-gray-100 rounded"
          type="file"
          // value={files}
          onChange={(event) => setFiles(event.target.files)}
        />
        {/* <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          className="mx-3 w-full"
          onChange={(newValue) => setContent(newValue)}
        /> */}
        <Editor onChange={setContent} value={content} />
        <button className="bg-indigo-200 w-full rounded py-2 my-3 mx-3">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
