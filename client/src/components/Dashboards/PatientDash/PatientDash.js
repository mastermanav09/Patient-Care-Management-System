import Dashboard from "../Dashboard";

const cards = [
  { title: "My Appointments", imgUrl: "/images/myappointments.jpeg" },
  { title: "Book Appointment", imgUrl: "/images/bookappointments.jpg" },
  { title: "Make Payment", imgUrl: "/images/makepayment.jpg" },
  { title: "Prescriptions", imgUrl: "/images/prescriptions.png" },
  { title: "Feedback", imgUrl: "/images/feedback.webp" },
];

function PatientDash() {
  return <Dashboard cards={cards} lgspace={4} />;
}

export default PatientDash;
