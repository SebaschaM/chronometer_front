import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B20D",
    },
    secondary: {
      main: "#0036B2",
    },
    warning: {
      main: "#ADB200",
    },
    error: {
      main: "#B20000",
    },
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontSize: "7rem",
      fontWeight: "bold",
      color: "#000000",
    },
    h2: {
      fontSize: "3.2rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h3: {
      fontSize: "1.4rem",
      fontWeight: 500,
      color: "#000000",
    },
    h4: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      color: "#000000",
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: 500,
      color: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
  },
  // Text
});

export default theme;
