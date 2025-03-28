
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#425568", // צבע ראשי מהלוגו
//     },
//     secondary: {
//       main: "#00C9A7", // צבע משני מהלוגו
//     },
//     background: {
//       default: "#F4F4F4", // רקע כללי
//       paper: "#FFFFFF", // רקע לכרטיסים ואלמנטים
//     },
//     text: {
//       primary: "#333333", // צבע טקסט ראשי
//       secondary: "#00C9A7", // צבע טקסט משני מהלוגו
//     },
//     action: {
//       hover: "#00b3ae", // צבע כהה יותר לריחוף
//       selected: "#008C72", // צבע בהיר לכפתור פעיל
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#2eb9c0", // כפתור בצבע ראשי מהלוגו
//           color: "#FFFFFF", // טקסט לבן
//           "&:hover": {
//             backgroundColor: "#00b3ae", // צבע כהה יותר בעת ריחוף
//           },
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#87adaf", // AppBar בצבע ראשי מהלוגו
//           color: "#FFFFFF", // טקסט לבן ב-AppBar
//         },
//       },
//     },
//     MuiDialog: {
//       styleOverrides: {
//         paper: {
//           backgroundColor: "#FFFFFF", // מודלים לבנים
//         },
//       },
//     },
//   },
// });

// export default theme;


import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#425568", // צבע ראשי מהלוגו
    },
    secondary: {
      main: "#00C9A7", // צבע משני מהלוגו
    },
    background: {
      default: "#F4F4F4", // רקע כללי
      paper: "#FFFFFF", // רקע לכרטיסים ואלמנטים
    },
    text: {
      primary: "#333333", // צבע טקסט ראשי
      secondary: "#00C9A7", // צבע טקסט משני מהלוגו
    },
    action: {
      hover: "#00b3ae", // צבע כהה יותר לריחוף
      selected: "#008C72", // צבע בהיר לכפתור פעיל
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(87 159 186)", // כפתור בצבע ראשי מהלוגו
        //  backgroundColor: "#2eb9c0", // כפתור בצבע ראשי מהלוגו
          color: "#FFFFFF", // טקסט לבן
          "&:hover": {
            backgroundColor: "#00b3ae", // צבע כהה יותר בעת ריחוף
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#87adaf", // AppBar בצבע ראשי מהלוגו
          color: "#FFFFFF", // טקסט לבן ב-AppBar
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF", // מודלים לבנים
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "rgb(87 159 186)", // צבע כללי לכל האיקונים
        },
      },
    },
  },
});

export default theme;
