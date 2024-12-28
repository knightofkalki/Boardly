import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaperButton from "../../components/ui/PaperButton";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { API_URL } from "../../shared/api";
import PlansPopup from "../../components/PlansPopup";

function Upload() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Not Started");
  const [pyqData, setPyqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState("");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const userClass = user?.userClass;

        if (!token || !userClass) {
          console.error("Missing token or user class");
          return;
        }

        setLoading(true);
        const response = await axios.get(
          `${API_URL}/solve/yearwise/${userClass}/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const mappedData = response.data.questionPapers.map((paper) => ({
          title: paper.title,
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

  const getYearFromTitle = (title) => {
    let year = title[0] + title[1] + title[2] + title[3];
    console.log(year);
    return year;
  };

  const uploadFile = async (file, year) => {
    if (!file) {
      alert("Please select a PDF file first!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", year); // Adding the year to the upload body

    try {
      setStatus("Uploading...");
      const response = await axios.post(`${API_URL}/subject/${subject}/upload/submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setStatus("Completed");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      setStatus("Failed");
      if (error.code === "ERR_BAD_REQUEST") {
        setPopup(true);
      }
    }
  };

  return (
    <div className="flex justify-center">
      {popup && (
        <PlansPopup onClose={() => setPopup(false)} />
      )}
      <div className="w-full lg:w-[90%]">
        <div className="p-6 w-full flex items-center justify-center flex-col">
          <div className="w-4/5 flex justify-between">
            <h2 className="font-bold text-3xl text-gray-600">
              <button
                onClick={() => navigate(`/subject/${subject}`)}
                className="p-6 hover:bg-gray-100 rounded-full"
              >
                <FiArrowLeft className="h-7 w-7" />
              </button>
              Choose your paper for evaluation
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center mt-12">
              <div className="animate-spin mt-12 rounded-full h-16 w-16 border-t-4 border-gray-300 border-solid"></div>
            </div>
          ) : (
            <div className="mt-12 bg-white rounded-lg shadow-md">
              <table className="w-full rounded-lg">
                <thead className="bg-gray-100 shadow-sm border-b border-b-gray-200 text-gray-800 rounded-t-lg">
                  <tr>
                    <th className="p-10 text-xl text-left">Title</th>
                    <th className="p-10 text-xl text-left">Status</th>
                    <th className="p-10 text-xl text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="rounded-b-lg">
                  <tr className="hover:bg-blue-50">
                    <td className="p-10">
                      <div className="relative">
                        <select
                          className="w-full p-4 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-orange-500 text-lg text-gray-700"
                          onChange={(e) => setSelectedPaper(e.target.value)}
                          value={selectedPaper}
                        >
                          <option value="" disabled>
                            Choose Year
                          </option>
                          {pyqData.map((paper, index) => (
                            <option
                              key={index}
                              value={paper.title}
                              className="bg-white hover:bg-gray-100 text-gray-800"
                            >
                              {paper.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="p-10 capitalize text-lg font-semibold">
                      {status}
                    </td>
                    <td className="p-10 text-lg">
                      <label
                        htmlFor="file-input"
                        className="cursor-pointer px-6 py-3 rounded-lg"
                      >
                        <PaperButton
                          status={status}
                          onClick={() =>
                            document.getElementById("file-input").click()
                          }
                        />
                      </label>
                      <input
                        type="file"
                        id="file-input"
                        style={{ display: "none" }}
                        disabled={status === "Completed"}
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const year = getYearFromTitle(selectedPaper); // Extract year from title
                          if (year) {
                            uploadFile(file, year); // Pass the extracted year
                          } else {
                            alert("No valid year found in the selected paper title.");
                          }
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
