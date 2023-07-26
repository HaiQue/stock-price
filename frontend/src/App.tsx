import StockPrices from "./pages/StockPrices";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#58427a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f5f5f5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StockPrices />
    </ThemeProvider>
  );
}

export default App;
