import { useState } from "react";
import { registerUser } from "./api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
      return;
    }

    setLoading(true);

    try {
      await registerUser({ username, password });
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !username.trim() || !password.trim() || loading;

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="border p-6 w-80"
        onSubmit={handleRegister}
      >
        <h2 className="text-xl mb-4">Register</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className={`w-full p-2 text-white ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-black"}`}
          disabled={isDisabled}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-2 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
