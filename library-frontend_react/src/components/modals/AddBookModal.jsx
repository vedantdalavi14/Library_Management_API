import { useState } from 'react';

const AddBookModal = ({ onClose, onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await onAddBook({ title, author, isbn });
        if (result.success) {
            onClose();
        } else {
            setError(result.message || 'Could not add book.');
        }
    };
    
    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ backgroundColor: 'rgba(17, 24, 39, 0.8)' }}
        >
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Add a New Book</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
                        <input 
                            id="title" 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="w-full p-2 border rounded-md" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="author">Author</label>
                        <input 
                            id="author" 
                            type="text" 
                            value={author} 
                            onChange={(e) => setAuthor(e.target.value)} 
                            className="w-full p-2 border rounded-md" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="isbn">ISBN</label>
                        <input 
                            id="isbn" 
                            type="text" 
                            value={isbn} 
                            onChange={(e) => setIsbn(e.target.value)} 
                            className="w-full p-2 border rounded-md" 
                            required 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                            type="submit" 
                            className="text-white font-bold py-2 px-4 rounded"
                            style={{ backgroundColor: '#4f46e5' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                        >
                            Add Book
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="text-gray-600 hover:text-gray-800 py-2 px-4"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;
