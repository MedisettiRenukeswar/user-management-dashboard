/**
 * Maps JSONPlaceholder user objects to the shape
 * used throughout the app: { id, firstName, lastName, email, department }
 */
export const transformUsers = (users) => {
  return users.map((user) => {
    const parts = user.name.trim().split(" ");
    return {
      id: user.id,
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
      email: user.email,
      department: user.company?.name || "N/A",
    };
  });
};
