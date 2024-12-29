import { API_URL } from '../../shared/api';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const MentorSlotAdd = () => {
    const { currentUser } = useAuth();
    const [slotDate, setSlotDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

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
            setIsSuccess(true);
        } else {
            setResponseMessage('Failed to add slot');
            setIsSuccess(false);
        }
    };

    const isFormValid = slotDate && startTime;

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Mentor Slot</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slotDate">
                    Select Date
                </label>
                <input
                    type="date"
                    id="slotDate"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className={`w-full py-2 rounded-md transition-colors duration-300 ${isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={addSlot}
                disabled={!isFormValid}
            >
                Add Slot
            </button>
            {responseMessage && (
                <p className={`mt-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                    {responseMessage}
                </p>
            )}
        </div>
    );
};

export default MentorSlotAdd;