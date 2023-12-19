import React, { useEffect } from "react";
import "../Dashboard/Dashboard.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const { data } = await axios.get(
        "https://patient-management-backend.vercel.app/api/v1/patients"
      );
      setPatients(data.patients);
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        const response = await axios.delete(
          `https://patient-management-backend.vercel.app/api/v1/patient/${id}`
        );
        if (response.status === 200) {
          fetchPatients();
        } else {
          console.error("Failed to delete the patient.");
        }
        console.log("deleted");
        navigate("/dashboard");
      } catch (error) {
        console.error("An error occurred while deleting the patient:", error);
      }
    }
  };

  const handleSearch = () => {
    const searchQuery = searchInput.trim().toLowerCase();
    if (!searchQuery) {
      setFilteredPatients([]);
      return;
    }

    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchQuery) ||
        patient._id.toLowerCase().includes(searchQuery)
    );
    setFilteredPatients(filtered);
  };

  return (
    <div className="dashboard">
      <h1>Patient Details</h1>
      <div className="searchpatient">
        <input
          type="search"
          id="searchbar"
          placeholder="Enter Id or Name to Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button id="searchbtn" onClick={handleSearch}>
          Search
        </button>

        <Link to={"/create"}>
          <button id="registerbtn">Register New Patient</button>{" "}
        </Link>
      </div>

      <div>
        {(filteredPatients.length > 0 ? filteredPatients : patients).map(
          (patient) => (
            <div key={patient._id} className="patient-card">
              <div className="patient-card-details">
                <p><strong>Patient Id:</strong> {patient._id}</p>
                <p><strong>Patient Name:</strong> {patient.name}</p>
                <p><strong>Patient Age:</strong> {patient.age}</p>
                <p>
                  <strong>Last Visited Date:</strong>
                  {patient.visits.length > 0
                    ? patient.visits.slice(-1)[0].visitDate
                    : "NA"}
                </p>
              </div>

              <div className="action-btn">
                <Link to={`/patientdetail/${patient._id}`}>
                  <button id="viewbtn">View</button>
                </Link>
                <Link to={`/update/${patient._id}`}>
                  <button id="updatebtn">Update</button>
                </Link>
                <button
                  id="deletebtn"
                  onClick={() => handleDelete(patient._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
