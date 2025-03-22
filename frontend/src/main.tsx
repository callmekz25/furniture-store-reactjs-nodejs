import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { PageProvider } from "./context/cartPageContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//  Cấu hình QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // Giữ cache 30 phút, không fetch lại nếu chưa hết hạn
      cacheTime: 1000 * 60 * 60, // Dữ liệu cache tồn tại 60 phút trước khi bị xoá
      refetchOnWindowFocus: false, // Không fetch lại khi chuyển tab
      refetchOnReconnect: false, // Không fetch lại khi mất mạng rồi có lại
      refetchOnMount: false, // Không fetch lại khi component mount lại
      retry: 2, // Retry API tối đa 2 lần nếu lỗi
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PageProvider>
        {/* <PersistGate persistor={persistor}> */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        {/* </PersistGate> */}
      </PageProvider>
    </Provider>
  </StrictMode>
);
