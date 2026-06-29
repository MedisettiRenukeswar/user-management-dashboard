function SearchBar({ searchTerm, setSearchTerm, sortOption, setSortOption }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search input */}
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-slate-200 bg-white rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Sort dropdown */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border border-slate-200 bg-white rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition min-w-[170px]"
      >
        <option value="">Sort by…</option>
        <option value="firstName-asc">First Name A → Z</option>
        <option value="firstName-desc">First Name Z → A</option>
        <option value="lastName-asc">Last Name A → Z</option>
        <option value="lastName-desc">Last Name Z → A</option>
        <option value="email-asc">Email A → Z</option>
        <option value="department-asc">Department A → Z</option>
      </select>
    </div>
  );
}

export default SearchBar;
