import { useAuth } from '../context/AuthContext';

const BookCard = ({ book, onAction }) => {
    const { user } = useAuth();
    const isBorrowedByCurrentUser = user && book.borrowedBy === user.id;

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-4">by {book.author}</p>
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded ${
                    book.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : (isBorrowedByCurrentUser ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800')
                }`}>
                    {book.isAvailable ? 'Available' : (isBorrowedByCurrentUser ? 'Borrowed by you' : 'Borrowed')}
                </span>
            </div>
            <div className="p-6 pt-0">
                {book.isAvailable ? (
                    <button 
                        onClick={() => onAction(book._id, 'borrow')}
                        className="w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors text-white"
                        style={{ backgroundColor: '#4f46e5' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                    >
                        Borrow
                    </button>
                ) : isBorrowedByCurrentUser ? (
                    <button 
                        onClick={() => onAction(book._id, 'return')}
                        className="w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors text-white"
                        style={{ backgroundColor: '#4b5563' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#374151'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#4b5563'}
                    >
                        Return
                    </button>
                ) : (
                    <button 
                        disabled
                        className="w-full py-2.5 px-4 rounded-lg cursor-not-allowed text-sm font-medium"
                        style={{ backgroundColor: '#d1d5db', color: '#6b7280' }}
                    >
                        Borrowed
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookCard;
