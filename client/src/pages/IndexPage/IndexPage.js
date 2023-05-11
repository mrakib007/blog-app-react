import React, { useEffect, useState } from 'react';
import Post from '../../components/Post/Post';

const IndexPage = () => {
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
         fetch('http://localhost:5000/post')
        .then(res => res.json())
        .then(posts => setPosts(posts))
    },[])
    return (
        <>
        {
            posts?.length > 0 &&
            posts.map(post => (
                <Post {...post}/>
            ))
        }
        </>
    );
};

export default IndexPage;