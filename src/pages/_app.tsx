import type { AppProps } from "next/app";

import ShiningProvider from "@/providers/ShiningProvider";

import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fafafa",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ShiningProvider>
        <Component {...pageProps} />
      </ShiningProvider>
    </ThemeProvider>
  );
}
