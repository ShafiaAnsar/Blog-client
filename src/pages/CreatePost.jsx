import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

const CreatePost = () => {
  const [inputValue, setInputValue] = useState({
    title: '',
    summary: '',
    content: '',
    files: null, // Initialize 'files' as null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setInputValue({
      ...inputValue,
      files: file, // Update 'files' with the selected file
    });
  };

  const { title, summary, content, files } = inputValue;

  const createPost = async(e) => {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.append('file', files); // Use append to add the file to the FormData

    const response=await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data, // Send the FormData with the request
    })
  };

  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="summary"
        placeholder="Summary"
        value={summary}
        onChange={handleInputChange}
      />
      <input type="file" onChange={handleFileChange} />
      <ReactQuill
        value={content}
        onChange={(content) => setInputValue({ ...inputValue, content })}
        modules={modules}
        formats={formats}
      />
      <button style={{ marginTop: '5px', backgroundColor: 'black' }} type="submit">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
