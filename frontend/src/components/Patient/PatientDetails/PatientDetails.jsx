import React, { useEffect } from "react";
import "../PatientDetails/PatientDetails.css";
import { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const PatientDetails = () => {
  const [patient, setPatient] = useState([]);
  const [open, setOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescriptions, setPrescriptions] = useState("");

  const { id } = useParams();

  const addNewVisitToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const addVisitHandler = async () => {
    // Create a new visit object to add to the patient's visits
    const newVisit = {
      diagnosis,
      prescriptions
    };

    try {
      const response = await axios.post(
        `https://patient-management-backend.vercel.app/api/v1/patient/visits/${id}`,
        newVisit
      );
      console.log("Data Saved:");
      setOpen(false);
      location.reload();
    } catch (error) {
      console.error("Error adding a new visit", error);
    }
  };

  const fetchPatientDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://patient-management-backend.vercel.app/api/v1/patient/${id}`
      );
      console.log(data);
      setPatient(data.patient);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };
  useEffect(() => {
    fetchPatientDetail();
  }, []);

  return (
    <div className="main">
      <div className="patient-details">
        <div className="patient-info">
          <h2>Patient Information</h2>
          <p>
            <strong>Patient ID:</strong> {patient._id}
          </p>
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
        </div>
        <div className="visit-details">
          <h2>Visit Details</h2>
          <div id="addbtn">

            <button onClick={addNewVisitToggle}>Add New</button>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={addNewVisitToggle}
            >
              <DialogTitle>Add New Visit</DialogTitle>
              <DialogContent className="submitDialog">
                <input
                  type="text"
                  placeholder="Diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Prescription"
                  value={prescriptions}
                  onChange={(e) => setPrescriptions(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={addNewVisitToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={addVisitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="visit">
          {patient.visits && patient.visits.length > 0 ? (
            <div className="visit-list">
              {patient.visits.map((visit, index) => (
                <div key={index} className="visit-item">
                  <p>
                    <strong>Visited Date:</strong> {visit.visitDate}
                  </p>
                  <p>
                    <strong>Diagnosis:</strong> {visit.diagnosis}
                  </p>
                  <p>
                    <strong>Prescription:</strong> {visit.prescriptions}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No visits available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
