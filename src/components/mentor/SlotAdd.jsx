import { API_URL } from '../../shared/api';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const MentorSlotAdd = () => {
    const { currentUser } = useAuth();
    const [slotDate, setSlotDate] = useState('');
    const [slotTime, setSlotTime] = useState('');
    const [setResponseMessage] = useState('');

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
        } else {
            setResponseMessage('Failed to add slot');
        }
    };

    return (
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
                className="bg-[#FF5533] text-white p-2 rounded hover:bg-[#FF5722] w-full"
            >
                Add Slot
            </button>
        </div>
    );
};

export default MentorSlotAdd;