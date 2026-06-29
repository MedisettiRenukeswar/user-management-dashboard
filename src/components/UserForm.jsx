import { useEffect } from "react";
import { useForm } from "react-hook-form";

function UserForm({ editingUser, onAdd, onEdit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Populate form when editing an existing user
  useEffect(() => {
    if (editingUser) {
      reset({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        email: editingUser.email,
        department: editingUser.department,
      });
    } else {
      reset({ firstName: "", lastName: "", email: "", department: "" });
    }
  }, [editingUser, reset]);

  const onSubmit = (data) => {
    if (editingUser) {
      onEdit({ ...editingUser, ...data });
    } else {
      onAdd(data);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h2 className="text-sm font-semibold text-slate-700 mb-4">
        {editingUser ? "✏️ Edit User" : "➕ Add New User"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Ravi"
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 2, message: "At least 2 characters" },
              })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                errors.firstName
                  ? "border-red-400 focus:ring-red-200"
                  : "border-slate-200 focus:ring-indigo-300 focus:border-indigo-400"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Kumar"
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 2, message: "At least 2 characters" },
              })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                errors.lastName
                  ? "border-red-400 focus:ring-red-200"
                  : "border-slate-200 focus:ring-indigo-300 focus:border-indigo-400"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. ravi@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? "border-red-400 focus:ring-red-200"
                  : "border-slate-200 focus:ring-indigo-300 focus:border-indigo-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Engineering"
              {...register("department", {
                required: "Department is required",
              })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                errors.department
                  ? "border-red-400 focus:ring-red-200"
                  : "border-slate-200 focus:ring-indigo-300 focus:border-indigo-400"
              }`}
            />
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            {isSubmitting ? "Saving…" : editingUser ? "Update User" : "Add User"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
