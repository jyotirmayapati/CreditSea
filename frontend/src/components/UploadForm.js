import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); 

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append('xmlFile', file);

    try {
      const res = await axios.post('http://localhost:5000/api/reports/upload', formData);
      alert('File Uploaded Successfully!');
      console.log('Server Response:', res.data);

      navigate('/reports');
    } catch (error) {
      alert(`File Upload Failed! ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Credit Report</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
