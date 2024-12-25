import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import BookingConfirmationCard from "./BookingConfirmationCard";
import { useAuth } from '../context/AuthContext';
import { IoPersonSharp } from "react-icons/io5";
import { API_URL } from "../shared/api";

export default function MentorBooking() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showSlots, setShowSlots] = useState(false);
  const [slots, setSlots] = useState([]);
  const [mentors, setMentors] = useState([]);
  const { currentUser } = useAuth();

  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return {
      dayName: days[date.getDay()],
      dayMonth: `${date.getDate()} ${months[date.getMonth()]}`,
      fullDate: date
    };
  };

  const nextSevenDays = getNextSevenDays();

  const getUniqueTimeSlots = (slots) => {
    const times = new Set();
    slots.forEach(slot => times.add(slot.slotTiming));
    return Array.from(times).sort();
  };

  const findSlot = (date, time) => {
    return slots.find(slot => {
      const slotDate = new Date(slot.slotDate);
      return (
        slotDate.toDateString() === date.toDateString() &&
        slot.slotTiming === time &&
        slot.mentorID === selectedMentor
      );
    });
  };

  useEffect(() => {
    async function fetchSlots() {
      const response = await fetch(`${API_URL}/slot/`);
      const data = await response.json();
      setSlots(data);
    }

    async function fetchMentors() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/slot/mentors/allmentors`, {
          headers: {
            Authorization: token
          }
        });
        const mentorsData = await response.json();
        setMentors(mentorsData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    }

    fetchSlots();
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.subjectExpert.join(", ").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBook = async () => {
    if (selectedSlot !== null) {
      const selectedMentorData =
        mentors.find((m) => m._id === selectedMentor) || { name: "Any Mentor" };

      const slotData = slots.find((slot) => slot._id === selectedSlot);

      if (slotData) {
        const slotId = slotData._id;
        const userEmail = currentUser.email;

        const formData = new URLSearchParams();
        formData.append("userEmail", userEmail);
        formData.append("slotId", slotId);

        try {
          const response = await fetch(`${API_URL}/slot/book`, {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          if (response.ok) {
            const bookingResponse = await response.json();
            setBookingDetails({
              mentor: {
                name: selectedMentorData.name,
                image: selectedMentorData.profilePicture || "",
                specialization: selectedMentorData.subjectExpert?.join(", ") || "Any",
              },
              date: slotData.slotDate,
              time: slotData.slotTiming,
            });
            setShowConfirmation(true);
          } else {
            alert("Failed to book the slot");
          }
        } catch (error) {
          alert("Error occurred while booking the slot");
        }
      }
    } else {
      alert("Please select a time slot");
    }
  };

  return (
    <div className=" bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Choose mentor</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Find mentor name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {filteredMentors.map((mentor) => (
              <motion.div
                key={mentor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className={`flex min-w-[240px] flex-col items-center rounded-lg border p-4 ${selectedMentor === mentor._id ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white"
                  }`}
              >
                {mentor.image ? (
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={mentor.image}
                    alt={mentor.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <IoPersonSharp className="h-16 w-16 text-gray-400" />
                )}
                <h3 className="mt-2 font-semibold">{mentor.name}</h3>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < mentor.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{mentor.specialization}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedMentor(mentor._id);
                    setShowSlots(true);
                  }}
                  className={`mt-4 w-full rounded-full px-4 py-2 text-sm font-medium ${selectedMentor === mentor._id ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"
                    }`}
                >
                  Select
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {showSlots && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Available Slots</h2>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-7 gap-2">

                  {nextSevenDays.map((date) => {
                    const formattedDate = formatDate(date);
                    return (
                      <div key={date.toISOString()} className="font-semibold p-2 bg-gray-100 rounded-lg">
                        <div className="text-sm text-gray-600">{formattedDate.dayName}</div>
                        <div className="text-xs">{formattedDate.dayMonth}</div>
                      </div>
                    );
                  })}

                  {getUniqueTimeSlots(slots).map((time) => (
                    nextSevenDays.map((date) => {
                      const slot = findSlot(date, time);
                      return (
                        <motion.button
                          key={`${date.toISOString()}-${time}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => slot?.available && setSelectedSlot(slot._id)}
                          disabled={!slot?.available}
                          className={`p-1 rounded-lg text-sm flex flex-col items-center justify-center min-h-[40px] ${selectedSlot === slot?._id
                            ? "bg-orange-500 text-white"
                            : slot?.available
                              ? "bg-orange-100 text-orange-600"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                          <span className="font-medium">{time}</span>
                          <span className="text-xs mt-1">
                            {slot?.available ? "Available" : "Unavailable"}
                          </span>
                        </motion.button>
                      );
                    })
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBook}
          disabled={selectedSlot === null}
          className={`w-full rounded-lg py-3 text-center font-medium ${selectedSlot !== null
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : "cursor-not-allowed bg-gray-200 text-gray-500"
            }`}
        >
          Book
        </motion.button>

        {showConfirmation && (
          <BookingConfirmationCard booking={bookingDetails} onClose={() => setShowConfirmation(false)} />
        )}
      </div>
    </div>
  );
}
