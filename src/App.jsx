import { useEffect, useState } from "react";
import { fetchUsers, removeUser, createUser, editUser } from "./services/api";
import { transformUsers } from "./utils/helpers";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import Pagination from "./components/Pagination";

const DEPARTMENTS = ["Engineering", "HR", "Finance", "Marketing", "Sales"];

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Search & sort
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Filters
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  // ─── Data Fetching ───────────────────────────────────────────────────────────
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetchUsers();
      setUsers(transformUsers(response.data));
    } catch (err) {
      setError("Could not load users. Please check your connection and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ─── CRUD Handlers ───────────────────────────────────────────────────────────
  const handleAddUser = async (formData) => {
    try {
      const response = await createUser(formData);
      // JSONPlaceholder returns id=11 always; we use a local id to keep list unique
      const newUser = {
        ...formData,
        id: users.length + 1,
        ...response.data,
      };
      setUsers((prev) => [...prev, newUser]);
      setShowForm(false);
    } catch {
      setError("Failed to add user. Please try again.");
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      await editUser(updatedUser.id, updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setEditingUser(null);
      setShowForm(false);
    } catch {
      setError("Failed to update user. Please try again.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await removeUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      setError("Failed to delete user. Please try again.");
    }
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  // ─── Filtering / Sorting ─────────────────────────────────────────────────────
  const filteredUsers = users
    .filter((user) => {
      const haystack =
        `${user.firstName} ${user.lastName} ${user.email} ${user.department}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());

      const matchesFilters =
        user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
        user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        user.department.toLowerCase().includes(filters.department.toLowerCase());

      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      if (!sortOption) return 0;
      const [field, order] = sortOption.split("-");
      const cmp = (a[field] || "").localeCompare(b[field] || "");
      return order === "asc" ? cmp : -cmp;
    });

  // Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption, filters]);

  // Pagination slice
  const totalUsers = filteredUsers.length;
  const startIdx = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIdx, startIdx + usersPerPage);

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">User Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {totalUsers} user{totalUsers !== 1 ? "s" : ""} found
            </p>
          </div>
          <button
            onClick={() => { setEditingUser(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <span className="text-lg leading-none">+</span> Add User
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center text-sm">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 font-bold text-lg leading-none">×</button>
          </div>
        )}

        {/* Search + Sort */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {/* Filter Panel */}
        <FilterPanel filters={filters} setFilters={setFilters} />

        {/* Add / Edit Form (conditional) */}
        {showForm && (
          <UserForm
            editingUser={editingUser}
            onAdd={handleAddUser}
            onEdit={handleEditUser}
            onCancel={closeForm}
            departments={DEPARTMENTS}
          />
        )}

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <div className="inline-block w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-slate-500 mt-3 text-sm">Loading users...</p>
          </div>
        ) : (
          <UserTable
            users={currentUsers}
            onDelete={handleDeleteUser}
            onEdit={openEditForm}
          />
        )}

        {/* Pagination */}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            usersPerPage={usersPerPage}
            setUsersPerPage={setUsersPerPage}
            totalUsers={totalUsers}
          />
        )}
      </main>
    </div>
  );
}

export default App;
