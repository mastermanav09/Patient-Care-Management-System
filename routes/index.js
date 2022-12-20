const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  generateRefreshToken,
  logout,
} = require("../controllers/authController.js");

const {
  docList,
  addNew,
  updateFee,
  unverified,
  verify,
  reject,
  generateStats,
  patientFeedbacks,
} = require("../controllers/admin.js");

const {
  bookAppointment,
  duePayment,
  makePayment,
  myAppointments,
  getInvoice,
  cancelAppointment,
  prescriptions,
  writeFeedback,
  deleteFeedback,
  downloadPrescription,
} = require("../controllers/patient.js");

const { uploadPrescription } = require("../controllers/doctor.js");
const middleware = require("../middlewares/index.js");
const handleFileUpload = require("../middlewares/handleMulter.js");

router.post("/auth/signup", signup);

router.post("/auth/signin", signin);

router.post("/auth/refresh", generateRefreshToken);

router.delete("/auth/logout", logout);

router.get("/doctor/list", middleware, docList);

router.post("/doctor/new", middleware, addNew);

router.post("/doctor/fee", middleware, updateFee);

router.get("/users/unverified", middleware, unverified);

router.post("/users/unverified/verify", middleware, verify);

router.delete("/users/unverified/reject", middleware, reject);

router.get("/generate/stats", middleware, generateStats);

router.get("/patient/feedbacks", middleware, patientFeedbacks);

router.post("/booking/appointment", middleware, bookAppointment);

router.get("/booking/duepayment", middleware, duePayment);

router.post("/booking/payment", middleware, makePayment);

router.get(
  "/patient/appointments/:appointmentId/getInvoice",
  middleware,
  getInvoice
);

router.get("/patient/appointments", middleware, myAppointments);

router.delete("/patient/appointments/cancel", middleware, cancelAppointment);

router.get("/patient/:patientEmail/prescriptions", middleware, prescriptions);

router.get(
  `/patient/appointments/:prescriptionId/downloadPrescription`,
  middleware,
  downloadPrescription
);

router.post("/patient/feedback/write", middleware, writeFeedback);

router.post("/patient/feedback/delete", middleware, deleteFeedback);

router.post(
  "/doctor/prescription/upload",
  [handleFileUpload, middleware],
  uploadPrescription
);

module.exports = router;
