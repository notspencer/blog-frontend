import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [cover, setCover] = useState('');
    const [author, setAuthor] = useState('Smith Jane');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const newPost = { title, content, cover, author_id: '2' };

        try {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            navigate('/'); // Redirect to home after successful creation
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-6">Create a New Blog Post</h2>
            {error && <p className="text-red-500">Error: {error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded h-40"
                    required
                ></textarea>
                <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Author Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
