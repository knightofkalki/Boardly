import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiCircle,FiEye, FiSearch } from "react-icons/fi";
import { FaCirclePlay } from "react-icons/fa6";
import {OutlineButton} from '../components/ui/OutlineButton'
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "../shared/api";

const difficultyColors = {
  Easy: "text-green-600",
  Medium: "text-orange-500",
  Hard: "text-red-500",
};

const VideoPopup = ({ videoUrl, onClose }) => {
  const getEmbedUrl = (url) => {
    try {
      if (url.includes("youtu.be")) {
        const id = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      } else if (url.includes("youtube.com")) {
        const id = url.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
      return url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg p-4 w-full max-w-3xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-200"
        >
          Close
        </button>
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getEmbedUrl(videoUrl)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PYQList() {
  const [pyqData, setPyqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [selectedPYQ, setSelectedPYQ] = useState(null);
  const navigate = useNavigate();
  const { subject } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const userClass = user.userClass;
        setLoading(true);
        const response = await axios.get(`${API_URL}/solve/yearwise/${userClass}/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = response.data;

        const mappedData = data.questionPapers.map((paper) => ({
          id: paper.year,
          status: paper.status ? "completed" : "pending",
          title: paper.title,
          difficulty: paper.difficulty.charAt(0).toUpperCase() + paper.difficulty.slice(1),
          hasTopperSolution: Boolean(paper.topperSolution),
          hasVideoSolution: Boolean(paper.videoSolution),
          videoUrl: paper.videoSolution || null,
        }));

        setPyqData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTopperSolutionClick = (year) => {
    navigate(`/subject/${subject}/pyq/${year}/topper-solution`);
  };

  const handleVideoClick = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideo(true);
  };

  const handlePYQClick = (id) => {
    setSelectedPYQ(selectedPYQ === id ? null : id);
  };

  const filteredData = pyqData.filter((item) => {
    const matchesFilter = filter === "all" || item.difficulty.toLowerCase() === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(`/subject/${subject}`)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <FiArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </h1>
          <h2 className="text-lg text-gray-600">Previous Year Questions</h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
          <input 
            type="text"
            placeholder="Search by year" 
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-32 border rounded-lg p-2"
        >
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="hidden md:grid grid-cols-7 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
        <div>Status</div>
        <div className="col-span-2">Title</div>
        <div>Attempt</div>
        <div>Topper Solution</div>
        <div>Difficulty</div>
        <div>Video Solution</div>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-[65vh] mt-2">
        {loading? (
        <div className="text-center py-6">
          <span className="text-gray-500">Loading...</span>
        </div> 
        ) : ( filteredData.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm">
            <div className="grid grid-cols-4 md:grid-cols-7 gap-4 items-center px-4 py-3">
              <div className="flex items-center">
                {item.status === "completed" ? (
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <FiCheck className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <FiCircle className="h-6 w-6 text-gray-300" />
                )}
              </div>
              <div className="col-span-2 md:col-span-2 md:hover:cursor-default hover:cursor-pointer" onClick={()=>{handlePYQClick(item.id)}}>
                <span className="font-medium text-gray-900">
                  {subject.charAt(0).toUpperCase() + subject.slice(1)}
                </span>
                <span className="text-gray-600"> {item.title}</span>
              </div>

             <div 
                className="col-span-1 md:col-span-1 md:hidden flex items-center justify-end md:justify-between"
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: item.difficulty === "Easy" ? "green" : 
                                    item.difficulty === "Medium" ? "orange" : 
                                    "red",
                    marginRight: "8px",
                  }}
                  title={item.difficulty} // Optional tooltip for accessibility
                ></div>
              </div>

              {/* HIDDEN DIV TO ADJUST COLS FOR MOBILE VIEW */}
              <div className="md:hidden"></div>
              <div className={`md:block ${selectedPYQ===item.id? '': 'hidden'}`}>
                <OutlineButton 
                  variant="green"
                  onClick={() => navigate(`/subject/${subject}/pyq/${item.id}/attempt`)}
                >
                  Attempt
                </OutlineButton>
              </div>

              <div className={`md:flex md:justify-center  ${selectedPYQ===item.id? 'flex justify-end': 'hidden'} `}>
                <button
                  onClick={() => handleTopperSolutionClick(item.id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="View Topper Solution"
                >
                  <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            
              <div className="col-span-2 md:col-span-1 hidden md:flex items-center justify-end md:justify-between">
                <span className={`${difficultyColors[item.difficulty]} mr-2 md:mr-0`}>
                  {item.difficulty}
                </span>
              </div>
              <div className={`${selectedPYQ===item.id? 'flex justify-end': 'hidden'}  md:flex md:justify-center`}>
                {item.hasVideoSolution && (
                  <button
                    onClick={() => handleVideoClick(item.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Watch Video Solution"
                  >
                    <FaCirclePlay className="h-5 w-5 text-orange-500 hover:text-orange-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      </div>

      <AnimatePresence>
        {showVideo && (
          <VideoPopup
            videoUrl={currentVideoUrl}
            onClose={() => setShowVideo(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
