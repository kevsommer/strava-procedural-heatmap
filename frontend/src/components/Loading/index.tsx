import { Box, CircularProgress } from "@mui/material";

const Loading = () => (
  <Box
    sx={{
      display: "flex",
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress color="secondary" size={200} />
  </Box>
);

export default Loading;
