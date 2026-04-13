import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ManageSkills from './components/admin/ManageSkills';
import ManageProjects from './components/admin/ManageProjects';
import ManageExperience from './components/admin/ManageExperience';
import ManageResume from './components/admin/ManageResume';
import { fairyDustCursor } from './utils/fairyDustCursor';

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Heli's Portfolio";
    const cursor = fairyDustCursor();
    return () => {
      cursor.destroy();
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="experience" element={<ManageExperience />} />
          <Route path="resume" element={<ManageResume />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;