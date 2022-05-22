import "../styles/globals.css";
import StoreProvider from "../context/store-context";

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
