import { Provider } from "react-redux";
import store from "../redux/store/store";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

// return (
//   <StoreProvider>
//     <Component {...pageProps} />
//   </StoreProvider>
// );
