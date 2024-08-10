import {React,useState} from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './CreatePost.css'
import api from '../Login/api'
import Editor from '../../Editor/Editor';
import { Navigate } from 'react-router-dom';




function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('file', files[0]);
      

      ev.preventDefault();
      try {
          const response = await api.post('/post', data, {
              withCredentials: true,
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          if (response.status >= 200 && response.status < 300) {
              setRedirect(true);
          }
      } catch (error) {
          console.error('Error creating post:', error);
      }
  }  

  if (redirect){
    return <Navigate to ={'/'}/>
  }
  return (
    <form onSubmit={createNewPost}>
        <input type="title" placeholder={'Title'} value={title} onChange={ev=>setTitle(ev.target.value)}/>
        <input type="summary" placeholder={'Summary'} value={summary} onChange={ev=>setSummary(ev.target.value)}/>
        <input type="file" onChange={ev => setFiles(ev.target.files)}/>
        <Editor onChange={setContent} value={content}/>

        <button className="post">Create Post</button>
    </form>
  )
}

export default CreatePost