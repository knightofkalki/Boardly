import { useState } from 'react';
import Search from '../components/ui/SearchInput';
import PaperButton from '../components/ui/PaperButton';
import { BiSearch } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';

import axios from 'axios';
function Upload() {
  const papers = [
    { id: 1, title: 'CBSE 2024 PYQ' },
    { id: 2, title: 'ICSE 2023 PYQ'},
    { id: 3, title: 'CBSE 2022 PYQ'},
  ];

  const [statuses, setStatuses] = useState(papers.map(() => ""));

  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = newStatus;
    setStatuses(updatedStatuses);
  };

  const uploadFile = async (file,title, index) => {
    if (!file) {
      alert("Please select a PDF file first!");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      handleStatusChange(index,"loading")
      const response = await axios.post('https://4a43-103-95-122-192.ngrok-free.app/upload/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjVhZTI3ZWVhZDk5ZDljYWE1MDdlNSIsImVtYWlsIjoicGxhbjJ1c2VyQGdtYWlsLmNvbSIsInVzZXJDbGFzcyI6IjEwIiwiaWF0IjoxNzM1MDM5MTE2LCJleHAiOjE3MzUxMjU1MTZ9.j2F6OLL066H5K3B_GF1_pTyxrMbnnOvZfS4kOlXqOEg'        },
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
    <>
      <div className="mt-20 p-8">
        <h2 className="font-bold text-2xl text-gray-600">Choose your paper for evaluation</h2>
        <div className="w-4/5 flex justify-between">
          <Search placeholdertext="Search by year" />
          <select className="bg-white px-6 py-2 h-full rounded-xl border border-gray-400 focus:outline-none focus:ring-2 text-gray-500 focus:ring-gray-400">
            <option value="" disabled selected hidden>Filters</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
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
                  <td>{paper.title}</td>
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
                      disabled={statuses[index]=='completed'? true : false}
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        uploadFile(file,paper.title, index); 
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Upload;
