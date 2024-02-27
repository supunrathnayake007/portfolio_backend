import "@/styles/globals.css";
import { GlobalProvider } from "../context/GlobalContext";
import { Helmet } from "react-helmet";

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Helmet>
        <title>SR SMC Project</title>
      </Helmet>
      <Component {...pageProps} />;
    </GlobalProvider>
  );
}
