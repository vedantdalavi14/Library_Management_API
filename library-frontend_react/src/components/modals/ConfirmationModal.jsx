import { Icons } from '../Icons';

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => (
    <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{ backgroundColor: 'rgba(17, 24, 39, 0.8)' }}
    >
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
            <div className="flex items-center mb-4">
                <Icons.AlertTriangle size={24} className="text-red-500 mr-3" />
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end space-x-4">
                <button 
                    onClick={onCancel} 
                    className="text-gray-800 font-bold py-2 px-4 rounded"
                    style={{ backgroundColor: '#e5e7eb' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#d1d5db'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                >
                    Cancel
                </button>
                <button 
                    onClick={onConfirm} 
                    className="text-white font-bold py-2 px-4 rounded"
                    style={{ backgroundColor: '#ef4444' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
);

export default ConfirmationModal;
