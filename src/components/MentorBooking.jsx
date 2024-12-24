import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star } from 'lucide-react'
import BookingConfirmationCard from './BookingConfirmationCard'

export default function MentorBooking() {
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [showSlots, setShowSlots] = useState(false)

  const mentors = [
    {
      id: 1,
      name: "KUNAL RAI",
      image: "",
      rating: 3,
      specialization: "Mathematics",
      successRate: "98% to board",
      subject: "Specialist"
    },
    {
      id: 2,
      name: "Joshva devdas T",
      image: "",
      rating: 4,
      specialization: "Mathematics",
      successRate: "98% to board",
      subject: "Specialist"
    },
    {
      id: 3,
      name: "Lavanya K",
      image: "",
      rating: 3,
      specialization: "Biology",
      successRate: "97.5% to board",
      subject: "Specialist"
    },
    {
      id: 4,
      name: "Padma Priya R",
      image: "",
      rating: 4,
      specialization: "Mathematics",
      successRate: "94.32% to board",
      subject: "Specialist"
    },
  ]

  const days = [
    { name: "Monday", date: "Aug 28", slots: generateTimeSlots() },
    { name: "Tuesday", date: "Sept 1", slots: generateTimeSlots() },
    { name: "Wednesday", date: "Sept 2", slots: generateTimeSlots() },
    { name: "Thursday", date: "Sept 3", slots: generateTimeSlots() },
    { name: "Friday", date: "Sept 4", slots: generateTimeSlots() },
    { name: "Saturday", date: "Sept 5", slots: generateTimeSlots() },
    { name: "Sunday", date: "Sept 6", slots: generateTimeSlots() },
  ]

  function generateTimeSlots() {
    return [
      { time: "08:00 AM", available: true },
      { time: "08:30 AM", available: false },
      { time: "09:00 AM", available: true },
      { time: "09:30 AM", available: true },
      { time: "10:00 AM", available: false },
      { time: "10:30 AM", available: true },
      { time: "11:00 AM", available: true },
    ]
  }

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBook = () => {
    if (selectedSlot !== null) {
      const selectedMentorData = mentors.find(m => m.id === selectedMentor) || { name: "Any Mentor" }

      const [day, time] = selectedSlot.split(' ')
      setBookingDetails({
        mentor: {
          name: selectedMentorData.name,
          image: selectedMentorData.image || "",
          specialization: selectedMentorData.specialization || "Any"
        },
        date: day,
        time: time
      })
      setShowConfirmation(true)
    } else {
      alert("Please select a time slot")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header and Search */}
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

        {/* Mentors List */}
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {filteredMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className={`flex min-w-[240px] flex-col items-center rounded-lg border p-4 ${
                  selectedMentor === mentor.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={mentor.image}
                  alt={mentor.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <h3 className="mt-2 font-semibold">{mentor.name}</h3>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < mentor.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{mentor.specialization}</p>
                <p className="text-xs text-gray-500">{mentor.subject}</p>
                <p className="text-xs text-gray-500">{mentor.successRate}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {setSelectedMentor(mentor.id)
										setShowSlots(true)
									}}
                  className={`mt-4 w-full rounded-full px-4 py-2 text-sm font-medium ${
                    selectedMentor === mentor.id
                      ? "bg-orange-500 text-white"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  Select
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Any Mentor Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedMentor(null)
              setShowSlots(true)
            }}
            className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            Any Mentor
          </motion.button>
        </div>

        {/* Slots Section */}
        {showSlots && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Available Slots</h2>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-7 gap-4">
                  {days.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="text-center">
                        <p className="font-medium">{day.name}</p>
                        <p className="text-sm text-gray-500">{day.date}</p>
                      </div>
                      <div className="space-y-2">
                        {day.slots.map((slot, slotIndex) => (
                          <motion.button
                            key={slotIndex}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => slot.available && setSelectedSlot(`${day.name} ${slot.time}`)}
                            disabled={!slot.available}
                            className={`w-full rounded-lg px-2 py-1 text-sm ${
                              selectedSlot === `${day.name} ${slot.time}`
                                ? "bg-orange-500 text-white"
                                : slot.available
                                ? "bg-orange-100 text-orange-600"
                                : "cursor-not-allowed bg-gray-100 text-gray-400"
                            }`}
                          >
                            {slot.time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Book Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBook}
          disabled={selectedSlot === null}
          className={`w-full rounded-lg py-3 text-center font-medium ${
            selectedSlot !== null
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "cursor-not-allowed bg-gray-200 text-gray-500"
          }`}
        >
          Book
        </motion.button>
      </div>
      
      {showConfirmation && (
        <BookingConfirmationCard
          booking={bookingDetails}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  )
}
