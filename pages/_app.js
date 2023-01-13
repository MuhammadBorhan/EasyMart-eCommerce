import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

// return (
//   <StoreProvider>
//     <Component {...pageProps} />
//   </StoreProvider>
// );
