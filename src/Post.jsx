import React from 'react'

const Post = () => {
  return (
    <div className="post">
        <div className="image">
        <img src="https://techcrunch.com/wp-content/uploads/2023/07/ETH-zurich-pixar-smoke.jpg?w=1390&crop=1"/>
        </div>
        <div className="texts">
        <h2>VFX artists show that Hollywood can use AI to create, not exploit</h2>
        <p className="info">
          <a className="author">Dawid Pazeko</a>
          <time> 2023-01-06 16:45</time>
        </p>
        <p className="summary">Jio Platforms on Monday launched the AirFiber, a wireless plug-and-play 5G hotspot, as the top Indian top telecom operator races to make a dent to the broadband market.</p>
        </div>
        </div>
  )
}

export default Post