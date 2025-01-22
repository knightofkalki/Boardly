import { Button } from "../components/ui/Button";
import scienceIcon from "../assets/science.svg";
import socialScienceIcon from "../assets/sst.svg";
import hindiIcon from "../assets/hindi.svg";
import physicsIcon from "../assets/physics.svg";
import chemistryIcon from "../assets/chemistry.svg";
import mathIcon from "../assets/math.svg";
import englishIcon from "../assets/english.svg";
import biologyIcon from "../assets/biology.svg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import subs from "../data/subjects.json";

const imageMap = {
  scienceIcon,
  socialScienceIcon,
  hindiIcon,
  physicsIcon,
  chemistryIcon,
  mathIcon,
  englishIcon,
  biologyIcon
};

function SubjectCard({ title, imageSrc }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:shadow-lg hover:-translate-y-1 hover:border-2 hover:border-[#f85c2c77] h-48">
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-medium text-gray-700 mb-2">{title}</h3>
        <div className="flex justify-between items-end mt-auto">
          <Button onClick={() => navigate(`/subject/${title}/pyq`)}>
            Select
          </Button>
          <div className="w-24 h-24 relative">
            <img
              src={imageMap[imageSrc]}
              alt={`${title} illustration`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Subjects() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const userClass = currentUser.userClass;

  // Define subjects based on class
  const subjects = userClass === "10"
    ? subs[10] : subs[12];

  return (
    <div className="p-6 bg-[#F6F8FC] min-h-[90vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Choose Subjects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.title}
            title={subject.title}
            imageSrc={subject.imageSrc}
          />
        ))}
      </div>
    </div>
  )
}