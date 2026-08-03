import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      {/* Centralised toast host - every service/page reports errors and
          successes through react-hot-toast instead of inline alerts. */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "6px",
            fontSize: "14px",
            border: "1px solid #E4E2DD",
            boxShadow: "0 2px 10px rgba(20,20,30,0.08)",
          },
        }}
      />
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
