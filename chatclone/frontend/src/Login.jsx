import { useState } from "react";
import { loginUser } from "./api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser({ username, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/chat", { replace: true });
      } else {
        alert("Login failed. Check your username and password.");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
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
        onSubmit={handleLogin}
      >
        <h2 className="text-xl mb-4">Login</h2>

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-2 text-sm">
          No account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}
