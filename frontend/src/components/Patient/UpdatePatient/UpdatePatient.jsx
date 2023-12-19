import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";

export const UpdatePatient = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const navigate=useNavigate()

  const {id}=useParams()


  const fetchPatientDetail = async () => {

    try {
      const {data} = await axios.get(`https://patient-management-backend.vercel.app/api/v1/patient/${id}`);

      console.log(data)

    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };
  useEffect(()=>{
    fetchPatientDetail();

},[])

const handleUpdate = async (e) => {
  e.preventDefault();

  // Create a patient object to send to the backend
  const newPatient = {
    name,
    gender,
    age,
  };
  try {
    const response = await axios.put(`https://patient-management-backend.vercel.app/api/v1/patient/${id}`, newPatient);

    console.log("Patient Updated:");
    navigate("/dashboard")

  } catch (error) {
    console.error("Error creating patient:", error);
  }
};

  return (
    <div className="create-patient">
      <div className="patient-registration-form">
        <h2>Update Patient</h2>
        <div>
          <form onSubmit={handleUpdate}>
            <input
              placeholder="Enter Patient Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Enter Patient Age"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              placeholder="Enter Patient Gender"
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};
