import type { AppProps } from "next/app";

import ShiningProvider from "@/providers/ShiningProvider";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShiningProvider>
      <Component {...pageProps} />
    </ShiningProvider>
  );
}
