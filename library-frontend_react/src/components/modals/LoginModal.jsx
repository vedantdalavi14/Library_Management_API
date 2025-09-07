import { useState } from 'react';
import { Icons } from '../Icons';
import { useAuth } from '../../context/AuthContext';

const LoginModal = ({ onClose, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(username, password);
        if (result.success) {
            onClose();
        } else {
            setError(result.message || 'Invalid credentials');
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ backgroundColor: 'rgba(17, 24, 39, 0.8)' }}
        >
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back!</h2>
                {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <Icons.User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            placeholder="Username" 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="w-full p-2 pl-10 border rounded-md" 
                            required 
                        />
                    </div>
                    <div className="mb-6 relative">
                        <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            placeholder="Password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-2 pl-10 border rounded-md" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full text-white font-bold py-2 px-4 rounded transition-all duration-300"
                        style={{ backgroundColor: '#4f46e5' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account? 
                    <button 
                        onClick={onSwitchToRegister} 
                        className="font-medium text-indigo-600 hover:underline ml-1"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
