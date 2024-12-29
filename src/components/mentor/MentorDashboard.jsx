import { API_URL } from '../../shared/api';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const MentorDashboard = () => {
    const { currentUser } = useAuth();
    const [slotDate, setSlotDate] = useState('');
    const [slotTime, setSlotTime] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [slots, setSlots] = useState([]);

    const addSlot = async () => {
        const response = await fetch(`${API_URL}/slot/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                mentorId: currentUser._id,
                slotDate,
                slotTime,
            }),
        });

        if (response.ok) {
            setResponseMessage('Slot added successfully');
            fetchSlots(); // Refresh slots after adding a new one
        } else {
            setResponseMessage('Failed to add slot');
        }
    };

    const fetchSlots = async () => {
        const response = await fetch(`${API_URL}/slot/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        const mentorSlots = data.filter(slot => slot.mentorID === currentUser._id);
        setSlots(mentorSlots);
    };

    useEffect(() => {
        fetchSlots();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Mentor Dashboard</h1>
            <div className="mb-4 bg-white p-4 rounded shadow-md">
                <input
                    type="text"
                    placeholder="Enter date (e.g., 2023-10-15)"
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Enter time slot (e.g., 8-9)"
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <button
                    onClick={addSlot}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
                >
                    Add Slot
                </button>
            </div>
            {responseMessage && <p className="text-red-500 mb-4">{responseMessage}</p>}
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Slots</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Time</th>
                            <th className="py-2 px-4 border-b">Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map(slot => (
                            <tr key={slot._id} className={`${slot.available ? 'bg-green-100' : 'bg-orange-100'}`}>
                                <td className="py-2 px-4 border-b">{new Date(slot.slotDate).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">{slot.slotTiming}</td>
                                <td className="py-2 px-4 border-b">{slot.available ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MentorDashboard;