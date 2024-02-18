const Patient = require("../model/patientModel");

// create Patient

exports.createPatient = async (req, res, next) => {
  const {name ,age, gender} = req.body

  const patient=await Patient.create({
    name,age,gender
  })
  res.status(201).json({
    success: true,
    patient,
  });
};

//to get all patient
exports.getAllPatients = async (req, res) => {
  const patients = await Patient.find().sort({createdAt:-1});

  res.status(200).json({
    success: true,
    patients,
  });
};

// Get a single patient Details
exports.getPatientDetails = async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return res.status(500).json({
      success: false,
      message: "patient not found",
    });
  }
  res.status(200).json({
    success: true,
    patient,
  });
};

//to update patient

exports.updatePatient = async (req, res, next) => {
  let patient = await Patient.findById(req.params.id);
  if (!patient) {
    return res.status(500).json({
      success: false,
      message: "patient no found",
    });
  }
  patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    patient,
  });
};


//to delete a patient

exports.deletePatient = async (req, res, next) => {
  const patient = await Patient.findByIdAndRemove(req.params.id);

  if (!patient) {
    return res.status(500).json({
      success: false,
      message: "patient no found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Patient Delete Successfully",
  });
};



//to create new visit

exports.createPatientVisit = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    const { visitDate, diagnosis, prescriptions } = req.body;

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const newVisit = {
      visitDate,
      diagnosis,
      prescriptions,
    };
    patient.visits.push(newVisit);
    await patient.save();
    res.status(201).json({ message: "Visit created", visit: newVisit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// to search patient

exports.searchPatient = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword) {
      return res.status(400).json({ message: "Please provide a keyword for searching." });
    }

    // Use a regex pattern to perform a case-insensitive search on the patient's name or any other relevant field

    const regex = new RegExp(keyword, "i");

    const patients = await Patient.find({
      $or: [
        { id: { $regex: regex } },
        { name: { $regex: regex } },
      ],
    });

    if (patients.length === 0) {
      return res.status(404).json({ message: "No patients found matching the keyword." });
    }

    res.status(200).json({ success: true, patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


