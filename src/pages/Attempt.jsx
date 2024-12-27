import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import PlansPopup from '../components/PlansPopup'; // Make sure to import the PlansPopup component

export default function Attempt() {
  const [currentSection, setCurrentSection] = useState('A')
  const [quizSections, setQuizSections] = useState([])
  const [timeLeft, setTimeLeft] = useState(10800)
  const [showPlansPopup, setShowPlansPopup] = useState(false); // Add state for PlansPopup
  const navigate = useNavigate()
  const { subject, year } = useParams()
	const userClass = useAuth().currentUser.userClass;
	const [oid, setOid] = useState("");
	const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`https://boardly-be.vercel.app/solve/yearwise/${userClass}/${year}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.data.success) {
          const subjectData = response.data.data.questions.subjects.find(
            (subj) => subj.subjectName.toLowerCase() === subject.toLowerCase()
          )

				// console.log(response.data.data.questions._id)
				setOid(response.data.data.questions._id)

          if (subjectData) {
            setQuizSections([
              {
                id: 'A',
                title: 'Section A',
                questions: subjectData.questions.map((q, i) => ({
                  id: i + 1,
                  text: q.question,
                  status: 'unanswered'
                }))
              },
              // {
              //   id: 'B',
              //   title: 'Section B',
              //   questions: subjectData.questions.slice(5, 10).map((q, i) => ({
              //     id: i + 6,
              //     text: q.question,
              //     status: 'unanswered'
              //   }))
              // }
            ])
          }
        }
      } catch (error) {
				console.log(error.message);
        if (error.message === "Request failed with status code 403") {
					setShowPlansPopup(true);
				}
      }
    }

		const submitExam = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.post(
					`https://boardly-be.vercel.app/solve/markPaperDone`,
					{
						oid: year,
						subject: subject,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(response.data);
			} catch (error) {
				console.log(error.message);
			}
		};

		if (submit) {
			console.log(subject)
			submitExam();
		}

    fetchQuestions()
  }, [subject, year, userClass, submit])

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
    const nextSection = quizSections[quizSections.findIndex(s => s.id === currentSection) + 1]
    if (nextSection) {
      setCurrentSection(nextSection.id)
    }
  }

  const handleFinalSubmit = () => {
		setSubmit(true)
    navigate(`/subject/${subject}/pyq`)
  }

  return (
    <div className="flex  bg-white">
      {showPlansPopup && (
														<PlansPopup onClose={() => setShowPlansPopup(false)} />
												)}
      {/* <div className="absolute right-4 top-4 text-2xl font-bold text-red-500">
        {formatTime(timeLeft)}
      </div> */}
      <div className='grid grid-cols-3 md:grid-cols-5'>

      <nav className="order-2 md:order-1 col-span-1 flex w-48 flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 p-4">
        {quizSections.map((section) => (

          <motion.button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`w-full md:rounded-r-full px-6 py-3 text-left transition-colors ${
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

      <main className="order-1 md:order-2 col-span-3 flex-1 flex-grow-[1] p-6 overflow-y-auto max-h-[90vh]">
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

      <aside className="md:order-3 w-96 col-span-1 md:mt-12 p-6">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-6 flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3">
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

          {quizSections.map((section) => (
            <div key={section.id} className="mb-4">
              <h3 className="mb-2 text-sm font-medium">Section {section.id}</h3>
              <div className="grid grid-cols-8 gap-2">
                {section.questions.map((question) => (
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
            className="hidden md:block mb-3 w-full rounded-md bg-[#00A651] px-4 py-2 text-sm text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Next Section
          </motion.button>
          
          <motion.button
            onClick={handleFinalSubmit}
            className=" w-full rounded-md bg-[#00A651] px-4 py-2 text-sm text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Exam
          </motion.button>
        </div>
      </aside>
      </div>
    </div>
  )
}
