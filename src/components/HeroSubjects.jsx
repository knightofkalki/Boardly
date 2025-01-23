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
        <div className="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] h-full">
            <div className="flex flex-col h-full">
                <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
                <div className="flex justify-between items-end mt-auto">
                    <Button onClick={() => navigate(`/subject/${title}/pyq`)} style={{ background: "rgb(249 115 22 / var(--tw-bg-opacity, 1))" }}>
                        Select
                    </Button>
                    <div className="w-12 h-12 relative">
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
    const userClass = currentUser.userClass;

    // Define subjects based on class
    const subjects = userClass === "10"
        ? subs[10] : subs[12];

    return (
        <div className="bg-white rounded-xl h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
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