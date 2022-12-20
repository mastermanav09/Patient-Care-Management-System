import Dashboard from "../Dashboard";

const cardTitles = [
  { title: "Appointments", imgUrl: "/images/myappointments.jpeg" },
  { title: "Upload Prescription", imgUrl: "/images/prescriptions.png" },
];

function DoctorDash() {
  return <Dashboard cards={cardTitles} lgspace={6} />;
}

export default DoctorDash;
