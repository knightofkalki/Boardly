import { motion } from "framer-motion"
import { Megaphone, MessageCircle, Airplay } from 'lucide-react'

export default function Communities() {
  const cards = [
    {
      title: "Boardly announcements",
      description: "Get the latest on feature releases, milestones, and crucial updates.",
      icon: Megaphone,
      action: "join",
      delay: 0,
      whatsappLink: "https://chat.whatsapp.com/"
    },
    {
      title: "Boardly Discussion",
      description: "Share feedback and help us build a product that benefits everyone.",
      icon: MessageCircle,
      action: "join",
      delay: 0.2,
      whatsappLink: "https://chat.whatsapp.com/"
    },
    {
      title: "Boardly Broadcast",
      description: "Insights, Tips, and Strategies for Board Students",
      icon: Airplay,
      action: "Explore",
      delay: 0.4,
      whatsappLink: "https://chat.whatsapp.com/"
    },
  ]

  return (
    <div className="p-6 bg-[#F6F8FC] min-h-[90vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold text-gray-800 mb-8"
        >
          Community
        </motion.h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: card.delay }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-lg"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white"
              >
                <card.icon className="h-6 w-6" />
              </motion.div>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">{card.title}</h3>
              <p className="mb-8 text-gray-600">{card.description}</p>

              <motion.a
                href={card.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {card.action.charAt(0).toUpperCase() + card.action.slice(1)}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
