import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FileUploader from "../FileUploader/FileUploader";

export default function UploadPrescriptionCard(props) {
  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
      <CardContent>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Appointment ID : {props.id}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Prescription to
        </Typography>
        <Typography variant="h5" component="div">
          {props.patient}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          style={{ color: "gray", margin: "0.2rem 0" }}
        >
          {props.pemail}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          {`appointment on: ${props.date}`}
        </Typography>
        <br /> <br />
        <Typography variant="caption" color="text.secondary" component="div">
          File should be either word or pdf file. File size should be less than
          2 MB.
        </Typography>
        <FileUploader
          useKey={props.useKey}
          id={props.id}
          pemail={props.pemail}
          demail={props.demail}
          doa={props.doa}
        />
      </CardContent>
    </Card>
  );
}
