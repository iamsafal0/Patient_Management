import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/layout/Home/Home.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Createpatient from "./components/Patient/CreatePatient/Createpatient.jsx";
import { UpdatePatient } from "./components/Patient/UpdatePatient/UpdatePatient.jsx";
import PatientDetails from "./components/Patient/PatientDetails/PatientDetails.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/create" element={<Createpatient />} />
        <Route path="/update/:id" element={<UpdatePatient />} />
        <Route path="/patientdetail/:id" element={<PatientDetails />} />
        <Route path="/visits/:id" element={<PatientDetails />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
