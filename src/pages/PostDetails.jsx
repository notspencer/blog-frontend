import { useParams, useNavigate } from "react-router-dom";

const PostDetails = ({ posts, updatePost, deletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <h2 className="p-4">Post not found</h2>;
  }

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/");
  };

  const handleUpdate = () => {
    const newTitle = prompt("Enter new title:", post.title);
    const newContent = prompt("Enter new content:", post.content);
    
    if (newTitle && newContent) {
      updatePost(post.id, newTitle, newContent);
    }
  };

  return (
<div className="card bg-gray-800 shadow-xl p-4">
  <h2 className="text-2xl font-bold text-blue-400">{post.title}</h2>
  <p className="mt-2 text-gray-300">{post.content}</p>
  <div className="mt-4 space-x-2">
    <button onClick={handleUpdate} className="btn btn-warning">Update</button>
    <button onClick={handleDelete} className="btn btn-error">Delete</button>
  </div>
</div>

  );
};

export default PostDetails;
