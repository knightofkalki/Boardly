import { API_URL } from '../../shared/api';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const MentorSlotAdd = () => {
    const { currentUser } = useAuth();
    const [slotDate, setSlotDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleDateChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toISOString().slice(0, 10);
        setSlotDate(formattedDate);
    };

    useEffect(() => {
        if (startTime) {
            const hour = parseInt(startTime);
            const period = startTime.slice(-2);
            const newHour = hour === 12 ? 1 : hour + 1;
            const newPeriod = hour === 11 ? (period === 'AM' ? 'PM' : 'AM') : period;
            setEndTime(`${newHour}${newPeriod}`);
        } else {
            setEndTime('');
        }
    }, [startTime]);

    const addSlot = async () => {
        const slotTime = `${startTime.replace(/AM|PM/g, '')}-${endTime.replace(/AM|PM/g, '')}`;

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
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slotDate">
                    Select Date
                </label>
                <input
                    type="date"
                    id="slotDate"
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={handleDateChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                    Select Start Time
                </label>
                <select
                    id="startTime"
                    value={startTime}
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={(e) => setStartTime(e.target.value)}
                >
                    <option value="">Select start time</option>
                    <option value="8AM">8AM</option>
                    <option value="9AM">9AM</option>
                    <option value="10AM">10AM</option>
                    <option value="11AM">11AM</option>
                    <option value="12AM">12AM</option>
                    <option value="1AM">1AM</option>
                    <option value="2AM">2AM</option>
                    <option value="3AM">3AM</option>
                    <option value="4AM">4AM</option>
                </select>
            </div>
            {endTime && <p className="mb-4 text-gray-700">End Time: {endTime}</p>}
            <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={addSlot}
            >
                Add Slot
            </button>
            {responseMessage && <p className="mt-4 text-gray-700">{responseMessage}</p>}
        </div>
    );
};

export default MentorSlotAdd;