import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SubjectCircle } from './SubjectCircle';

const currentDate = new Date();

const Progress = () => {
  const [subjectData, setSubjectData] = useState([
    { id: 1, subject: 'Science', fraction: '0/10' },
    { id: 2, subject: 'Mathematics', fraction: '0/10' },
    { id: 3, subject: 'Social Science', fraction: '0/10' },
    { id: 4, subject: 'English', fraction: '0/10' },
    { id: 5, subject: 'Hindi', fraction: '0/10' },
  ]);

  useEffect(() => {
    async function fetchPapersAttempted() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://boardly-be.vercel.app/solve/markPaperDone`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oid: "undefined",
            subject: "undefined",
          }),
        });

        const data = await response.json();
        if (data.userData && data.userData.papersAttempted) {
          const papersAttempted = data.userData.papersAttempted;

          console.log(papersAttempted);

          // Update fractions for each subject
          const updatedSubjectData = subjectData.map((subject) => {
            const count = papersAttempted.filter((paper) => {
              const year = parseInt(paper.substring(0, 4)); // Extract the first 4 characters as a number
              return paper.includes(subject.subject) &&
                [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].includes(year);
            }).length;

            return {
              ...subject,
              fraction: `${count}/10`, // Total papers set to 10
            };
          });


          setSubjectData(updatedSubjectData);
        }
      } catch (error) {
        console.error("Error fetching papers attempted:", error);
      }
    }

    fetchPapersAttempted();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] h-full">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Progress</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {subjectData.map((item) => (
              <SubjectCircle key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
