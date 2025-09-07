import { Icons } from './Icons';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <div className="mt-6 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icons.Search size={20} className="text-gray-400" />
        </div>
        <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base"
        />
    </div>
);

export default SearchBar;
