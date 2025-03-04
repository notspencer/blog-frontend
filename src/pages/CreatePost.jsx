import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    // Creating a new post object
    const newPost = { id: Date.now(), title, content };
    
    // Saving it using the function received as a prop
    addPost(newPost);

    // Redirecting to the home page
    navigate("/");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
  type="text"
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="input input-bordered w-full"
/>
<textarea
  placeholder="Content"
  value={content}
  onChange={(e) => setContent(e.target.value)}
  className="textarea textarea-bordered w-full"
/>

<button type="submit" className="btn btn-primary">
  Create Post
</button>

      </form>
    </div>
  );
};

export default CreatePost;
