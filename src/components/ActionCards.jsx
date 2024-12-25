import { motion } from "framer-motion"
import { Calendar, FileText } from 'lucide-react'
import { BsBoxArrowInRight } from "react-icons/bs";

const cards = [
  {
    title: "Schedule A Session",
    description: "Schedule a class to get help from our experts",
    icon: Calendar,
    path: '/mentorship'
  },
  {
    title: "Previous Year Papers",
    description: "Explore more previous year papers",
    icon: FileText,
    path: '/schedule'
  },
]

export function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.03,
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1]
          }}
          whileHover={{
            y: -4,
            transition: {
              duration: 0.2,
              ease: "easeOut"
            }
          }}
          className="bg-white p-6 rounded-xl shadow-[2px_2px_20px_rgba(0,0,0,0.08),-1px_-1px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-shadow duration-300 ease-in-out h-full"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100/80 rounded-lg backdrop-blur-sm ring-1 ring-orange-200">
              <card.icon className="w-7 h-7 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg">{card.title}</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{card.description}</p>
            </div>
            <a
              href={card.path}
              className="w-10 h-10 text-orange-600 flex items-center justify-center"
            >
              <BsBoxArrowInRight className="w-8 h-8" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
