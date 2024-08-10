import React from 'react'
import ReactQuill from 'react-quill'

function Editor({value, onChange}) {
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
    
  return (
    <ReactQuill 
                value={value} 
                onChange={onChange} // Corrected to use 'value'
                modules={modules} 
                formats={formats}
     />
  )
}

export default Editor