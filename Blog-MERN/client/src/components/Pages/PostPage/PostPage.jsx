import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import api from '../Login/api'

function PostPage() {
    const [postInfo, setPostInfo] = useState();
    const {id} = useParams();
    useEffect(()=>{
        api.get(`/post/${id}`).then(response =>{setPostInfo(response.data)})
    },[]);
    if(!postInfo) return '';
  return (
    <div>
        <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="Post image fetched from DB" />
        </div>
        <h1>{postInfo.title}</h1>
        <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        
    </div>
  )
}

export default PostPage