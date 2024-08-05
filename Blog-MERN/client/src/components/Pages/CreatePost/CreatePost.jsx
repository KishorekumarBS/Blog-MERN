import {React,useState} from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './CreatePost.css'
import api from '../Login/api'


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

    function createnewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary',summary);
        data.set('content', content);

        ev.preventDefault();
        api.post('/post', data);
    }   
  return (
    <form onSubmit={createnewPost}>
        <input type="title" placeholder={'Title'} value={title} onChange={ev=>setTitle(ev.target.value)}/>
        <input type="summary" placeholder={'Summary'} value={summary} onChange={ev=>setSummary(ev.target.value)}/>
        <input type="file" onChange={ev => setFiles(ev.target.files)}/>
        <ReactQuill 
            value={content} 
            onChange={ev => setContent(ev)}
            modules={modules} 
            formats={formats}
        />
        <button className="post">Create Post</button>
    </form>
  )
}

export default CreatePost