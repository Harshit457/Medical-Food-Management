import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import AdminDashboard from './components/AdminDashboard';
import NewPatient from './components/NewPatient';
import AddPantry from './components/AddPantry';
import PatientDetails from './components/PatientDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/new-patient" element={<NewPatient />} />
        <Route path="/add-pantry" element={<AddPantry />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
      </Routes>
    </Router>
  );
}

export default App;