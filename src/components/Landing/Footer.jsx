import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
  }

  return (
    <footer className="relative bg-gray-100">
      <div className="absolute top-0 left-0 w-full overflow-hidden hidden md:block" style={{ transform: 'translateY(-98%)' }}>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[100px]"
          fill="rgb(243 244 246)"
        >
          <path 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-gray-600" />
              <div>
                <h3 className="font-medium">Address:</h3>
                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 mt-1 flex-shrink-0 text-gray-600" />
              <div>
                <h3 className="font-medium">Tel:</h3>
                <p className="text-gray-600 text-sm">7010983891</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-1 flex-shrink-0 text-gray-600" />
              <div>
                <h3 className="font-medium">Response hours:</h3>
                <p className="text-gray-600 text-sm">9 AM to 5 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-gray-600" />
              <div>
                <h3 className="font-medium">Email:</h3>
                <p className="text-gray-600 text-sm">info.boardly@gmail.com</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:pl-8"
          >
            <h2 className="text-lg font-semibold mb-6">Useful Links</h2>
            <ul className="space-y-3">
              {['CBSE CLASS 10', 'CBSE CLASS 12', 'Mentorship', 'Evaluation'].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-gray-600 hover:text-[#FF5533] transition-colors text-sm inline-block"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:pl-8"
          >
            <h2 className="text-lg font-semibold mb-6">Links</h2>
            <ul className="space-y-3">
              {['About us', 'Contact us'].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-gray-600 hover:text-[#FF5533] transition-colors text-sm inline-block"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <h2 className="text-lg font-semibold mb-6">Sign up for Our NewsLetter</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto bg-[#4F46E5] text-white px-8 py-2.5 rounded-lg hover:bg-[#4338CA] transition-colors"
                type="submit"
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
