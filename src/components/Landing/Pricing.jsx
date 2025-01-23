import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import pricingTiers from '../../data/plans.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function Pricing() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#FF5722] mb-8 sm:mb-12 md:mb-16"
        >
          Because Ordinary Prep Won't Get
          <br />
          Extraordinary Results
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
          style={{ maxWidth: "66%", margin: "auto" }}
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
            >
              {tier.isRecommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#9AE6B4] text-green-800 px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </div>
              )}

              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg">₹</span>
                  <span className="text-3xl sm:text-4xl font-bold">{tier.price}</span>
                </div>
                <p className="text-gray-600 mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 sm:gap-3">
                    {feature.available ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                    <span className="text-gray-600">
                      {feature.value && `${feature.value} `}{feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="w-full bg-black text-white rounded-lg py-2 sm:py-3 font-medium hover:bg-gray-800 transition-colors"
              >
                GO
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
