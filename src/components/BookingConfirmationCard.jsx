import { motion } from "framer-motion"
import { Calendar, Clock } from 'lucide-react'

export default function BookingConfirmationCard({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="rounded-lg bg-white p-6 shadow-xl max-w-md w-full m-4"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Slot Booked</h2>
        <div className="flex items-center space-x-4">
          <img src={booking.mentor.image} alt={booking.mentor.name} className="h-16 w-16 rounded-full object-cover" />
          <div>
            <h3 className="text-lg font-semibold">Mentor session with {booking.mentor.name}</h3>
            <p className="text-gray-600">{booking.mentor.specialization}</p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="mb-2 text-lg font-semibold">Session date is:</h4>
          <div className="flex items-center space-x-4 rounded-full bg-gray-100 px-4 py-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span>{booking.time}</span>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600"
        >
          Close
        </motion.button>
      </motion.div>
    </div>
  )
}
