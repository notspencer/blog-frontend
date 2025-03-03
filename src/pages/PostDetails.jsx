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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="mt-2">{post.content}</p>
      <div className="mt-4 space-x-2">
        <button onClick={handleUpdate} className="bg-yellow-500 text-white p-2 rounded">Update</button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default PostDetails;
