import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate to navigate after successful login
import loginService from "../services/loginService";  // Import the login service


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize React Router's navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Call the login service with the email and password
      const response = await loginService.login(email, password);
      console.log(response);
      // Check the user role from the response
      if (response.userRole === "Admin") {
        navigate("/users");  // Navigate to users page if admin
      } else if (response.userRole === "Train-Editor") {
        navigate("/trains");  // Navigate to trains page if train editor
      } else {
        setError("Unauthorized user role");  // Handle any unexpected roles
      }
    } catch (err) {
      setError("Invalid email or password");  // Handle login errors
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              className="block w-full mt-1 p-2.5 border border-gray-300 rounded-lg"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="block w-full mt-1 p-2.5 border border-gray-300 rounded-lg"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
