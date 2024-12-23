import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';

const EventCard = ({ title, date, time }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-4 rounded-lg flex flex-col gap-2 cursor-pointer bg-white/50  hover:bg-orange-50/50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      <h3 className="font-medium text-gray-800">{title}</h3>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const UpcomingEvents = () => {
  const [showAll, setShowAll] = useState(false);

  const events = [
    { title: "Physics Live Session", date: "Oct 15", time: "10:00 AM" },
    { title: "Mock Test: Chemistry", date: "Oct 16", time: "2:30 PM" },
    { title: "Doubt Clearing Session", date: "Oct 17", time: "4:00 PM" },
    { title: "Mathematics Workshop", date: "Oct 18", time: "11:00 AM" },
    { title: "Special Guest Lecture", date: "Oct 19", time: "3:00 PM" },
    { title: "Weekly Recap Webinar", date: "Oct 20", time: "6:00 PM" },
    { title: "Physics Q&A Session", date: "Oct 21", time: "5:00 PM" },
    { title: "Group Study Meetup", date: "Oct 22", time: "7:00 PM" },
  ];

  const visibleEvents = showAll ? events : events.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="bg-white p-6 rounded-xl shadow-[2px_2px_20px_rgba(0,0,0,0.08),-1px_-1px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-shadow duration-300 ease-in-out"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-orange-500 hover:text-orange-600"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
        <div className="space-y-2">
          {visibleEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
