import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LandingNavbar } from '../../components/Landing/LandingNavbar';
import { API_URL } from '../../shared/api';

export default function Attempt() {
  const [currentSection] = useState('A');
  const [quizSections, setQuizSections] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10800);
  const { subject } = useParams();
  const userClass = window.location.pathname.split('/')[2];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/free/year-wise-questions/${userClass}/2024`
        );

        if (response.data.success) {
          const subjectData = response.data.data.questions.subjects.find(
            (subj) => subj.subjectName.toLowerCase() === subject.toLowerCase()
          );

          if (subjectData) {
            const sections = [
              {
                id: 'A',
                title: 'Section A',
                questions: subjectData.questions.map((q) => ({
                  id: q._id,
                  text: q.question,
                  status: 'unanswered',
                  title: q.title,
                  timeRequired: q.timeRequired,
                  difficulty: q.difficulty,
                  answer: q.answer,
                  hint: q.hint,
                })),
              },
            ];

            setQuizSections(sections);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchQuestions();
  }, [subject, userClass]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      <br />
      <div className="flex flex-col md:flex-row min-h-screen relative md:px-10 lg:px-20 xl:px-40">
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
                <h2 className="mb-4 text-xl font-semibold">{question.title}</h2>
                <p className="mb-4">Time Required: {question.timeRequired} minutes</p>
                <p className="mb-4">Difficulty: {question.difficulty}</p>
                {question.text.split(', ').map((imgUrl, index) => (
                  <img key={index} src={imgUrl} alt={`Question ${index + 1}`} className="my-4 max-w-full h-auto" />
                ))}

                <div className="flex flex-wrap gap-4 mt-4">
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

        <aside className="w-full md:w-64 p-6 bg-gray-50 md:sticky top-0 md:h-screen overflow-y-auto bottom-0 text-center flex flex-col items-center">
          <h3 className="font-semibold mb-4">Time Left:</h3>
          <div className="sticky w-min h-min z-10 rounded-full px-4 py-2 text-black font-extrabold text-2xl mb-2">
            {formatTime(timeLeft)}
          </div>
          {quizSections.map((section) => (
  <div key={section.id} className="mb-4">
    <h4 className="font-medium text-gray-700 mb-2">{section.title}</h4>
    <div className="grid grid-cols-5 gap-2">
      {section.questions.map((question, index) => (
        <motion.button
          key={question.id}
          onClick={() =>
            document
              .getElementById(`question-${question.id}`)
              .scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          className={`h-8 w-8 rounded-full ${
            question.status === 'answered'
              ? 'bg-green-600 text-white'
              : question.status === 'flagged'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {index + 1}
        </motion.button>
      ))}
    </div>
  </div>
))}

          <div className="mt-6 text-sm text-gray-600">
            You are using a free plan. To view papers from previous years, please{' '}
            <a href="/landing" className="text-blue-600 underline">
              create an account
            </a>.
          </div>
        </aside>
      </div>
    </div>
  );
}
