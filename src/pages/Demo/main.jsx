import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import subjectsData from '../../data/subjects.json';

export default function Demo() {
    const [questions, setQuestions] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        let year = queryParams.get('year');
        const classNumber = queryParams.get('class');

        if (!year) {
            year = 2024;
            queryParams.set('year', year);
            navigate(`?${queryParams.toString()}`);
        }

        if (classNumber) {
            fetch(`https://boardly-be.vercel.app/free/year-wise-questions/${classNumber}/${year}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setQuestions(data.data.questions.subjects);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [location.search, navigate]);

    const queryParams = new URLSearchParams(location.search);
    const classNumber = queryParams.get('class');
    const subjectFilter = queryParams.get('subject');

    const subjects = classNumber ? subjectsData[classNumber] : [];
    const filteredQuestions = subjectFilter
        ? questions.filter(subject => subject.subjectName.toLowerCase() === subjectFilter.toLowerCase())
        : questions;

    const addQuery = (key, value) => {
        queryParams.set(key, value);
        navigate(`?${queryParams.toString()}`);
    };

    if (!classNumber) {
        return (
            <div className="container mx-auto min-w-[70vw] p-6 rounded-lg bg-white">
                <div className="mb-4">
                    <h1 className="text-3xl text-orange-600 font-bold">PYQs</h1>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Please select a class to proceed:</h2>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => addQuery('class', 10)}
                    >
                        Class 10
                    </button>
                    <button
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => addQuery('class', 12)}
                    >
                        Class 12
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto min-w-[70vw] p-6 rounded-lg bg-white">
            <div className="mb-4">
                <h1 className="text-3xl text-orange-600 font-bold">PYQs</h1>
            </div>
            <div className="mb-4">

                <div className="mb-2">
                    {!queryParams.get('subject') && (
                        <>
                            {subjects.map(subject => (
                                <button
                                    key={subject.title}
                                    className="mr-2 px-4 py-2 bg-purple-500 text-white rounded"
                                    onClick={() => addQuery('subject', subject.title)}
                                >
                                    {subject.title}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            </div>
            {
                filteredQuestions.length > 0 ? (
                    filteredQuestions.map(subject => (
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
                )
            }
        </div>
    );
}