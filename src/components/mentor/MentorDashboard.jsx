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
            {responseMessage && <p>{responseMessage}</p>}
            <h2>Your Slots</h2>
            <ul>
                {slots.map(slot => (
                    <li key={slot._id}>
                        Date: {new Date(slot.slotDate).toLocaleDateString()}, Time: {slot.slotTiming}, Available: {slot.available ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MentorDashboard;