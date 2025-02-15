import "./App.css";
import AppRouter from "./routers";
import AdminRoutes from "./admin/layout/admin-routes";
const App: React.FC = () => {
  return (
    <>
      <AppRouter></AppRouter>
      <AdminRoutes></AdminRoutes>
    </>
  );
};

export default App;
