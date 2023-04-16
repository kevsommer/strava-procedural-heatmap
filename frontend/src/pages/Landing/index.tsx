import { Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Landing = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 3,
        mx: "auto",
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Strava Heatmap Generator
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        This page can be used to generate a procedurally rendered heatmap from
        your Strava activities.
      </Typography>
      <Box mt={4}>
        <RouterLink to="/code">
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => {}}
          >
            <Typography variant="h5">Connect with Strava</Typography>
          </Button>
        </RouterLink>
      </Box>
    </Box>
  );
};

export default Landing;
