import { useEffect, useRef, useState } from 'react'
import Pyq from '../../assets/landingpyq.svg'
import Topper from '../../assets/landingtopper.svg'
import Mentor from '../../assets/landingmentor.svg'
import Eval from '../../assets/landingeval.svg'

const sections = [
  {
    tag: "Updated Questions",
    title: "10+ Year PYQ'S",
    description: "Access a comprehensive archive of past CBSE exam questions spanning over two decades. These questions have been meticulously reformatted to align with the latest CBSE exam patterns, ensuring students practice with the most relevant and updated material.",
    image: Pyq,
    icon: "📚"
  },
  {
    tag: "Solution",
    title: "Toppers Solution",
    description: "Gain insights from the best! Each question comes with detailed solutions provided by past toppers, available in both text and video formats. This dual approach ensures better conceptual clarity and understanding of the ideal way to answer questions.",
    image: Topper,
    icon: "🎯"
  },
  {
    tag: "Feedbacks",
    title: "Paper Evaluation",
    description: "Simulate the real exam experience with mock tests and get expert evaluation on your answers. Receive constructive feedback and actionable tips to improve your performance and perfect your exam strategy.",
    image: Eval,
    icon: "📝"
  },
  {
    tag: "Mentorship",
    title: "Dedicated Mentors",
    description: "Navigate your preparation journey with guidance from experts. Our mentorship programs connect you with seasoned educators and professionals who offer personalized advice, study plans, and motivation to keep you on track for success.",
    image: Mentor,
    icon: "👥"
  }
]

export default function PerksSection() {
  const [activeSection, setActiveSection] = useState(0)
  const [visibleSections, setVisibleSections] = useState(new Set([0]))
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex((ref) => ref === entry.target)
          
          setVisibleSections(prev => {
            const newSet = new Set(prev)
            if (entry.isIntersecting) {
              newSet.add(index)
              setActiveSection(index)
            } else {
              newSet.delete(index)
              if (newSet.size > 0) {
                setActiveSection(Math.max(...Array.from(newSet)))
              }
            }
            return newSet
          })
        })
      },
      {
        threshold: [0.3, 0.7], // Multiple thresholds for smoother transitions
        rootMargin: "-15% 0px -15% 0px"
      }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen bg-white">
      <h1 className="text-center text-4xl font-bold pt-20 text-[#FF5533]">
        Perks of Joining Us
      </h1>
      <div className="relative">
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="min-h-screen h-screen sticky top-0 flex items-center justify-center p-8"
          >
            <div 
              className={`max-w-6xl w-full h-[600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-in-out bg-white
                ${visibleSections.has(index)
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : index < activeSection
                    ? 'opacity-0 -translate-y-32 scale-95'
                    : 'opacity-0 translate-y-32 scale-95'
                }`}
            >
              <div className={`space-y-6 h-full flex flex-col justify-center ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-[#4F46E5] text-sm font-medium">
                  {section.tag}
                </div>
                <h2 className="text-4xl font-bold text-[#FF5533]">
                  {section.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {section.description}
                </p>
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-2xl flex items-center justify-center">
                  {section.icon}
                </div>
              </div>
              
              <div className={`h-full flex items-center ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="bg-gray-50 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300 w-full">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="rounded-xl w-full h-[400px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
