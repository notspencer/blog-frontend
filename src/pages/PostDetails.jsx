import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecentPosts from '../components/RecentPosts';

const PostDetails = () => {
    const { id } = useParams(); // Get post ID from URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility for delete
    const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal visibility for update
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal visibility
    const [successMessage, setSuccessMessage] = useState(''); // Success message content
    const navigate = useNavigate();

    // Fetch the post by ID
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/posts/${id}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch post details');
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
        setShowDeleteModal(false); // Close the delete confirmation modal
        try {
            const response = await fetch(`http://localhost:8080/posts/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the post');
            }

            // Show success popup after deletion
            setSuccessMessage('Post deleted successfully!');
            setShowSuccessModal(true);

            // After 2 seconds, navigate to home page
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle update functionality (navigate to an update form)
    const handleUpdate = () => {
        setShowUpdateModal(false); // Close the update confirmation modal
        navigate(`/posts/update/${id}`);
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error)
        return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {post && (
                <>
                    {/* Post Title */}
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Author and Date */}
                    <p className="text-sm text-gray-500 mb-4">
                        By{' '}
                        <span className="font-medium text-gray-700">
                            {post.author.first_name} {post.author.last_name}
                        </span>{' '}
                        • {new Date(post.created_at).toDateString()}
                    </p>

                    {/* Feature Image */}
                    {post.cover && (
                        <div className="mb-6">
                            <img
                                src={post.cover}
                                alt={post.title}
                                className="w-full h-96 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    {/* Post Content */}
                    <div
                        className="prose lg:prose-xl text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>

                    {/* Delete & Update Buttons */}
                    <div className="mt-8 flex gap-4">
                        <button
                            onClick={() => setShowDeleteModal(true)} // Open the delete confirmation modal
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setShowUpdateModal(true)} // Open the update confirmation modal
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Update
                        </button>
                    </div>
                </>
            )}

            {/* Recent Posts Section with "More Articles" button */}
            <div className="mt-12 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800"></h2>
                <button
                    onClick={() => navigate('/posts')}
                    className="text-orange-500 border border-orange-500 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition"
                >
                    View All Posts →
                </button>
            </div>

            <RecentPosts />

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">
                            Confirm Deletion
                        </h3>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setShowDeleteModal(false)} // Close the modal without deleting
                                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Confirmation Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">
                            Confirm Update
                        </h3>
                        <p>Are you sure you want to update this post?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setShowUpdateModal(false)} // Close the modal without updating
                                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Yes, Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">
                            {successMessage}
                        </h3>
                        <button
                            onClick={() => setShowSuccessModal(false)} // Close the success modal
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetails;
