import { useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router
import { API_URL } from "../../shared/api";

export default function ResetPassword() {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsRequesting(true);
    setErrorMessage("");
    try {
      const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setSuccessMessage("Password reset successfully. You can now log in.");
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Failed to reset password.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Reset Password</h2>

      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

      {!successMessage && (
        <>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            onClick={handlePasswordReset}
            className="mt-4 w-full py-2 px-4 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 rounded-md"
            disabled={isRequesting}
          >
            {isRequesting ? "Resetting Password..." : "Reset Password"}
          </button>
        </>
      )}
    </div>
  );
}
