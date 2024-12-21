import { motion } from 'framer-motion';

export const SubjectCircle = ({ subject, fraction, date }) => {
  const [numerator, denominator] = fraction.split('/').map(Number);
  const progress = Math.round((numerator / denominator) * 100);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-16 h-16">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#fde8e8"
            strokeWidth="3"
          />
          <motion.path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: `${progress}, 100` }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {fraction}
        </div>
      </div>
      <span className="mt-2 text-md text-gray-600">{subject}</span>
    </motion.div>
  );
};
