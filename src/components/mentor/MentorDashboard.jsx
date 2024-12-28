import { API_URL } from '../../shared/api';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const MentorDashboard = () => {
    const { currentUser } = useAuth();
    const [slotDate, setSlotDate] = useState('');
    const [slotTime, setSlotTime] = useState('');

    const addSlot = async () => {
        const response = await fetch(`${API_URL}/slot/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mentorId: currentUser._id,
                slotDate,
                slotTime,
            }),
        });

        if (response.ok) {
            console.log('Slot added successfully');
        } else {
            console.error('Failed to add slot');
        }
    };

    return (
        <div>
            <h1>Mentor Dashboard</h1>
            <input
                type="text"
                placeholder="Enter date (e.g., 2023-10-15)"
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter time slot (e.g., 8-9)"
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
            />
            <button onClick={addSlot}>Add Slot</button>
        </div>
    );
};

export default MentorDashboard;