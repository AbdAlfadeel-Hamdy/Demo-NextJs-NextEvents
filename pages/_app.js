import "../styles/globals.css";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { NotificationContextProvider } from "@/store/notification-context";
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          {/** This is the default title unless overwritten */}
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
