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
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setInputValue({
      ...inputValue,
      files: file, // Update 'files' with the selected file
    });
  };
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Fetch the post information and set the initial values
    fetch(`https://blog-api-liart.vercel.app/post/${id}`)
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

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id',id)
    data.append('file', files); // Use append to add the file to the FormData

    const response=await fetch('https://blog-api-liart.vercel.app/post', {
      method: 'PUT',
      body: data, // Send the FormData with the request
      credentials:'include'
    })
    if( response.ok){
      setRedirect(true)
    }
    console.log(e.target.files)
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form encType="multipart/form-data" onSubmit={updatePost}>
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
      <input type="file" name="file" onChange={handleFileChange} />
      <Editor value={content} onChange={(content) => setInputValue({ ...inputValue, content })} />
      <button style={{ marginTop: '5px', backgroundColor: 'black' }} type="submit">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
