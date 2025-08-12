import { Routes, Route } from "react-router-dom";
import LoginView from "./views/Login/Login";
import FillFormView from "./views/FillForm/FillForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

const App = () => {
  return (
    <Routes>
      {/* Guest-only route */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginView />
          </GuestRoute>
        }
      />

      {/* Protected route */}
      <Route
        path="/fillform"
        element={
          <ProtectedRoute>
            <FillFormView />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<LoginView />} />
    </Routes>
  );
};

export default App;
