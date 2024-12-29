import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import PlansPopup from '../components/PlansPopup';

export default function Attempt() {
  const [currentSection, setCurrentSection] = useState('A');
  const [quizSections, setQuizSections] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10800);
  const [showPlansPopup, setShowPlansPopup] = useState(false);
  const navigate = useNavigate();
  const { subject, year } = useParams();
  const { currentUser } = useAuth();
  const userClass = currentUser.userClass;
  const [oid, setOid] = useState('');
  const [submit, setSubmit] = useState(false);

  const timerKey = `${subject}-${year}-timer`;
  const sectionsKey = `${subject}-${year}-sections`;

  const markQuestionAsDone = async (oid, subject, questionIndex) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://boardly-be.vercel.app/solve/markYearQuestionDone',
        { oid, subject, questionIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error marking question as done:', error.message);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://boardly-be.vercel.app/solve/yearwise/${userClass}/${year}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          const subjectData = response.data.data.questions.subjects.find(
            (subj) => subj.subjectName.toLowerCase() === subject.toLowerCase()
          );

          setOid(response.data.data.questions._id);

          if (subjectData) {
            const sections = [
              {
                id: 'A',
                title: 'Section A',
                questions: subjectData.questions.map((q, i) => ({
                  id: i + 1,
                  text: q.question,
                  status: 'unanswered',
                })),
              },
            ];

            setQuizSections(sections);
            localStorage.setItem(sectionsKey, JSON.stringify(sections));
          }
        }
      } catch (error) {
        console.error(error.message);
        if (error.message.includes('403')) {
          setShowPlansPopup(true);
        }
      }
    };

    const submitExam = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          `https://boardly-be.vercel.app/solve/markPaperDone`,
          { oid: year, subject },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        localStorage.removeItem(timerKey);
        localStorage.removeItem(sectionsKey);
      }
    };

    if (submit) {
      submitExam();
    } else {
      const storedTimer = localStorage.getItem(timerKey);
      const storedSections = localStorage.getItem(sectionsKey);

      if (storedTimer) setTimeLeft(Number(storedTimer));
      if (storedSections) {
        setQuizSections(JSON.parse(storedSections));
      } else {
        fetchQuestions();
      }
    }
  }, [subject, year, userClass, submit, sectionsKey, timerKey]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        const newTime = prev - 1;
        localStorage.setItem(timerKey, newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerKey]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateQuestionStatus = (questionId, status) => {
    setQuizSections((prev) =>
      prev.map((section) =>
        section.id === currentSection
          ? {
            ...section,
            questions: section.questions.map((q) =>
              q.id === questionId ? { ...q, status } : q
            ),
          }
          : section
      )
    );

    const updatedSections = quizSections.map((section) => {
      if (section.id === currentSection) {
        return {
          ...section,
          questions: section.questions.map((q) =>
            q.id === questionId ? { ...q, status } : q
          ),
        };
      }
      return section;
    });

    localStorage.setItem(sectionsKey, JSON.stringify(updatedSections));

    if (status === 'answered') {
      markQuestionAsDone(year, subject, questionId);
    }
  };

  const handleFinalSubmit = () => {
    setSubmit(true);
    navigate(`/subject/${subject}/pyq`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative md:px-10 lg:px-20 xl:px-40">
      {showPlansPopup && <PlansPopup onClose={() => setShowPlansPopup(false)} />}

      <main className="flex-1 p-6 overflow-y-auto">
        {quizSections
          .find((s) => s.id === currentSection)
          ?.questions.map((question) => (
            <motion.div
              id={`question-${question.id}`}
              key={question.id}
              className="rounded-lg bg-white p-6 shadow-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-4 text-xl font-semibold">Question {question.id}</h2>
              <div className="mb-6">
                <p>{question.text.split(/ *\([A-D]\)/)[0]}</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {question.text
                    .match(/\(\w\)\s[^()]+/g)
                    ?.map((option, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left bg-gray-100 px-4 py-2 border rounded-md"
                        disabled
                      >
                        {option.trim()}
                      </button>
                    ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => updateQuestionStatus(question.id, 'answered')}
                  className={`rounded-md px-8 py-2 ${question.status === 'answered'
                    ? 'bg-green-600 text-white'
                    : 'border border-green-600 text-green-600'
                    }`}
                >
                  Mark as Done
                </motion.button>
                <motion.button
                  onClick={() => updateQuestionStatus(question.id, 'flagged')}
                  className={`rounded-md px-8 py-2 ${question.status === 'flagged'
                    ? 'bg-red-600 text-white'
                    : 'border border-red-600 text-red-600'
                    }`}
                >
                  Flag Question
                </motion.button>
              </div>
            </motion.div>

          ))}
      </main>

      <aside className="w-full md:w-64 p-6 bg-gray-50 sticky top-0 md:h-screen overflow-y-auto bottom-0 text-center flex flex-col items-center">
        <h3 className="font-semibold mb-4">Time Left:</h3>
        <div className="sticky w-min h-min z-10 rounded-full px-4 py-2 text-black font-extrabold text-2xl mb-2">
          {formatTime(timeLeft)}
        </div>
        {quizSections.map((section) => (
          <div key={section.id} className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">{section.title}</h4>
            <div className="grid grid-cols-5 gap-8">
              {section.questions.map((question) => (
                <motion.button
                  key={question.id}
                  onClick={() =>
                    document
                      .getElementById(`question-${question.id}`)
                      .scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className={`h-8 w-8 rounded-full ${question.status === 'answered'
                    ? 'bg-green-600 text-white'
                    : question.status === 'flagged'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                    }`}
                >
                  {question.id}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
        <motion.button
          onClick={handleFinalSubmit}
          className="rounded-md bg-green-600 px-6 py-3 text-white shadow-lg md:bottom-8 md:right-8"
          whileHover={{ scale: 1.1 }}
        >
          Submit Exam
        </motion.button>
      </aside>
    </div>
  );
}
