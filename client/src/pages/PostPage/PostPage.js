import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const {id} = useParams();
    const [postInfo,setPostInfo] = useState(null);
    useEffect(()=>{
        fetch(`http://localhost:5000/post/${id}`)
        .then(res => res.json())
        .then(postInfo => setPostInfo(postInfo))
    },[])
    console.log(postInfo)
    if(!postInfo){
        return '';
    }
    return (
        <div className='max-w-[1150px] mx-auto'>
            <div className=' flex flex-col items-center justify-center'>
                <h1>{postInfo.title}</h1>
                <div  className=''>
            <img className='' src={`http://localhost:5000/${postInfo.cover}`}/>
            </div>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
            </div>
        </div>
    );
};

export default PostPage;