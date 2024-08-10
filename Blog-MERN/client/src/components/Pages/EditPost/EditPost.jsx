import {React,useState} from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import api from '../Login/api'
import { Navigate } from 'react-router-dom';
import Editor from '../../Editor/Editor';


function EditPost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    function updatePost(event){
        event.preventDefault();
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
    
            <button className="post">Create Post</button>
        </form>
)}

export default EditPost