
import  { useEffect, useState } from "react";
import "./App.css";

function StudentDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch users from JSONPlaceholder API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Search users by name
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <header className="header">
        <h1>Student Dashboard</h1>
        <p>Manage and view user details</p>
      </header>

      <div className="content">
        <h2>Users Information</h2>

        <input
          type="text"
          className="search"
          placeholder="Search users by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && (
          <p className="loading">Loading users...</p>
        )}

        {error && (
          <p className="error">Error: {error}</p>
        )}

        {!loading && !error && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentDashboard;
