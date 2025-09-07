import BookCard from './BookCard';

const BookList = ({ books, onAction }) => {
    if (books.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-lg text-gray-500 mb-1">No books found</p>
                <p className="text-gray-400">Try adjusting your search criteria</p>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
                <BookCard key={book._id} book={book} onAction={onAction} />
            ))}
        </div>
    );
};

export default BookList;
