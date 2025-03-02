import "@/styles/globals.css";
import QueryProvider from "../providers/QueryProvider";

export default function App({ Component, pageProps }) {
  return (
    <QueryProvider>
      <Component {...pageProps} />;
    </QueryProvider>
  ); 
}
