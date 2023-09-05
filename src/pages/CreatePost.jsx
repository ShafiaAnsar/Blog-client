import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [inputValue, setInputValue] = useState({
    title: '',
    summary: '',
    content: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <form>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={inputValue.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="summary"
        placeholder="Summary"
        value={inputValue.summary}
        onChange={handleInputChange}
      />
      <input type="file" />
      <ReactQuill value={inputValue.content} onChange={content => setInputValue({...inputValue, content})} />
      <button style={{ marginTop: '5px', backgroundColor: 'black' }}>
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
 