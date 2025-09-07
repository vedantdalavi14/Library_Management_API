import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CONFIG } from './config';
import { Icons } from './components/Icons';

// Components
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import ErrorToast from './components/ui/ErrorToast';

// Modals
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import AddBookModal from './components/modals/AddBookModal';
import ConfirmationModal from './components/modals/ConfirmationModal';

function AppContent() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isAddBookModalOpen, setAddBookModalOpen] = useState(false);
    const [isLogoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
    const { token, user, logout } = useAuth();

    const showError = (message) => {
        setError(message);
        setTimeout(() => setError(null), CONFIG.AUTO_DISMISS_TIMEOUT);
    };

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/books`);
            const data = await response.json();
            if (data.success) {
                setBooks(data.data.sort((a, b) => a.title.localeCompare(b.title)));
            } else {
                showError('Failed to fetch books.');
            }
        } catch (err) {
            showError('An error occurred while fetching books.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        const results = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(results);
    }, [searchTerm, books]);

    const handleBookAction = async (bookId, action) => {
        if (!token) {
            showError("You must be logged in to do that.");
            setLoginModalOpen(true);
            return;
        }
        
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/books/${bookId}/${action}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                fetchBooks();
            } else {
                showError(data.message || `Failed to ${action} book.`);
            }
        } catch (err) {
            showError(`An error occurred during the ${action} action.`);
        }
    };

    const handleAddBook = async (bookData) => {
       if (!token) {
           showError("Authentication error.");
           return { success: false, message: 'No token found' };
       }
        try {
           const response = await fetch(`${CONFIG.API_BASE_URL}/api/books`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
               body: JSON.stringify(bookData)
           });
           const data = await response.json();
            if (data.success) {
               fetchBooks();
               return { success: true };
           } else {
               return { success: false, message: data.message || 'Failed to add book.' };
           }
       } catch (err) {
           return { success: false, message: 'An error occurred while adding the book.' };
       }
   };

   const handleConfirmLogout = () => {
        logout();
        setLogoutConfirmOpen(false);
   }
   
   const switchToRegister = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
   }
   
   const switchToLogin = () => {
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
   }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header 
                onLoginClick={() => setLoginModalOpen(true)} 
                onRegisterClick={() => setRegisterModalOpen(true)}
                onAddBookClick={() => setAddBookModalOpen(true)}
                onLogoutClick={() => setLogoutConfirmOpen(true)}
            />
            
            {error && <ErrorToast message={error} onDismiss={() => setError(null)} />}
            
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white p-8 rounded-xl shadow-sm mb-8 border">
                     <div className="flex justify-between items-start">
                         <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to the Library</h1>
                            <p className="text-gray-600 text-lg">Browse, borrow, and return books with ease.</p>
                        </div>
                        {user?.role === 'Admin' && (
                             <button 
                                onClick={() => setAddBookModalOpen(true)} 
                                className="sm:hidden flex items-center justify-center p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Icons.Plus size={24} />
                            </button>
                        )}
                    </div>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>

                {loading && <p className="text-center text-gray-500">Loading books...</p>}
                
                {!loading && (
                    <BookList books={filteredBooks} onAction={handleBookAction} />
                )}
            </main>

            {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} onSwitchToRegister={switchToRegister} />}
            {isRegisterModalOpen && <RegisterModal onClose={() => setRegisterModalOpen(false)} onSwitchToLogin={switchToLogin} />}
            {isAddBookModalOpen && <AddBookModal onClose={() => setAddBookModalOpen(false)} onAddBook={handleAddBook} />}
            {isLogoutConfirmOpen && (
                <ConfirmationModal 
                    title="Confirm Logout"
                    message="Are you sure you want to log out?"
                    onConfirm={handleConfirmLogout}
                    onCancel={() => setLogoutConfirmOpen(false)}
                />
            )}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
