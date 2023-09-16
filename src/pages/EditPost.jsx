import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';

const EditPost = () => {
  const [inputValue, setInputValue] = useState({
    title: '',
    summary: '',
    content: '',
    files: null,
  });
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Fetch the post information and set the initial values
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch post');
        }
      })
      .then((postInfo) => {
        setInputValue({
          title: postInfo.title,
          summary: postInfo.summary,
          content: postInfo.content,
          files: postInfo.files,
        });
      })
      .catch((error) => {
        console.error(error);
        // Handle error or set a flag to show an error message
      });
  }, [id]);

  const { title, summary, content ,files} = inputValue;

  const updatePost =async (e) => {
    e.preventDefault();
    // Perform the update post logic here
    
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if(files?.[0]){
        data.append('file', files?.[0]);
    }
    await fetch('http://localhost:4000/post',{
        method:'PUT',
        body:data
    })
    setRedirect(true)
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
<input
  type="text"
  name="title"
  placeholder="Title"
  value={title}
  onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
/>
<input
  type="text"
  name="summary"
  placeholder="Summary"
  value={summary}
  onChange={(e) => setInputValue({ ...inputValue, summary: e.target.value })}
/>
      <input type="file" />
      <Editor value={content} onChange={(content) => setInputValue({ ...inputValue, content })} />
      <button style={{ marginTop: '5px', backgroundColor: 'black' }} type="submit">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
