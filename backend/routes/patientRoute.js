const express = require("express");
const {
  createPatient,
  getAllPatients,
  getPatientDetails,
  updatePatient,
  deletePatient,
  createPatientVisit,
  searchPatient,
} = require("../controllers/patientController");

const router = express.Router();

router.route("/patient/new").post(createPatient);

router.route("/patients").get(getAllPatients);

router.route("/patient/:id").get(getPatientDetails);

router.route("/patient/:id").put(updatePatient);

router.route("/patient/:id").delete(deletePatient);

router.route("/patient/visits/:id").post(createPatientVisit);

router.route("/patients").get(searchPatient);


module.exports = router;
