import React, { useEffect,useState } from 'react'
import Post from '../Post'

const IndexPage = () => {
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    fetch('http://localhost:4000/post').then(response =>{
      response.json().then(posts =>{
       setPosts(posts)
      })
    })
  },[])
  if(posts.length == 0){
   return  <h1>Create new Post</h1>
  }
  return (
    <>
   
    {posts.length > 0 && posts.map((post) => (
  <Post key={post.id} {...post} />
))}

    </>
  )
}

export default IndexPage