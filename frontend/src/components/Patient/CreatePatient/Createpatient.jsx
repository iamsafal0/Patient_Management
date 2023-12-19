import React, { useState } from 'react'
import "../CreatePatient/CreatePatient.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createpatient = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Create a patient object to send to the backend
      const newPatient = {
        name,
        gender,
        age,
      };
      try {
        const response = await axios.post("https://patient-management-backend.vercel.app/api/v1/patient/new", newPatient);
  
        console.log("Patient created:");
        navigate("/dashboard")

      } catch (error) {
        console.error("Error creating patient:", error);
      }
    };

    return (
        <div className='create-patient'>
          <div className="patient-registration-form">
            <h2>Register New Patient</h2>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Enter Patient Name"
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder="Enter Patient Age"
                  type="text"
                  value={age}
                  required
                  onChange={(e) => setAge(e.target.value)}
                />
                <input
                  placeholder="Enter Patient Gender"
                  type="text"
                  value={gender}
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default Createpatient