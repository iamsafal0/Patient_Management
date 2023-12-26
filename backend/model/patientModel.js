const mongoose = require("mongoose");

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });
};

const patientSchema = new mongoose.Schema({

  _id:Number,
  
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  visits: [{
    visitDate: {
      type: String,
      default: formatDate(Date.now()),
    },
    diagnosis: { type: String },
    prescriptions: { type: String },
  }]
});

module.exports = mongoose.model("Patient", patientSchema);
