import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadForm from './components/UploadForm.js';
import ReportPage from './pages/ReportPage.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadForm />} />
        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </Router>
  );
};

export default App;
