import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";

import "../styles/BigCalendarStyles.css";
import Layout from "@/components/Layout";
//import "react-big-calendar/lib/css/react-big-calendar.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
