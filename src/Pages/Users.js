import { useState, useEffect } from 'react';
import userService from '../services/userService';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formUser, setFormUser] = useState({ username: '', password: '', role: 'User' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Show 5 users per page

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // State for the modal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await userService.getUsers();
        setUsers(userList);
      } catch (err) {
        setError('Error fetching users');
        toast.error('Failed to fetch users'); // Toast notification for fetching error
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      try {
        await userService.updateUser(selectedUserId, formUser);
        setFormUser({ username: '', password: '', role: 'User' });
        setIsEditMode(false);
        setSelectedUserId(null);
        const userList = await userService.getUsers();
        setUsers(userList);
        toast.success('User updated successfully'); // Toast notification for update success
      } catch (err) {
        setError('Error editing user');
        toast.error('Failed to update user'); // Toast notification for update error
      }
    } else {
      try {
        await userService.createUser(formUser);
        setFormUser({ username: '', password: '', role: 'User' });
        const userList = await userService.getUsers();
        setUsers(userList);
        toast.success('User added successfully'); // Toast notification for add success
      } catch (err) {
        setError('Error adding user');
        toast.error('Failed to add user'); // Toast notification for add error
      }
    }
  };

  const handleEditUser = (user) => {
    setFormUser({ username: user.username, password: '', role: user.role });
    setIsEditMode(true);
    setSelectedUserId(user._id);
  };

  // Open confirmation modal
  const openConfirmModal = (userId) => {
    setUserIdToDelete(userId);
    setIsConfirmOpen(true);
  };

  // Close confirmation modal
  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
    setUserIdToDelete(null); // Reset the user ID
  };

  // Handle delete confirmation
  const confirmDeleteUser = async () => {
    try {
      await userService.deleteUser(userIdToDelete);
      const userList = await userService.getUsers();
      setUsers(userList);
      closeConfirmModal(); // Close modal after deletion
      toast.success('User deleted successfully'); // Toast notification for delete success
    } catch (err) {
      setError('Error deleting user');
      toast.error('Failed to delete user'); // Toast notification for delete error
    }
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic based on filtered users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Form for Adding/Editing User */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit User' : 'Add New User'}</h2>

        {/* Grid layout for Username and Password */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formUser.username}
              onChange={(e) => setFormUser({ ...formUser, username: e.target.value })}
              required
            />
          </div>

          {/* Password (only shown in Add Mode) */}
          {!isEditMode && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formUser.password}
                onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                required={!isEditMode}
              />
            </div>
          )}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formUser.role}
            onChange={(e) => setFormUser({ ...formUser, role: e.target.value })}
          >
            <option value="Admin">Admin</option>
            <option value="Train-Editor">Train Editor</option>
            <option value="User">User</option>
          </select>
        </div>

        {/* Buttons */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isEditMode ? 'Update User' : 'Add User'}
        </button>
        {isEditMode && (
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded ml-4 hover:bg-gray-600"
            onClick={() => {
              setIsEditMode(false);
              setFormUser({ username: '', password: '', role: 'User' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or role..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="min-h-[300px]">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Username</th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Role</th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-sm text-gray-800">{user.username}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-800">{user.role}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-800">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openConfirmModal(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-sm text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-2"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ml-2"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this user?</p>
              <div className="mt-4 flex justify-end">
                <button onClick={confirmDeleteUser} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                  Confirm
                </button>
                <button onClick={closeConfirmModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Users;
