import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../shared/api';

export default function Settings() {
    const { currentUser } = useAuth();
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/user/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const userData = await response.json();
                if (response.ok) {
                    setSubscription(userData.subscription);
                } else {
                    console.error('Failed to fetch user data:', userData.error);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container mx-auto min-w-[70vw] p-6 rounded-lg">
            <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">{currentUser.type.charAt(0).toUpperCase() + currentUser.type.slice(1)} Information</h2>
                <p className="mb-2"><strong className="font-medium">Name:</strong> {currentUser.name}</p>
                <p className="mb-2"><strong className="font-medium">Email:</strong> {currentUser.email}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg shadow">
                        <p className="mb-2"><strong className="font-medium">Class:</strong> {currentUser.userClass}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg shadow">
                        <p className="mb-2"><strong className="font-medium">Institute:</strong> {currentUser.institute}</p>
                    </div>
                    <div className={`bg-red-100 p-4 rounded-lg shadow`}>
                        <p className="mb-2"><strong className="font-medium">Plan:</strong> {currentUser.plan}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}