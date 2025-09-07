import { Icons } from './Icons';
import { useAuth } from '../context/AuthContext';

const Header = ({ onLoginClick, onRegisterClick, onAddBookClick, onLogoutClick }) => {
    const { user } = useAuth();
    
    return (
        <header className="bg-white shadow-sm border-b">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <Icons.BookOpen size={28} className="text-indigo-600" />
                    <span className="text-2xl font-bold text-gray-800">Digital Library</span>
                </div>
                <div className="flex items-center space-x-4">
                    {user?.role === 'Admin' && (
                        <button 
                            onClick={onAddBookClick} 
                            className="hidden sm:flex items-center gap-2 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            style={{ backgroundColor: '#4f46e5' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                        >
                            <Icons.Plus size={20} /> Add Book
                        </button>
                    )}
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={onLogoutClick} 
                                className="text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                style={{ backgroundColor: '#ef4444' }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={onLoginClick} 
                                className="text-gray-600 font-medium hover:text-indigo-600 transition-colors px-3 py-2"
                            >
                                Login
                            </button>
                            <button 
                                onClick={onRegisterClick} 
                                className="text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                style={{ backgroundColor: '#4f46e5' }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
