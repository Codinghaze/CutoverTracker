import "tailwindcss/tailwind.css";

import { store } from "../store";
import { Provider } from "react-redux";
import "../Main.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
