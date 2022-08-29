import { useState } from "react";
import Toggleable from "./Toggleable";
import { useRef } from "react";

const Blogform = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogFormRef = useRef();

  const newPost = (event) => {
    event.preventDefault();
    const blog = { title, author, url };
    props.submitPost(blog);
    setTitle("");
    setAuthor("");
    setUrl("");
    blogFormRef.current.toggleVisibility();
  };

  return (
    <Toggleable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={newPost}>
        <div>
          Title:
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            placeholder="Blog title..."
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            placeholder="Blog author..."
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            id="url"
            value={url}
            name="Url"
            placeholder="Blog url..."
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </Toggleable>
  );
};

export default Blogform;
