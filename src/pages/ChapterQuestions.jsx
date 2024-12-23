import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const chapterData = {
  physics: {
    "1": {
      title: "Electric Charges and Fields",
      questions: [
        { id: 1, content: "What is Coulomb's law and how is it mathematically expressed?", status: "unanswered" },
        { id: 2, content: "Explain the principle of superposition of electric forces.", status: "unanswered" },
        { id: 3, content: "Define electric field intensity and give its SI unit.", status: "unanswered" }
      ]
    },
    "2": {
      title: "Electrostatic Potential and Capacitance",
      questions: [
        { id: 1, content: "What is electric potential? How is it related to electric field?", status: "unanswered" },
        { id: 2, content: "Define capacitance and explain its unit.", status: "unanswered" },
        { id: 3, content: "Derive an expression for the energy stored in a capacitor.", status: "unanswered" }
      ]
    },
    "3": {
      title: "Current Electricity",
      questions: [
        { id: 1, content: "State and explain Ohm's law.", status: "unanswered" },
        { id: 2, content: "What is electrical resistivity? How does it vary with temperature?", status: "unanswered" },
        { id: 3, content: "Explain the concept of EMF and terminal potential difference.", status: "unanswered" }
      ]
    }
  },
  chemistry: {
    "1": {
      title: "Some Basic Concepts of Chemistry",
      questions: [
        { id: 1, content: "Define mole concept and explain its significance.", status: "unanswered" },
        { id: 2, content: "What are significant figures? Why are they important?", status: "unanswered" },
        { id: 3, content: "Explain the law of conservation of mass.", status: "unanswered" }
      ]
    }
   
  }
};

const QuestionCard = ({ question, onStatusChange, isActive, onClick, onSolutionToggle }) => {
  return (
    <motion.div
      className={`mb-6 rounded-lg border ${
        isActive ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-200"
      } bg-white p-4 shadow-sm transition-all`}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <h3 className="mb-2 text-lg font-semibold">Question {question.id}</h3>
      <p className="mb-4 text-gray-600">{question.content}</p>
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(question.id, question.status, "answered");
          }}
          className={`rounded border px-3 py-1 transition-colors ${
            question.status === "answered"
              ? "bg-green-500 text-white hover:bg-green-600"
              : "border-green-500 text-green-500 hover:bg-green-50"
          }`}
        >
          {question.status === "answered" ? "Unmark as Done" : "Mark as Done"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSolutionToggle(question.id);
          }}
          className="rounded border border-blue-500 px-3 py-1 text-blue-500 transition-colors hover:bg-blue-50"
        >
          {question.showSolution ? "Hide Solution" : "View Solution"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(question.id, question.status, "flagged");
          }}
          className={`rounded border px-3 py-1 transition-colors ${
            question.status === "flagged"
              ? "bg-red-500 text-white hover:bg-red-600"
              : "border-red-500 text-red-500 hover:bg-red-50"
          }`}
        >
          {question.status === "flagged" ? "Unflag" : "Flag Question"}
        </button>
      </div>
      {question.showSolution && (
        <div className="mt-4 p-4 rounded-lg bg-gray-100 text-gray-700">
          <p>Solution for this question will go here.</p>
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
            key={question.id}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
              question.status === "unanswered"
                ? "bg-gray-200"
                : question.status === "answered"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            } ${
              activeQuestion === question.id
                ? "ring-2 ring-blue-500 ring-offset-2"
                : ""
            }`}
            onClick={() => onQuestionClick(question.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {question.id}
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
  const chapterInfo = chapterData[subject?.toLowerCase()]?.[chapterId];
  
  const [questions, setQuestions] = useState(chapterInfo?.questions || []);
  const [activeQuestion, setActiveQuestion] = useState(1);

  const handleStatusChange = (id, currentStatus, targetStatus) => {
		setQuestions((prevQuestions) =>
			prevQuestions.map((q) =>
				q.id === id
					? {
							...q,
							status:
								currentStatus === targetStatus
									? "unanswered"
									: targetStatus,
						}
					: q
			)
		);
	};
	

  const handleQuestionClick = (id) => {
    setActiveQuestion(id);
  };

	const handleSolutionToggle = (id) => {
		setQuestions((prevQuestions) =>
			prevQuestions.map((q) =>
				q.id === id ? { ...q, showSolution: !q.showSolution } : q
			)
		);
	};
	

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {chapterInfo?.title || "Chapter Content"}
        </h1>
        <p className="text-gray-600 text-lg">
          {subject?.charAt(0).toUpperCase() + subject?.slice(1)} • Chapter {chapterId}
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
        <div className="space-y-6">
				{questions.map((question) => (
  <QuestionCard
    key={question.id}
    question={question}
    onStatusChange={handleStatusChange}
    onSolutionToggle={handleSolutionToggle}
    isActive={activeQuestion === question.id}
    onClick={() => handleQuestionClick(question.id)}
  />
))}

        </div>
        <CircleCard
          questions={questions}
          activeQuestion={activeQuestion}
          onQuestionClick={handleQuestionClick}
        />
      </div>
    </div>
  );
}
