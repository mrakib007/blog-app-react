import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  return (
    <div className="mt-5">
      <h1 className="text-2xl mx-3 my-3">
        Speak Your Mind! Create your post here.
      </h1>
      <form>
        <input
          className="w-full mx-3 my-3 py-2 px-2 border bg-gray-100 rounded"
          type="title"
          placeholder={"Title"}
          value={title}
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
