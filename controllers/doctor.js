const appointment = require("../models/appointment.js");
const path = require("path");
const file_path = path.join("/public/uploads");

exports.uploadPrescription = async (req, res) => {
  const ext = req.file.mimetype.split("/")[1];

  const uploaded_path = path.join(
    file_path,
    "/",
    req.body.id + "/" + "prescriptionFile" + "." + ext
  );
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
      { prescribed: true, file: uploaded_path },
      { new: true }
    );
    if (updated) {
      return res.status(200).json({
        error: false,
        msg: "Prescription uploaded successfully.",
      });
    } else {
      res.status(304).json({
        error: true,
        errorMsg: "Failed to upload!",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};
