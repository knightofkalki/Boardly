import { useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom"
import Search from '../components/ui/SearchInput';
import PaperButton from '../components/ui/PaperButton';
import { FiArrowLeft } from 'react-icons/fi';
import { BsEye } from 'react-icons/bs';

import axios from 'axios';
import { API_URL } from '../shared/api';

function Upload() {

  const { subject } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState("");
  const [token, setToken] = useState(null);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const [pyqData, setPyqData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        setToken(token)
        const user = JSON.parse(localStorage.getItem('currentUser'))
        const userClass = user.userClass
        console.log("class", user.userClass)
        setLoading(true)
        const response = await axios.get(`${API_URL}/solve/yearwise/${userClass}/list`, {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });
        const data = response.data;
        const mappedData = data.questionPapers.map((paper) => ({
          title: paper.title,
        }));
        setPyqData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const uploadFile = async (file) => {
    if (!file) {
      alert("Please select a PDF file first!");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      handleStatusChange(index,"loading")
      const response = await axios.post(`${API_URL}/upload/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`},
      });
      if(response.status==200){
        handleStatusChange(index,"completed")
      };
    } catch (error) {
      console.error("Error uploading the file:", error);
      handleStatusChange(index,"failed")
    }
  };


  return (
    <div className="flex justify-center">
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
          <table className="w-full  rounded-lg ">
            <thead className="bg-gray-100 shadow-sm border-b border-b-gray-200 text-gray-800 rounded-t-lg">
              <tr>
                <th className="p-10 text-xl text-left ">Title</th>
                <th className="p-10 text-xl text-left ">Status</th>
                <th className="p-10 text-xl text-left ">Action</th>
              </tr>
            </thead>
            <tbody className='rounded-b-lg'>
              <tr className="hover:bg-blue-50">
                <td className="p-10">
                <div className="relative">
                  <select
                    className="w-full p-4 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-orange-500 text-lg text-gray-700"
                  >
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
                  {status || "Not Started"}
                </td>
                <td className="p-10 text-lg">
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer px-6 py-3 rounded-lg"
                  >
                    <PaperButton status={status} onClick={() => document.getElementById('file-input').click()} />
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    disabled={status === "completed"}
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      uploadFile(file);
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
