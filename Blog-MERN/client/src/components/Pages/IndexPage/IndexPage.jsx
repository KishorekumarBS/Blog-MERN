import React, { useState, useEffect } from 'react';
import Post from '../../Post/Post';
import api from '../Login/api';

function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/post').then(response => {
      setPosts(response.data);
    }).catch(error => {
      console.error('Error fetching posts:', error);
    });
  }, []); 

  return (
    <div>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </div>
  );
}

export default IndexPage;