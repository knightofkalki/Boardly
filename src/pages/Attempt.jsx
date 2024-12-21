import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'

const sections = [
  {
    id: 'A',
    title: 'Section A',
    questions: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      text: 'A paisa coin is made up of Al-Mg alloy and weighs 0.75g. It has a square shape, and its diagonal measures 17 mm. It is electrically neutral and contains equal amounts of positive and negative charges. Treating the paisa coins made up of only Al, find the magnitude of the equal number of positive and negative charges. What conclusion do you draw from this magnitude?',
      status: 'unanswered'
    }))
  },
  {
    id: 'B',
    title: 'Section B',
    questions: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      text: 'Sample question for Section B',
      status: 'unanswered'
    }))
  },
  {
    id: 'C',
    title: 'Section C',
    questions: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      text: 'Sample question for Section C',
      status: 'unanswered'
    }))
  },
  {
    id: 'D',
    title: 'Section D',
    questions: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      text: 'Sample question for Section D',
      status: 'unanswered'
    }))
  }
]

export default function Attempt() {
  const [currentSection, setCurrentSection] = useState('A')
  const [quizSections, setQuizSections] = useState(sections)
  const [timeLeft, setTimeLeft] = useState(10800)
  const navigate = useNavigate()
  const { subject } = useParams()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const updateQuestionStatus = (questionId, status) => {
    setQuizSections((prev) =>
      prev.map((section) =>
        section.id === currentSection
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId ? { ...q, status } : q
              )
            }
          : section
      )
    )
  }

  const handleSubmitSection = () => {
    const nextSection = sections[sections.findIndex(s => s.id === currentSection) + 1]
    if (nextSection) {
      setCurrentSection(nextSection.id)
    }
  }

  const handleFinalSubmit = () => {
    navigate(`/subject/${subject}/pyq`)
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="absolute right-4 top-4 text-2xl font-bold text-red-500">
        {formatTime(timeLeft)}
      </div>

      <nav className="flex w-48 flex-col space-y-2 p-4">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`w-full rounded-r-full px-6 py-3 text-left transition-colors ${
              section.id === currentSection
                ? 'bg-[#00A651] text-white'
                : 'border border-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Section {section.id}
          </motion.button>
        ))}
      </nav>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {quizSections
            .find((s) => s.id === currentSection)
            ?.questions.map((question) => (
              <motion.div
                key={question.id}
                className="rounded-lg bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-4 text-xl">Question {question.id.toString().padStart(2, '0')}</h2>
                <p className="mb-6 text-gray-600">{question.text}</p>
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => updateQuestionStatus(question.id, 'marked')}
                    className={`rounded-md px-8 py-2 ${
                      question.status === 'marked'
                        ? 'bg-[#FF4B4B] text-white'
                        : 'border border-[#FF4B4B] text-[#FF4B4B]'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Mark
                  </motion.button>
                  <motion.button
                    onClick={() => updateQuestionStatus(question.id, 'answered')}
                    className={`rounded-md px-8 py-2 ${
                      question.status === 'answered'
                        ? 'bg-[#00A651] text-white'
                        : 'border border-[#00A651] text-[#00A651]'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Done
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </div>
      </main>

      <aside className="mt-12 w-96 p-6">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-6 flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <span className="text-sm">Not Attempted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#00A651]" />
              <span className="text-sm">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FF4B4B]" />
              <span className="text-sm">Marked</span>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.id} className="mb-4">
              <h3 className="mb-2 text-sm font-medium">Section {section.id}</h3>
              <div className="grid grid-cols-8 gap-2">
                {quizSections
                  .find((s) => s.id === section.id)
                  ?.questions.map((question) => (
                    <motion.button
                      key={question.id}
                      onClick={() => setCurrentSection(section.id)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                        question.status === 'answered'
                          ? 'border-[#00A651] bg-[#00A651] text-white'
                          : question.status === 'marked'
                          ? 'border-[#FF4B4B] bg-[#FF4B4B] text-white'
                          : 'border-gray-300 text-gray-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {question.id}
                    </motion.button>
                  ))}
              </div>
            </div>
          ))}

          <motion.button
            onClick={handleSubmitSection}
            className="mb-3 w-full rounded-md bg-[#00A651] px-4 py-2 text-sm text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Next Section
          </motion.button>
          
          <motion.button
            onClick={handleFinalSubmit}
            className="w-full rounded-md bg-[#00A651] px-4 py-2 text-sm text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Exam
          </motion.button>
        </div>
      </aside>
    </div>
  )
}