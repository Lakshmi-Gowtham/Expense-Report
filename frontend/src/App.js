// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateReport from './components/CreateReport';
import ShowReport from './components/ShowReport';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create" element={<ProtectedRoute element={<CreateReport />} />} />
        <Route path="/reports" element={<ProtectedRoute element={<ShowReport />} />} />
        <Route path="/reports/expenses" element={<ProtectedRoute element={<ShowReport />} />}  />
        <Route path="/" element={<Navigate to="/signin" />} /> {/* Redirect root to sign-in */}
      </Routes>
    </Router>
  );
}

export default App;
