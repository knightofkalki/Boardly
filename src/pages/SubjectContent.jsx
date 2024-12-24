import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "../components/ui/Button";
import { FiUpload, FiFileText, FiBook, FiHelpCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function FeatureCard({ title, description, buttonText, icon: Icon, onClick }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] 
    transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
    hover:border-2 hover:border-[#f85c2c77]">
      <div className="flex flex-col h-full min-h-[280px]">
        <div className="text-[#3B82F6] w-12 h-12 mb-4">
          <Icon size={48} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Button className="w-full" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

function Popup({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-800">{message}</p>
        <Button className="mt-4 w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default function SubjectContent() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState(null);

  const features = [
    {
      title: "Check your solution",
      description: "Send your solution in pdf format to our toppers; they will provide scores along with detailed feedback.",
      buttonText: "Upload",
      icon: FiUpload,
      onClick: () => navigate(`/subject/${subject}/upload`),
    },
    {
      title: "PYQ",
      description: "Previous year papers",
      buttonText: "Solve",
      icon: FiFileText,
      onClick: () => navigate(`/subject/${subject}/pyq`),
    },
    {
      title: "Chapter-wise Solution",
      description: "Topic-wise question and answers",
      buttonText: "Solve",
      icon: FiBook,
      onClick: () => navigate(`/subject/${subject}/chapters`),
    },
    {
      title: "Mock Papers",
      description: "Old competence level question with latest format.",
      buttonText: "Solve",
      icon: FiHelpCircle,
      onClick: () => setPopupMessage("Coming soon on 1st Jan"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FC] p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F85B2C] to-[#e54e22] bg-clip-text text-center mb-4">
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </h1>
        <p className="text-gray-600 text-center text-lg mb-8">
          Select a feature to get started with your studies
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
      {popupMessage && (
        <Popup
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
        />
      )}
    </div>
  );
}
