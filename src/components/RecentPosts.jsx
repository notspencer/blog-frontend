import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        // Sort posts by ID in descending order (assuming higher ID = most recent)
        const sortedPosts = data.sort((a, b) => b.id - a.id);

        // Get only the last 3 created posts
        setPosts(sortedPosts.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-10">
        Stay Updated: Our Latest Posts
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-[#EEF0E5] p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500">
              By Author {post.author_id} •{" "}
              {new Date(post.created_at).toDateString()}
            </p>
            <p className="mt-3 text-gray-700 line-clamp-3">{post.content}</p>
            <div className="mt-4">
              <button
                className="mt-3 px-3 py-1 text-md font-medium text-green-900 border-2 border-green-900 rounded-full hover:bg-green-900 hover:text-white transition"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/posts/${post.id}`);
                }}
              >
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecentPosts;
