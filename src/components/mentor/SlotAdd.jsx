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
    const [loading, setLoading] = useState(false);

    const handleDateChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toISOString().slice(0, 10);
        setSlotDate(formattedDate);
    };

    useEffect(() => {
        if (startTime) {
            const hour = parseInt(startTime);
            const newHour = (hour + 1) % 24;
            setEndTime(newHour.toString().padStart(2, '0'));
        } else {
            setEndTime('');
        }
    }, [startTime]);

    const addSlot = async () => {
        setLoading(true);
        const slotTime = `${startTime}-${endTime}`;

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
        setLoading(false);
    };

    const isFormValid = slotDate && startTime;

    const convertTo12HourFormat = (time) => {
        const hour = parseInt(time);
        const period = hour >= 12 ? 'PM' : 'AM';
        const adjustedHour = hour % 12 || 12;
        return `${adjustedHour}:00 ${period}`;
    };

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
                    <option value="08">08:00 AM</option>
                    <option value="09">09:00 AM</option>
                    <option value="10">10:00 AM</option>
                    <option value="11">11:00 AM</option>
                    <option value="12">12:00 PM</option>
                    <option value="13">01:00 PM</option>
                    <option value="14">02:00 PM</option>
                    <option value="15">03:00 PM</option>
                    <option value="16">04:00 PM</option>
                </select>
            </div>
            {endTime && <p className="mb-4 text-gray-700">End Time: {convertTo12HourFormat(endTime)}</p>}
            <button
                className={`w-full py-2 rounded-md transition-colors duration-300 ${isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={addSlot}
                disabled={!isFormValid || loading}
            >
                {loading ? 'Processing...' : 'Add Slot'}
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
