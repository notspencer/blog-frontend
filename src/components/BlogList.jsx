import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NewsletterSection from "../components/NewsletterSection";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const visiblePosts = showAll ? posts : posts.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="relative bg-white py-16 px-6 md:px-24 lg:px-18 text-center overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8">
          More Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="group cursor-pointer transition-transform transform hover:scale-105"
            >
              <a href={`/posts/${post.id}`} className="block relative">
                {post.cover && (
                  <div className="w-28 h-28 rounded-full border-4 border-orange-400 overflow-hidden mx-auto">
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                <h3 className="text-xl font-semibold text-center mt-2 group-hover:text-orange-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <div className="flex justify-center mt-2">
                  <span className="w-20 border-t-2 border-dotted border-orange-400"></span>
                </div>
              </a>
            </div>
          ))}
        </div>
        {!showAll && posts.length > 4 && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/posts")}
              className="bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              View More Posts
            </button>
          </div>
        )}
      </section>
      <NewsletterSection />;
    </div>
  );
};

export default BlogList;
