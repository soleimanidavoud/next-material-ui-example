import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0bc4d9",
    },
    secondary: {
      main: "#eee",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "none",
      },
      colorPrimary: {
        backgroundColor: "#f7f7f7",
      },
    },
  },
});

export default theme;
