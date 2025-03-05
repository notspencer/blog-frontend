import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the post by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Handle delete functionality
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      // Redirect to the main blog page after deletion
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle update functionality (navigate to a new page for updating)
  const handleUpdate = () => {
    navigate(`/posts/update/${id}`); // This should navigate to an update form
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {post && (
        <>
          <h2 className="text-3xl font-bold mb-8">{post.title}</h2>
          <div className="mb-4">
            {post.cover && (
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-64 object-cover rounded-md"
              />
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">
            By Author {post.author_id} •{" "}
            {new Date(post.created_at).toDateString()}
          </p>

          {/* Render full content */}
          <div
            className="mt-4 text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }} // Render content as HTML
          ></div>

          {/* Delete and Update buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
