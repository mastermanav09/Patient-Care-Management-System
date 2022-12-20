import DashBar from "../DashBar/DashBar";
import DashCard from "../Cards/DashCard";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Dashboard.css";
import video from "./backtree.mp4";

const theme = createTheme();

function Dashboard(props) {
  return (
    <>
      <video className="myVideo1" loop autoPlay muted>
        <source src={video} type="video/mp4" />
      </video>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DashBar position="relative" />
        <main className="main-dash">
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Patient Care
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                It may not always be about what we know, but it's always about
                how much we care.
              </Typography>
            </Container>
          </Box>
          <Container sx={{ pb: 4 }} maxWidth="md">
            <Grid container spacing={4}>
              {props.cards.map((cardFor, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={6}>
                    <DashCard card={cardFor} from={props.from} />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>

      <video className="myVideo2" loop autoPlay muted>
        <source src={video} type="video/mp4" />
      </video>
    </>
  );
}

export default Dashboard;
