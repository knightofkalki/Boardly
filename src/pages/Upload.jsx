import { useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom"
import Search from '../components/ui/SearchInput';
import PaperButton from '../components/ui/PaperButton';
import { FiArrowLeft } from 'react-icons/fi';
import { BsEye } from 'react-icons/bs';

import axios from 'axios';
import { API_URL } from '../shared/api';

function Upload() {
  const papers = [
    { id: 1, title: 'CBSE 2024 PYQ' },
    { id: 2, title: 'ICSE 2023 PYQ'},
    { id: 3, title: 'CBSE 2022 PYQ'},
  ];
  const { subject } = useParams()
  const navigate = useNavigate()
  const [statuses, setStatuses] = useState(papers.map(() => ""));
  const [token, setToken] = useState(null);

  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = newStatus;
    setStatuses(updatedStatuses);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken); 
    }
  }, []);

  const uploadFile = async (file,title, index) => {
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
        <div className="p-8 w-full flex items-center justify-center flex-col">
            
          <div className="w-4/5 flex justify-between">
            <h2 className="font-bold text-3xl text-gray-600">
                <button 
                    onClick={() => navigate(`/subject/${subject}`)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    >
                    <FiArrowLeft className="h-7 w-7" />
                </button>
                Choose your paper for evaluation
            </h2>
          </div>
          
          <div className="w-4/5 mt-10 flex justify-between">
            <Search placeholdertext="Search by year" />
          </div>
          <div className="w-4/5 mt-10">
            <table className="w-full">
              <colgroup>
                <col span="1" className="w-[60%]" />
                <col span="1" />
                <col span="1" className="w-[10%]" />
                <col span="1" className="w-[10%]" />
              </colgroup>
              <thead className="text-left">
                <tr>
                  <th>Title</th>
                  <th></th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {papers.map((paper, index) => (
                  <tr key={paper.id} className="bg-white shadow-md">
                    <td className="p-6">{paper.title}</td>
                    <td>
                      <BsEye size={25} />
                    </td>
                    <td className="capitalize font-semibold">{statuses[index]}</td>
                    <td>
                      <label htmlFor={`file-input-${index}`} className="cursor-pointer">
                        <PaperButton
                          status={statuses[index]}
                          onClick={() => document.getElementById(`file-input-${index}`).click()}
                        />
                      </label>
                      <input
                        type="file"
                        id={`file-input-${index}`}
                        style={{ display: 'none' }}
                        disabled={statuses[index] === 'completed'}
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          uploadFile(file, paper.title, index);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
