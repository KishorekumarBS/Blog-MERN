import React from 'react'
import './Post.css'
import {formatISO9075} from 'date-fns';

export default function Post({title, summary, cover, content, createdAt}) {
  return (
    <div className="post">
        <div className="image"><img src="https://spectrum.ieee.org/media-library/photo-of-a-bearded-man-in-glasses-blue-shirt-and-jacket.png?id=33321321&width=1400&height=1050&quality=85&coordinates=0%2C36%2C0%2C95
        " alt="post image" /></div>
        <div className='texts'>
        <h2>{title}</h2>
        <p className="info">
          <a href="" className="author">Kishore</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className='summary'>{summary}</p>
        </div>
      </div>
  )
}
