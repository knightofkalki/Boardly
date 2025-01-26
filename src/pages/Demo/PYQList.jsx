import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiLock, FiEye, FiSearch } from "react-icons/fi";
import { FaCirclePlay } from "react-icons/fa6";
import { OutlineButton } from '../../components/ui/OutlineButton';

export default function PYQList() {
  const [pyqData, setPyqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { subject } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const currentYear = 2024;
        const years = Array.from({ length: 12 }, (_, i) => currentYear - i);
        const userClass = window.location.pathname.split('/')[2];

        const mappedData = years.map(year => ({
          id: year.toString(),
          title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} ${year} PYQ`,
          difficulty: "Medium",
          hasTopperSolution: year === currentYear,
          hasVideoSolution: year === currentYear,
          videoUrl: year === currentYear ? `/demo/${userClass}/${subject}/topper-solution` : null,
          tag: year === currentYear ? "Free" : "Locked",
        }));

        setPyqData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subject]);

  const handleAttemptClick = (item) => {
    if (item.tag === "Free") {
      const userClass = window.location.pathname.split('/')[2];
      navigate(`/demo/${userClass}/${subject}/pyq`);
    } else {
      alert("Please create an account to access this content.");
    }
  };

  const handleVideoClick = (item) => {
    if (item.tag === "Free") {
      navigate(item.videoUrl);
    } else {
      alert("Please create an account to access this content.");
    }
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
          onClick={() => navigate(`/subjects`)}
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

      <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
        <div className="col-span-2">Title</div>
        <div>Attempt</div>
        <div>Topper Solution</div>
        <div>Video Solution</div>
        <div>Status</div>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-[65vh] mt-2">
        {loading ? (
          <div className="text-center py-6">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (filteredData.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm">
            <div className="grid grid-cols-6 gap-4 items-center px-4 py-3">
              <div className="col-span-2">
                <span className="font-medium text-gray-900">{item.title}</span>
              </div>
              <div>
                <OutlineButton
                  variant={item.tag === "Free" ? "green" : "gray"}
                  onClick={() => handleAttemptClick(item)}
                >
                  {item.tag === "Free" ? "Attempt" : <FiLock />}
                </OutlineButton>
              </div>
              <div className="flex justify-center">
                {item.hasTopperSolution ? (
                  <button
                    onClick={() => handleAttemptClick(item)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="View Topper Solution"
                  >
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                ) : (
                  <FiLock className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="flex justify-center">
                {item.hasVideoSolution ? (
                  <button
                    onClick={() => handleVideoClick(item)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Watch Video Solution"
                  >
                    <FaCirclePlay className="h-5 w-5 text-orange-500 hover:text-orange-600" />
                  </button>
                ) : (
                  <FiLock className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="text-sm text-gray-700">
                {item.tag}
              </div>
            </div>
          </div>
        ))
        )}
      </div>
    </div>
  );
}
