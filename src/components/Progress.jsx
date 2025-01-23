import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SubjectCircle } from './SubjectCircle';
import subs from "../data/subjects.json";
import { API_URL } from "../shared/api";

const Progress = () => {
  const { currentUser } = useAuth();
  const userClass = currentUser.userClass;
  const subjects = userClass === "10" ? subs[10] : subs[12];

  const [subjectData, setSubjectData] = useState(subjects.map(subject => ({
    ...subject,
    fraction: '0/10'
  })));

  useEffect(() => {
    async function fetchPapersAttempted() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/solve/markPaperDone`, {
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
          const updatedSubjectData = subjects.map((subject) => {
            const count = papersAttempted.filter((paper) => {
              const year = parseInt(paper.substring(0, 4)); // Extract the first 4 characters as a number
              return paper.includes(subject.title) &&
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
  }, [subjects]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] h-full">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Progress</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {subjectData.map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <SubjectCircle {...item} />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;