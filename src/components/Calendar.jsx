import { motion } from "framer-motion";
import { Flame } from 'lucide-react';

export function Calendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const completedDays = 5; 
  const daysLeft = daysInMonth - currentDate.getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] h-full">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-4 h-4 text-orange-500" />
        <span className="font-semibold text-sm">{currentMonth}</span>
        <span className="text-xs text-gray-500">days left: {daysLeft}</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: day * 0.02 }}
            whileHover={{ scale: 1.1 }}
            className="aspect-square flex items-center justify-center text-sm relative"
          >
            {day <= currentDate.getDate() ? (
              <Flame className="w-5 h-5 text-orange-500" />
            ) : (
              <span>{day}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
