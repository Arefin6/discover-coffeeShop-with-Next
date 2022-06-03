import "../styles/globals.css";
import StoreProvider from "../context/storeContext";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </StoreProvider>
  );
}

export default MyApp;
