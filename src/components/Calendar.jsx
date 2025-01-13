import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function Calendar() {
  const [activeDates, setActiveDates] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - currentDate.getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    async function fetchActiveDates() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://boardly-be.vercel.app/solve/markPaperDone`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oid: "undefined",
            subject: "undefined",
          }),
        });

        const data = await response.json();
        if (data.userData && data.userData.activeDates) {
          setActiveDates(data.userData.activeDates);
        }
      } catch (error) {
        console.error("Error fetching active dates:", error);
      }
    }

    fetchActiveDates();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] min-h-[40vh]">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-4 h-4 text-orange-500" />
        <span className="font-semibold text-sm">{currentMonth}</span>
        <span className="text-xs text-gray-500">{daysLeft} days left this month</span>
      </div>
      <div className="grid grid-cols-7 sm:grid-cols-4 xs:grid-cols-3 gap-1">
        {days.map((day) => {
          const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isActiveDate = activeDates.includes(dateString);

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: day * 0.02 }}
              whileHover={{ scale: 1.1 }}
              className={`flex items-center justify-center text-sm relative p-2 sm:p-1 rounded-md `}
            >
              {isActiveDate ? (
                <Flame className="w-5 h-5 text-orange-500" />
              ) : (
                <span className="text-gray-700">{day}</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
