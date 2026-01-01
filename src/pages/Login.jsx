import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import LoadingButton from "../components/buttons/LoadingButton";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) {
      setMessage({ type: "error", text: "❌ Username and password required" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await API.post("/user/token/", {
        username,
        password,
      });

      const { access, refresh, account_id, role } = res.data;

      // Persist auth state
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("accountId", account_id);
      localStorage.setItem("role", role);

      // Deterministic routing
      switch (role) {
        case "headmaster":
          navigate("/dashboard/headmaster");
          break;
        case "teacher":
          navigate("/dashboard/teacher");
          break;
        case "student":
          navigate("/dashboard/student");
          break;
        default:
          navigate("/profile");
      }

    } catch (err) {
      const errorMsg =
        err.response?.data?.detail ||
        "Invalid username or password";

      setMessage({ type: "error", text: `❌ ${errorMsg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Login
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold shadow-md transition flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <LoadingButton loading={loading}>Login</LoadingButton>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
