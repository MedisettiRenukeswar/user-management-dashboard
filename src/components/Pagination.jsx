function Pagination({ currentPage, setCurrentPage, usersPerPage, setUsersPerPage, totalUsers }) {
  const totalPages = Math.max(1, Math.ceil(totalUsers / usersPerPage));

  const handlePerPageChange = (e) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Generate page number buttons (show up to 5 around current)
  const getPageNumbers = () => {
    const pages = [];
    const range = 2;
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    // Keep window size consistent
    if (end - start < range * 2) {
      start = Math.max(1, end - range * 2);
      end = Math.min(totalPages, start + range * 2);
    }

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3">
      {/* Left: rows per page + count */}
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <span>Rows per page:</span>
        <select
          value={usersPerPage}
          onChange={handlePerPageChange}
          className="border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <span className="text-slate-400">
          {totalUsers === 0
            ? "No results"
            : `${(currentPage - 1) * usersPerPage + 1}–${Math.min(currentPage * usersPerPage, totalUsers)} of ${totalUsers}`}
        </span>
      </div>

      {/* Right: page buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-lg text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          title="First page"
        >
          «
        </button>
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-lg text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ‹
        </button>

        {getPageNumbers().map((page, i) =>
          page === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-slate-400">…</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-lg text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ›
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-lg text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          title="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Pagination;
