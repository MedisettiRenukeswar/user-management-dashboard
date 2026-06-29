import { useState } from "react";

function FilterPanel({ filters, setFilters }) {
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ firstName: "", lastName: "", email: "", department: "" });
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Toggle header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
      >
        <span className="flex items-center gap-2">
          <span>⚙️</span>
          Filters
          {activeCount > 0 && (
            <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </span>
        <span className="text-slate-400">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {["firstName", "lastName", "email", "department"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={filters[field]}
                onChange={handleChange}
                placeholder={`Filter by ${field === "firstName" ? "First Name" : field === "lastName" ? "Last Name" : field.charAt(0).toUpperCase() + field.slice(1)}`}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              />
            ))}
          </div>

          {activeCount > 0 && (
            <button
              onClick={clearFilters}
              className="mt-3 text-xs text-slate-500 hover:text-red-500 transition underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterPanel;
