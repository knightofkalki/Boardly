import { API_URL } from '../../shared/api';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const MentorSlotList = () => {
    const { currentUser } = useAuth();
    const [responseMessage] = useState('');
    const [slots, setSlots] = useState([]);

    const fetchSlots = async () => {
        const response = await fetch(`${API_URL}/slot/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        const mentorSlots = data.filter(slot => slot.mentorID === currentUser._id);

        // Group by date and sort by time
        const groupedSlots = mentorSlots.reduce((acc, slot) => {
            const date = new Date(slot.slotDate).toLocaleDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(slot);
            return acc;
        }, {});

        for (const date in groupedSlots) {
            groupedSlots[date].sort((a, b) => {
                const timeOrder = ['8-9', '9-10', '10-11', '11-12', '12-1', '1-2', '2-3', '3-4', '4-5'];
                return timeOrder.indexOf(a.slotTiming) - timeOrder.indexOf(b.slotTiming);
            });
        }

        setSlots(groupedSlots);
    };

    useEffect(() => {
        fetchSlots();
    }, []);

    const convertTo12HourFormat = (time) => {
        const [start, end] = time.split('-').map(t => parseInt(t, 10));
        const formatTime = (hour) => {
            const period = hour >= 12 ? 'PM' : 'AM';
            const adjustedHour = hour % 12 || 12;
            return `${adjustedHour} ${period}`;
        };
        return `${formatTime(start)} - ${formatTime(end)}`;
    };

    return (
        <div className="mb-4 bg-white p-4 rounded shadow-md">
            {responseMessage && <p className="text-red-500 mb-4">{responseMessage}</p>}
            <h2 className="text-2xl font-semibold mb-4">Your Slots</h2>
            <div className="overflow-x-auto">
                {Object.keys(slots).map(date => {
                    const totalSlots = slots[date].length;
                    const bookedSlots = slots[date].filter(slot => !slot.available).length;
                    return (
                        <details key={date} className="mb-4">
                            <summary className="text-xl font-semibold mb-2 cursor-pointer">
                                {date} - Total Slots: {totalSlots}, Booked Slots: {bookedSlots}
                            </summary>
                            <table className="min-w-full bg-white border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-200 text-center">Time</th>
                                        <th className="py-2 px-4 border-b border-gray-200 text-center">Booked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slots[date].map(slot => (
                                        <tr key={slot._id} className={`${slot.available ? 'bg-orange-100' : 'bg-green-100'}`}>
                                            <td className="py-2 px-4 border-b border-gray-200 text-center">{convertTo12HourFormat(slot.slotTiming)}</td>
                                            <td className="py-2 px-4 border-b border-gray-200 text-center">{slot.available ? 'No' : 'Yes'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </details>
                    );
                })}
            </div>
        </div>
    );
};

export default MentorSlotList;