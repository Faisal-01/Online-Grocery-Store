import "@/styles/globals.css";
import Layout from "../components/Layout";
import { AppProvider } from "@/context/AppContext";

export default function App({ Component, pageProps }) {
  if (Component.NoLayout) {
    return (
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    );
  }
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
