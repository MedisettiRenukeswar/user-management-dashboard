function UserTable({ users, onDelete, onEdit }) {
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-16 text-center">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-slate-500 text-sm">No users match your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-left">
              <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide w-12">ID</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">First Name</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Last Name</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Email</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Department</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-4 py-3 text-slate-400 font-mono text-xs">{user.id}</td>
                <td className="px-4 py-3 text-slate-800 font-medium">{user.firstName}</td>
                <td className="px-4 py-3 text-slate-700">{user.lastName}</td>
                <td className="px-4 py-3 text-slate-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full">
                    {user.department}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
