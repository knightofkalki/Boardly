import { motion } from 'framer-motion';

const TopicCard = ({ title, subject }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-4 rounded-lg flex justify-between items-center cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-orange-50/50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      <span className="text-gray-900">{title}</span>
      <span className="text-sm text-gray-500">{subject}</span>
    </motion.div>
  );
};

export const RecommendedSection = () => {
  const topics = [
    { title: 'Electric Charges and Fields', subject: 'Physics' },
    { title: 'Electromagnetic Waves', subject: 'Physics' },
    { title: 'Probability and Statistics', subject: 'Mathematics' },
    { title: 'Thermodynamics', subject: 'Chemistry' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="bg-white p-6 rounded-xl shadow-[2px_2px_20px_rgba(0,0,0,0.08),-1px_-1px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-shadow duration-300 ease-in-out"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Recommended For You</h2>
          <div className="space-x-2">
            <button className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors">
              Practice
            </button>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
              Mock Test
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <TopicCard {...topic} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
