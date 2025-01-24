import { motion } from "framer-motion";
import partners from "../../data/partners.json";

export function Partners() {
  return (
    <div className="mt-12 mb-8 py-8 bg-gray-50 text-[#FF5533]">
      <h2 className="text-4xl font-semibold mb-8 text-center">Our Partners</h2>
      <div className="flex justify-center gap-12 animate-marquee-reverse">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="w-32 h-32 flex items-center justify-center p-6 rounded-full"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-16 h-16 object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

