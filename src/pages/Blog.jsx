import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:8080/posts');

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
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
    if (error)
        return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">All Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                        onClick={() => navigate(`/posts/${post.id}`)} // On click navigate to post details page
                    >
                        {post.cover && (
                            <img
                                src={post.cover}
                                alt={post.title}
                                className="w-full h-48 object-cover rounded-md"
                            />
                        )}
                        <h3 className="text-xl font-semibold mt-4">
                            {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            By {post.author.first_name} {post.author.last_name}{' '}
                            • {new Date(post.created_at).toDateString()}
                        </p>
                        <p className="text-gray-700 mt-2 line-clamp-3">
                            {post.content}
                        </p>
                        <div className="mt-4">
                            <button
                                className="text-orange-500 font-semibold hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the parent onClick
                                    navigate(`/posts/${post.id}`); // Navigate to single post details
                                }}
                            >
                                Read More →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
