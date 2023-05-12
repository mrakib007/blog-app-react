import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PostPage.css";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../../contexts/UserContext";

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`)
      .then((res) => res.json())
      .then((postInfo) => setPostInfo(postInfo));
  }, []);
  console.log(postInfo);
  if (!postInfo) {
    return "";
  }
  return (
    // <div className='max-w-[1150px] mx-auto'>
    //     <div className=' flex justify-center items-center flex-col'>
    //         <h1>{postInfo.title}</h1>
    //         <div  className='imageDiv'>
    //     <img className='imgClass' src={`http://localhost:5000/${postInfo.cover}`}/>
    //     </div>
    //     <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
    //     </div>
    // </div>

    <div className="max-w-[1150px] mx-auto">
      <div className=" flex justify-center items-center flex-col">
        <h1 className="text-5xl text-black font-semibold py-2">
          {postInfo.title}
        </h1>
        {/* <img className='lg:max-w-[600px] lg:max-h-[700px] md:max-w-[500px] md:max-h-[600px] p-5' src={`http://localhost:5000/${postInfo.cover}`}/> */}
        <img
          className="p-5 max-w-full overflow-hidden max-h-[500px] object-cover object-center "
          src={`http://localhost:5000/${postInfo.cover}`}
        />
        <h1 className="text-xl py-2">
          Posted By: <span>{postInfo.author.username}</span>
        </h1>

        <time className="m-3">
          {formatISO9075(new Date(postInfo.createdAt))}
        </time>

        {userInfo.id === postInfo.author._id && (
          <div>
            <Link to={`/edit/${postInfo._id}`} className="btn flex justify-between bg-indigo-500 p-2 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit This Post
            </Link>
          </div>
        )}

        <div
          className="p-5 text-xl"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        ></div>
      </div>
    </div>
  );
};

export default PostPage;
