import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";
export default function AppointmentCard(props) {
  const downloadPrescription = async () => {
    try {
      axios
        .get(
          `/api/patient/appointments/${props?.prescription?._id}/downloadPrescription`
        )
        .then((res) => {
          let data = res.data.data;
          setTimeout(() => {
            const response = {
              file: data,
            };
            window.open(response.file);
          }, 250);
        });
    } catch (error) {
      alert("Can't get Invoice!");
      console.error(error);
    }
  };

  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
      <CardContent>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Prescription By
        </Typography>
        <Typography variant="h5" component="div">
          {props.doc}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          {`appointment on: ${props.date}`}
        </Typography>
        <br /> <br />
        <Fab color="primary" variant="extended">
          <div onClick={downloadPrescription} style={{ display: "flex" }}>
            <FileDownloadIcon /> {" Prescription"}
          </div>
        </Fab>
        {/* <Fab
          href={`https://mhc-pms-server.herokuapp.com${props.file_url}`}
          download="my-prescription"
          color="primary"
          variant="extended"
        >
          <FileDownloadIcon /> {" Prescription"}
        </Fab> */}
      </CardContent>
    </Card>
  );
}
