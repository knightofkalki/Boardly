import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const QuestionCard = ({ question, onStatusChange, isActive, onClick, onSolutionToggle, onFlagChange, handleMarkUndone }) => {
  return (
    <motion.div
      className={`mb-6 rounded-lg border ${
        isActive ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-200"
      } bg-white p-4 shadow-sm transition-all`}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <h3 className="mb-2 text-lg font-semibold">Question {question.questionNumber}</h3>
      <p className="mb-4 text-gray-600">{question.title}</p>
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(question.questionNumber);
          }}
          className={`rounded border px-3 py-1 transition-colors ${
            question.markasdone
              ? "bg-green-500 text-white hover:bg-green-600"
              : "border-green-500 text-green-500 hover:bg-green-50"
          }`}
        >
          {question.markasdone ? "Mark as Undone" : "Mark as Done"}
        </button>
        {/* View Solution Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSolutionToggle(question.questionNumber);
          }}
          className="rounded border border-blue-500 px-3 py-1 text-blue-500 transition-colors hover:bg-blue-50"
        >
          {question.viewSolutionVisible ? "Hide Solution" : "View Solution"}
        </button>
        {/* Flag Question Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFlagChange(question.questionNumber);
          }}
          className={`rounded border px-3 py-1 transition-colors ${
            question.isFlagged
              ? "bg-red-500 text-white hover:bg-red-600"
              : "border-red-500 text-red-500 hover:bg-red-50"
          }`}
        >
          {question.isFlagged ? "Unflag" : "Flag Question"}
        </button>
      </div>
      {question.viewSolutionVisible && (
        <div className="mt-4 p-4 rounded-lg bg-gray-100 text-gray-700">
          <p>{question.viewSolution}</p>
          {question.videoSolution && (
            <a
              href={question.videoSolution}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-500 hover:underline"
            >
              Watch Video Solution
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};


const CircleCard = ({ questions, activeQuestion, onQuestionClick }) => {
  return (
    <div className="sticky top-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Questions</h2>
      <div className="grid grid-cols-6 gap-2">
        {questions.map((question) => (
          <motion.button
            key={question.questionNumber}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
              question.markasdone
                ? "bg-green-500 text-white"
                : question.isFlagged
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            } ${
              activeQuestion === question.questionNumber
                ? "ring-2 ring-blue-500 ring-offset-2"
                : ""
            }`}
            onClick={() => onQuestionClick(question.questionNumber)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {question.questionNumber}
          </motion.button>
        ))}
      </div>
      <div className="mt-4 flex flex-col space-y-2 text-sm">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-gray-200"></div>
          <span>Unanswered</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <span>Flagged</span>
        </div>
      </div>
    </div>
  );
};

export default function ChapterQuestions() {
  const { subject, chapterId } = useParams();
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState("");
  const [oid, setOid] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User token is missing.");

        const response = await fetch(
          `https://boardly-be.vercel.app/solve/chapters/${currentUser.userClass}/${subject}/${chapterId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch questions.");
        }

        const data = await response.json();
        setQuestions(
          data.questions.map((q) => ({
            ...q,
            viewSolutionVisible: false,
            isFlagged: false,
          }))
        );
        setChapter(data.chapterName);
        setOid(data._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subject, chapterId, currentUser.userClass]);

  const handleStatusChange = async (id) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("User token is missing.");
	
			const questionIndex = questions.findIndex((q) => q.questionNumber === id);
	
			const response = await fetch(
				`https://boardly-be.vercel.app/solve/markQuestionDone`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						oid: oid,
						questionIndex: questionIndex,
					}),
				}
			);
	
			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || "Failed to mark question.");
			}
	
			setQuestions((prevQuestions) =>
				prevQuestions.map((q) =>
					q.questionNumber === id
						? { ...q, markasdone: !q.markasdone }
						: q
				)
			);
		} catch (err) {
			console.error(err);
		}
	};
	

  const handleMarkUndone = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User token is missing.");

      const questionIndex = questions.findIndex((q) => q.questionNumber === id);

      console.log(oid);
      console.log(questionIndex + 1);

      const response = await fetch(
        `https://boardly-be.vercel.app/solve/markQuestionUndone`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oid: oid,
            questionIndex: questionIndex,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to mark question as undone.");
      }

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.questionNumber === id
            ? {
                ...q,
                markasdone: false,
              }
            : q
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuestionClick = (id) => {
    setActiveQuestion(id);
  };

  const handleSolutionToggle = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.questionNumber === id
          ? { ...q, viewSolutionVisible: !q.viewSolutionVisible }
          : q
      )
    );
  };

  const handleFlagChange = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.questionNumber === id
          ? { ...q, isFlagged: !q.isFlagged }
          : q
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{chapter}</h1>
        <p className="text-gray-600 text-lg">
          {subject?.charAt(0).toUpperCase() + subject?.slice(1)} • Chapter {chapterId}
        </p>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading questions...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
          <div className="space-y-6">
            {questions.map((question) => (
              <QuestionCard
                key={question.questionNumber}
                question={question}
                onStatusChange={handleStatusChange}
                onSolutionToggle={handleSolutionToggle}
                onFlagChange={handleFlagChange}
                isActive={activeQuestion === question.questionNumber}
                onClick={() => handleQuestionClick(question.questionNumber)}
                handleMarkUndone={handleMarkUndone}
              />
            ))}
          </div>
          <CircleCard
            questions={questions}
            activeQuestion={activeQuestion}
            onQuestionClick={handleQuestionClick}
          />
        </div>
      )}
    </div>
  );
}
