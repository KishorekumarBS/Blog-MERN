import {React,useState} from 'react'
import api from '../Login/api'
import { Navigate,useParams } from 'react-router-dom';
import Editor from '../../Editor/Editor';
import { useEffect } from 'react';


function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        api.get(`/post/${id}`).then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
          setSummary(response.data.summary);
        }).catch(error => {
          console.error("Error fetching post:", error);
        });
      }, [id]);

    async function updatePost(event) {
        event.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id)
        if (files?.[0]) {
          data.set('file', files?.[0]);
        }
        
        try {
          const response = await api.put(`/post`, data,{
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
          if (response.status >= 200 && response.status < 300) {
            setRedirect(true);
          }
        } catch (error) {
          console.error("Error updating post:", error);
        }
      }
    if (redirect){
        return <Navigate to ={'/'}/>
    }
      return (
        <form onSubmit={updatePost}>
            <input type="title" placeholder={'Title'} value={title} onChange={ev=>setTitle(ev.target.value)}/>
            <input type="summary" placeholder={'Summary'} value={summary} onChange={ev=>setSummary(ev.target.value)}/>
            <input type="file" onChange={ev => setFiles(ev.target.files)}/>
            <Editor onChange={setContent} value={content}/>
    
            <button className="post">Update Post</button>
        </form>
)}

export default EditPost