import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontSize: 18,
    // lineHeight: "25px",
    body1: {
      fontSize: 18,
      lineHeight: "25px",
      textTransform: "none",
    },
    body2: {
      fontSize: 16,
      lineHeight: "22px",
      textTransform: "none",
    },
    h1: {
      fontSize: 36,
      lineHeight: "46px",
      textTransform: "none",
    },
    h2: {
      fontSize: 36,
      lineHeight: "46px",
      textTransform: "none",
    },
    h3: {
      fontSize: 24,
      lineHeight: "31px",
      textTransform: "none",
    },
    h4: {
      fontSize: 20,
      lineHeight: "26px",
      textTransform: "none",
    },
    h5: {
      fontSize: 18,
      lineHeight: "24px",
      textTransform: "none",
    },
    h6: {
      fontSize: 14,
      lineHeight: "21px",
      textTransform: "none",
    },
    button: {
      fontSize: 14,
      lineHeight: "21px",
      fontWeight: 400,
      textTransform: "none",
    },
    caption: {
      fontSize: 12,
      lineHeight: "18px",
      fontWeight: 400,
      textTransform: "none",
    },
  },

  overrides: {
    MuiCssBaseline: {
      "@global": {
        ".App .MuiLink-underlineAlways": {
          cursor: "pointer",
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 12,
      },
    },
  },

  palette: {
    primary: {
      main: "#1AA179",
    },
    secondary: {
      main: "#849D96",
    },
  },

});

export default theme;
