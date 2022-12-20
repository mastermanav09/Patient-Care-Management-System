const appointment = require("../models/appointment.js");
const doctorList = require("../models/doctorList.js");
const fs = require("fs");
const path = require("path");
const pdfDocument = require("pdfkit");

exports.bookAppointment = async (req, res) => {
  try {
    const newAppointment = req.body;
    await appointment.create(newAppointment);
    return res.status(201).json({
      error: false,
      msg: "Payment is Due. Confirm your appointment after successful payment.",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

exports.duePayment = async (req, res) => {
  try {
    const unpaid = await appointment.find({ payment: false });
    if (unpaid.length > 0) {
      return res.status(200).json(unpaid);
    } else {
      return res
        .status(404)
        .json({ error: true, errorMsg: "No payment found due!" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

exports.makePayment = async (req, res) => {
  const filter = {
    $and: [
      { pemail: req.body.pemail },
      { demail: req.body.demail },
      { doa: req.body.doa },
    ],
  };
  try {
    const updated = await appointment.findOneAndUpdate(
      filter,
      { payment: true },
      { new: true }
    );
    if (updated) {
      return res.status(200).json({
        error: false,
        msg: "Payment Successful. Appointment confirmed.",
        appointmentObj: updated,
      });
    } else {
      res.status(304).json({
        error: true,
        errorMsg: "Payment was not successful. Try again!",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

exports.myAppointments = async (req, res) => {
  try {
    const appointments = await appointment.find({ payment: true });
    if (appointments.length > 0) {
      return res.status(200).json(appointments);
    } else {
      return res
        .status(404)
        .json({ error: true, errorMsg: "No appointment found!" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

exports.getInvoice = async (req, res) => {
  const appointmentId = req.params.appointmentId;

  try {
    const appointmentDoc = await appointment.findById(appointmentId);
    const doctorDoc = await doctorList.find({ email: appointmentDoc.demail });

    let dir = `./public/invoices/${appointmentId}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    var file =
      `./public/invoices/${appointmentId}/` +
      "invoice-" +
      appointmentId +
      ".pdf";
    var downloadFile =
      `/public/invoices/${appointmentId}/` +
      "invoice-" +
      appointmentId +
      ".pdf";

    const doc = new pdfDocument();

    doc.pipe(fs.createWriteStream(file));

    doc.fontSize(26).text("Invoice", {
      underline: true,
    });

    doc
      .fontSize(12)
      .text(
        "Patient" +
          "                                        " +
          appointmentDoc.patient +
          "\n\n" +
          "Doctor" +
          "                                        " +
          appointmentDoc.doctor +
          "\n\n" +
          "Appointment Fees" +
          "                                        " +
          "                                        " +
          "Rs. " +
          doctorDoc[0].fee +
          "\n"
      );

    doc.text(
      "---------------------------------------------------------------------------------------------------------------------\n"
    );

    doc
      .fontSize(13)
      .text(
        "Total Fees :" +
          "                                        " +
          "                                          " +
          "Rs. " +
          doctorDoc[0].fee +
          "\n"
      );

    doc.end();
    return res.send({ data: "http://localhost:5000" + downloadFile });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

exports.downloadPrescription = async (req, res) => {
  const prescriptionId = req.params.prescriptionId;

  try {
    const appointmentDoc = await appointment.findById(prescriptionId);
    const file = appointmentDoc.file;

    const mimetype = file.split("\\");
    const extension = mimetype[mimetype.length - 1];

    const mainExt = extension.split(".");

    var downloadFile =
      `/public/uploads/${prescriptionId}/` +
      "prescriptionFile" +
      `.${mainExt[mainExt.length - 1]}`;

    return res.send({ data: "http://localhost:5000" + downloadFile });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

exports.cancelAppointment = async (req, res) => {
  const filter = {
    $and: [
      { pemail: req.body.pemail },
      { demail: req.body.demail },
      { doa: req.body.doa },
    ],
  };
  try {
    appointment.deleteOne(filter, (err) => {
      if (err) {
        console.log(err);
        return res
          .status(304)
          .json({ error: true, errorMsg: "Something went wrong!" });
      } else {
        return res
          .status(200)
          .json({ error: false, msg: "Appointment Cancelled!" });
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

exports.prescriptions = async (req, res) => {
  const patientEmail = req.params.patientEmail;
  try {
    const prescriptions = await appointment.find({
      prescribed: true,
      pemail: patientEmail,
    });
    if (prescriptions.length > 0) {
      return res.status(200).json(prescriptions);
    } else {
      return res
        .status(404)
        .json({ error: true, errorMsg: "No prescription found!" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

exports.writeFeedback = async (req, res) => {
  const filter = {
    $and: [
      { pemail: req.body.pemail },
      { demail: req.body.demail },
      { doa: req.body.doa },
    ],
  };
  const newFeedback = {
    feedback: true,
    review: req.body.review,
    rating: req.body.rating && parseInt(req.body.rating),
  };
  try {
    const updated = await appointment.findOneAndUpdate(filter, newFeedback, {
      new: true,
    });
    if (updated) {
      return res.status(200).json({
        error: false,
        msg: "Feedback updated!",
      });
    } else {
      res.status(304).json({
        error: true,
        errorMsg: "Problem submitting feedback. Try again!",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

exports.deleteFeedback = async (req, res) => {
  const filter = {
    $and: [
      { pemail: req.body.pemail },
      { demail: req.body.demail },
      { doa: req.body.doa },
    ],
  };
  const newFeedback = {
    feedback: false,
    review: "",
    rating: 0,
  };
  try {
    const updated = await appointment.findOneAndUpdate(filter, newFeedback, {
      new: true,
    });
    if (updated) {
      return res.status(200).json({
        error: false,
        msg: "Feedback Deleted!",
      });
    } else {
      res.status(304).json({
        error: true,
        errorMsg: "Problem deleting feedback. Try again!",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};
