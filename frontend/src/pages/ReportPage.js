import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const ReportPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports')
      .then((res) => setReports(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="report-container">
      <h2>Credit Reports</h2>
      {reports.map((report) => (
        <div key={report._id} className="report-card">
          <h4>{report.name}</h4>
          <p>Credit Score: {report.creditScore}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportPage;
