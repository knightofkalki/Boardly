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
        setSlots(mentorSlots);
    };

    useEffect(() => {
        fetchSlots();
    }, []);

    return (
        <div className="mb-4 bg-white p-4 rounded shadow-md">
            {responseMessage && <p className="text-red-500 mb-4">{responseMessage}</p>}
            <h2 className="text-2xl font-semibold mb-4">Your Slots</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Date</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Time</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Booked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map(slot => (
                            <tr key={slot._id} className={`${slot.available ? 'bg-orange-100' : 'bg-green-100'}`}>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{new Date(slot.slotDate).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{slot.slotTiming}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{slot.available ? 'No' : 'Yes'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MentorSlotList;