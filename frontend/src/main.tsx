import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { PageProvider } from "./context/PageContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PageProvider>
        {/* <PersistGate persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
      </PageProvider>
    </Provider>
  </StrictMode>
);
