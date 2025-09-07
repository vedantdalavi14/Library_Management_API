import { useState } from 'react';
import { Icons } from '../Icons';
import { useAuth } from '../../context/AuthContext';

const RegisterModal = ({ onClose, onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Member');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await register(username, password, role);
        if (result.success) {
            onClose();
        } else {
            setError(result.message || 'Could not create account.');
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
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
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
                    <div className="mb-4 relative">
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
                    <div className="mb-6">
                        <p className="block text-gray-700 mb-2 text-sm">Register as:</p>
                        <div className="flex items-center justify-center gap-4">
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="Member" 
                                    checked={role === 'Member'} 
                                    onChange={() => setRole('Member')} 
                                    className="mr-2" 
                                />
                                Member
                            </label>
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="Admin" 
                                    checked={role === 'Admin'} 
                                    onChange={() => setRole('Admin')} 
                                    className="mr-2" 
                                />
                                Admin
                            </label>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full text-white font-bold py-2 px-4 rounded transition-all duration-300"
                        style={{ backgroundColor: '#4f46e5' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account? 
                    <button 
                        onClick={onSwitchToLogin} 
                        className="font-medium text-indigo-600 hover:underline ml-1"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterModal;
