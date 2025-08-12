import { Routes, Route } from "react-router-dom";
import LoginView from "./views/Login/Login";
import FillFormView from "./views/FillForm/FillForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardView from "./views/Dashboard/Dashboard";
import CreateFormView from "./views/CreateForm/CreateForm";
import ProfileView from "./views/Profile/Profile";
import SettingsView from "./views/Settings/Settings";
import SignupView from "./views/Signup/Signup";

const App = () => {
  return (
    <Routes>
      {/* GUEST-ONLY ROUTES */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginView />
          </GuestRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <GuestRoute>
            <SignupView />
          </GuestRoute>
        }
      />

      {/* PROTECTED ROUTES*/}
      <Route
        path="/fillform"
        element={
          <ProtectedRoute>
            <FillFormView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<DashboardView />} />
        <Route path="create" element={<CreateFormView />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="settings" element={<SettingsView />} />
      </Route>

      {/* DEFAULT REDIRECT */}
      <Route path="*" element={<LoginView />} />
    </Routes>
  );
};

export default App;
