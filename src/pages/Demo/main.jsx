import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Demo() {
    const [questions, setQuestions] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const year = queryParams.get('year') || 2024;
        const classNumber = queryParams.get('class') || 10;

        fetch(`https://boardly-be.vercel.app/free/year-wise-questions/${classNumber}/${year}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setQuestions(data.data.questions.subjects);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [location.search]);

    return (
        <div className="container mx-auto min-w-[70vw] p-6 rounded-lg bg-white">
            <div className="mb-4">
                <h1 className="text-3xl text-orange-600 font-bold">PYQs</h1>
            </div>
            {questions.length > 0 ? (
                questions.map(subject => (
                    <div key={subject._id}>
                        <h2 className="text-2xl font-semibold">{subject.subjectName}</h2>
                        {subject.questions.map(question => (
                            <div key={question._id} className="mb-4">
                                <h3 className="text-xl">{question.title}</h3>
                                <img src={question.question} alt={question.title} className="mb-2" />
                                <p><strong>Answer:</strong> {question.answer}</p>
                                <p><strong>Hint:</strong> {question.hint}</p>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
}
