import { useState } from "react";
import { API_URL } from "../../shared/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordResetRequest = async () => {
    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }

    setIsRequesting(true);
    setErrorMessage("");
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage("Check your email for the reset link.");
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Failed to send reset link.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Forgot Password</h2>

      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

      {!successMessage && (
        <>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            onClick={handlePasswordResetRequest}
            className="mt-4 w-full py-2 px-4 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 rounded-md"
            disabled={isRequesting}
          >
            {isRequesting ? "Sending Link..." : "Send Reset Link"}
          </button>
        </>
      )}
    </div>
  );
}
