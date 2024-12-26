import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiChevronRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function ChapterList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { subject } = useParams();
  const { currentUser } = useAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log("Token is present in local storage:", storedToken);
    } else {
      console.log("No token found in local storage");
    }
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      setError("");
      try {
        if (!token) {
          throw new Error("User authentication token is missing.");
        }

        const response = await fetch(
          `https://boardly-be.vercel.app/solve/chapters/${currentUser.userClass}/${subject}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch chapters.");
        }

        const data = await response.json();
        setChapters(data.chapters || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [subject, currentUser.userClass, token]);

  return (
    <div className=" bg-[#F6F8FC] min-h-[90vh]">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(`/subject/${subject}`)}
            className="p-2 hover:bg-gray-100 rounded-full mr-2"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">
            {subject.charAt(0).toUpperCase() + subject.slice(1)} Chapterwise Questions
          </h1>
        </div>

        <div className="relative mb-6 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search by Chapter"
            className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading chapters...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : chapters.length > 0 ? (
          <div className="space-y-3 max-h-[75vh] overflow-y-auto">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full p-4 flex items-center justify-between text-left"
                  onClick={() => navigate(`/subject/${subject}/chapters/${chapter.chapterNumber}`)}
                >
                  <span className="text-gray-900 font-medium text-lg">
                    {chapter.chapterName}
                  </span>
                  <FiChevronRight className="h-5 w-5 text-orange-500 flex-shrink-0" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No chapters found.</p>
        )}
      </div>
    </div>
  );
}
