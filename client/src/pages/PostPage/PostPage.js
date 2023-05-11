import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostPage.css';

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
        // <div className='max-w-[1150px] mx-auto'>
        //     <div className=' flex justify-center items-center flex-col'>
        //         <h1>{postInfo.title}</h1>
        //         <div  className='imageDiv'>
        //     <img className='imgClass' src={`http://localhost:5000/${postInfo.cover}`}/>
        //     </div>
        //     <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        //     </div>
        // </div>

        <div className='max-w-[1150px] mx-auto'>
            <div className=' flex justify-center items-center flex-col'>
                <h1 className='text-2xl py-2'>{postInfo.title}</h1>
            {/* <img className='lg:max-w-[600px] lg:max-h-[700px] md:max-w-[500px] md:max-h-[600px] p-5' src={`http://localhost:5000/${postInfo.cover}`}/> */}
            <img className='p-5 max-w-full overflow-hidden max-h-[500px]' src={`http://localhost:5000/${postInfo.cover}`}/>
           
            <div className='p-5' dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
            </div>
        </div>
    );
};

export default PostPage;