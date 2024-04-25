/* eslint-disable no-constant-condition */
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const queryParams = window.location.search.slice(1);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    console.log("User ID:", id);
    console.log("Token:", queryParams);
    try {
      const response = await fetch(`http://localhost:5000/reset/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${queryParams}`,
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        toast.success("Password reset successfully");
        navigate("/login");
      } else if (response.status === 401 || 402) {
        toast.error(
          "Duration for password change has expired. Please request another email"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-600 h-screen flex items-center justify-center">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="mb-4 flex items-center text-blue-800">
          <BsFillShieldLockFill />
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium"
          >
            New Password
          </label>
        </div>
        <input
          type="password"
          id="password"
          name={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter New Password"
          className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
        />
        <div className="mb-4 flex items-center text-blue-800">
          <BsFillShieldLockFill />
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-medium"
          >
            Confirm Password
          </label>
        </div>
        <input
          type="password"
          id="confirmPassword"
          name={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
        />
         {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
        <button
          onClick={handleReset}
          className="bg-blue-500 flex items-center justify-center text-white py-2 px-4 mt-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {loading && (
            <CgSpinner size={30} className="ml-5  animate-spin" />
          )}
          Reset Password
        </button>
      </div>
    </div>
  );
}
