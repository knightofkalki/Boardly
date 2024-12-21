import { motion } from 'framer-motion';
import { SubjectCircle } from './SubjectCircle';

const currentDate = new Date();
const progressData = [
  { date: currentDate.getDate(), value: 85 },
  { date: currentDate.getDate() - 1, value: 65 },
  { date: currentDate.getDate() - 2, value: 75 },
  { date: currentDate.getDate() - 3, value: 90 },
  { date: currentDate.getDate() - 4, value: 55 },
  { date: currentDate.getDate() - 5, value: 70 },
  { date: currentDate.getDate() - 6, value: 80 },
  { date: currentDate.getDate() - 7, value: 30 },
  { date: currentDate.getDate() - 8, value: 70 },
];

const subjectData = [
  { id: 1, subject: 'Physics', fraction: '8/10' },
  { id: 2, subject: 'Maths', fraction: '3/15' },
  { id: 3, subject: 'Chemistry', fraction: '6/10' },
  { id: 4, subject: 'English', fraction: '9/10' },
  { id: 5, subject: 'Comp. Sc.', fraction: '7/10' }
];

const Progress = () => {
  const month = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{month}</h3>
          </div>
          <div className="h-40 flex items-end gap-2 relative">
            <div className="absolute bottom-5 w-full border-b-4 border-[#EC612A]"></div>
            {progressData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 group relative"
              >
                <motion.div
                  className="w-3 bg-[#EC612A] rounded-t-md group-hover:bg-orange-500 relative"
                  initial={{ height: 0 }}
                  animate={{ height: `${item.value}px` }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.1 }}
                />
                <span className="absolute -top-6 opacity-0 group-hover:opacity-100 text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
                  {item.value}%
                </span>
                <span className="text-[10px] text-gray-500 pt-2">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Progress</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {subjectData.map((item) => (
              <SubjectCircle key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
