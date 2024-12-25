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

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken); 
    }
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
    <div className="flex justify-center min-h-screen">
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
                  <select className="w-full p-6 rounded-lg">
                    <option>PYQ2022SIADJAOISDISADIISAFNISFNA</option>
                    <option>PYQ2021</option>
                  </select>
                </td>
                <td className="p-10 capitalize font-semibold">
                  {status || "Not Started"}
                </td>
                <td className="p-10">
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer px-6 py-3 rounded-lg"
                  >
                    <PaperButton status={status} onClick={() => document.getElementById(file-input).click()} />
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
        </div>
      </div>
    </div>
  );
}

export default Upload;
