import React from 'react'
import './Post.css'

export default function Post() {
  return (
    <div className="post">
        <div className="image"><img src="https://spectrum.ieee.org/media-library/photo-of-a-bearded-man-in-glasses-blue-shirt-and-jacket.png?id=33321321&width=1400&height=1050&quality=85&coordinates=0%2C36%2C0%2C95
        " alt="post image" /></div>
        <div className='texts'>
        <h2>The EV Transition Explained </h2>
        <p className="info">
          <a href="" className="author">Kishore</a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className='summary'>A deep dive into the engineering challenges of making and supporting electric vehicles at scale</p>
        </div>
      </div>
  )
}
