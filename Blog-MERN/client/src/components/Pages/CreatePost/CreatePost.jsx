import {React,useState} from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './CreatePost.css'
import api from '../Login/api'
import { Navigate } from 'react-router-dom';


const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

 const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];


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
        <ReactQuill 
            value={content} 
            onChange={value => setContent(value)} // Corrected to use 'value'
            modules={modules} 
            formats={formats}
        />

        <button className="post">Create Post</button>
    </form>
  )
}

export default CreatePost