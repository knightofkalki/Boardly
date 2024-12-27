import React from "react";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
export default function Report() {
    const questions = [
        {
          id: 1,
          title: "Question 1",
          marks: "7/10",
          solutionPhoto: "", 
          remarks: "This question was done very well.",
        },
        {
          id: 2,
          title: "Question 2",
          marks: "7/10",
          solutionPhoto: "", 
          remarks: "This question was done very well.",
        },
        {
          id: 3,
          title: "Question 3",
          marks: "7/10",
          solutionPhoto: "", 
          remarks: "This question was done very well.",
        },
        {
          id: 4,
          title: "Question 4",
          marks: "7/10",
          solutionPhoto: "", 
          remarks: "This question was done very well.",
        },
      ];

      const [selectedQuestion, setSelectedQuestion] = useState(null);

      const toggleQuestion = (id) => {
        setSelectedQuestion((prev) => (prev === id ? null : id));
      };
    

    const questionDetails = {
        text: `A paisa coin is made up of Al-Mg alloy and weighs 0.75g. It has a square shape, and its diagonal measures 17 mm. It is electrically neutral and contains equal amounts of positive and negative charges. Treating the paisa coin as made up of only Al, find the magnitude of the equal number of positive and negative charges. What conclusion do you draw from this magnitude?`,
        imageSrc: "solution.png",
    };

  return (
    <div className="container mx-auto min-w-[70vw] p-6 rounded-lg">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold">Evaluation Report</h1>
      </div>

      <div className="mb-4">
        <p className="p-1">
          <span className="font-bold text-gray-700">Subject Name:</span> Physics
        </p>
        <p className="p-1">
          <span className="font-bold text-gray-700">Paper Name:</span> CBSE 2021
        </p>
        <p className="p-1">
          <span className="font-bold text-gray-700">Marks Scored:</span> 53/70
        </p>
      </div>

      <div className="mb-6">
        <label htmlFor="teachersNote" className="block text-sm font-medium">
          Teacher's Note:
        </label>
        <textarea
          id="teachersNote"
          rows="4"
          placeholder="Add a note for the student..."
          className="w-full border-gray-400 mt-2 p-3 border rounded-md focus:ring-2"
        ></textarea>
      </div>

      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by no."
          className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
        />
      </div>

      <div className="space-y-4 w-full">
        {questions.map((question) => (
          <div
            key={question.id}
            className=" rounded-lg w-full items-center flex flex-col justify-center shadow-md p-4"
          >
            <div className="grid grid-cols-4 w-3/4 md:grid-cols-5 gap-4 text-xl items-center ">
              <div className="col-span-2 md:col-span-3  flex items-center">
                <span className="font-medium text-gray-900">
                  {question.title}
                </span>
              </div>
                
              <div
                className="col-span-1 md:col-span-1 cursor-pointer flex items-center"
                onClick={() => toggleQuestion(question.id)}
              >
                <FiEye className="text-gray-700 mr-2 h-6 w-6" />
              </div>
              <div className="col-span-1 text-right">
                <span className="text-gray-700">{question.marks}</span>
              </div>
            </div>

            {selectedQuestion === question.id && (
              <div className="mt-4 w-3/4 bg-gray-100 rounded-lg p-4">
                {question.solutionPhoto ? (
                  <div className="mb-4">
                    <img
                      src={question.solutionPhoto}
                      alt={`Solution for ${question.title}`}
                      className="w-full h-auto rounded-md shadow-md"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No photo available.</p>
                )}

                <p className="text-gray-700">
                  <span className="font-bold">Remarks:</span> {question.remarks}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
