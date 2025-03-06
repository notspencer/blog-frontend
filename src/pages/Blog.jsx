import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
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
                setFilteredPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Automatically filter posts when search term changes
    useEffect(() => {
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
        setCurrentIndex(0); // Reset pagination after search
    }, [searchTerm, posts]);

    const handleClear = () => {
        setSearchTerm('');
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : filteredPosts.length - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < filteredPosts.length - 1 ? prevIndex + 1 : 0
        );
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error)
        return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold text-center mb-10">
                Explore & Inspire
            </h2>

            {/* Search Box */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-2 border-orange-500 p-2 "
                />
                <button
                    onClick={handleClear}
                    className="bg-gray-500 text-white px-6 py-2 shadow-md hover:bg-orange-600 transition-all duration-300"
                >
                    Clear
                </button>
            </div>

            {/* Blog Posts */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {filteredPosts
                    .slice(currentIndex, currentIndex + 3)
                    .map((post) => (
                        <motion.div
                            key={post.id}
                            className="bg-[#EEF0E5] p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate(`/posts/${post.id}`)}
                        >
                            {post.cover && (
                                <img
                                    src={post.cover}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            )}
                            <h3 className="text-xl font-bold mb-2">
                                {post.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                By {post.author.first_name}{' '}
                                {post.author.last_name} •{' '}
                                {new Date(post.created_at).toDateString()}
                            </p>
                            <p className="mt-3 text-gray-700 line-clamp-3">
                                {post.content}
                            </p>
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

            {/* Pagination */}
            <div className="flex items-center justify-between m-6">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`p-2 text-orange-500 ${
                        currentIndex === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-orange-500 hover:text-white'
                    }`}
                >
                    ⬅ PREVIOUS
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentIndex + 3 >= filteredPosts.length}
                    className={`p-2 text-orange-500 ${
                        currentIndex + 3 >= filteredPosts.length
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-orange-500 hover:text-white'
                    }`}
                >
                    NEXT ➡
                </button>
            </div>
        </div>
    );
};

export default Blog;
