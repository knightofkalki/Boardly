import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../shared/api';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true); // Set loading to true when submitting

        try {
            const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
            setMessage('Password reset successfully. You can now log in.');
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Something went wrong. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false); // Reset loading to false after the request
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter new password"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Re-enter new password"
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {message && (
                <p className="mt-4 text-green-500 bg-green-100 border border-green-400 px-4 py-3 rounded relative">
                    {message}
                </p>
            )}
            {error && (
                <p className="mt-4 text-red-500 bg-red-100 border border-red-400 px-4 py-3 rounded relative">
                    {error}
                </p>
            )}
        </div>
    );
};

export default ResetPassword;
