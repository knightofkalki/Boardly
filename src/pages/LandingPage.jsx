import { LandingNavbar } from '../components/Landing/LandingNavbar'
import Hero from '../components/Landing/Hero'
import Pricing from '../components/Landing/Pricing'
import PerksSection from '../components/Landing/PerksSection'
import Testimonials from '../components/Landing/Testimonials'
import CTA from '../components/Landing/CTA'
import Footer from '../components/Landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      <Hero />
      <Pricing />
      <PerksSection />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
