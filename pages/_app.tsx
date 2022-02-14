import "../styles/globals.css";
import "../styles/day-picker.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../libs/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
