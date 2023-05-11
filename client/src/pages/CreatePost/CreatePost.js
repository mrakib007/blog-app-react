import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files,setFiles] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const createNewPost = async (event) =>{
    event.preventDefault();

    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);
    const response = await fetch("http://localhost:5000/post",{
      method: "POST",
      body:data,
      credentials:'include',
    });
    if (response.ok) {
        toast.success("Your Post Has Been Published!", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTitle("");
        setSummary("");
        setContent('');
        setFiles('');
        setTimeout(() => {
        navigate(from, { replace: true });
        }, 2000);
    }else{
      toast.error("Unexpected Error.Please do try again later.", {
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
        Speak Your Mind! Create your post here.
      </h1>
      <form onSubmit={createNewPost}>
        <input
          className="w-full mx-3 my-3 py-2 px-2 border bg-gray-100 rounded"
          type="title"
          placeholder={"Title"}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          className="w-full mx-3 my-3 py-2 px-2 border bg-gray-100 rounded"
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={event => setSummary(event.target.value)}
        />
        <input
          className="w-full mx-3 my-3 py-2 px-2 border bg-gray-100 rounded"
          type="file"
          // value={files}
          onChange={event => setFiles(event.target.files)}
        />
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          className="mx-3 w-full"
          onChange={newValue => setContent(newValue)} />
        <button className="bg-indigo-200 w-full rounded py-2 my-3 mx-3">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
