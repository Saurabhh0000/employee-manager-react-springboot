import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

/* ===== COMMON ===== */
import Footer from "./components/Footer";

/* ===== HEADERS ===== */
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";

/* ===== AUTH ===== */
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import Register from "./components/Register";

/* ===== USER ===== */
import UserDashboard from "./components/UserDashboard";
import ChangePassword from "./components/ChangePassword";
import Settings from "./components/Settings";
import Employees from "./components/Employees";

/* ===== ADMIN ===== */
import AdminDashboard from "./components/AdminDashboard";
import AdminEmployees from "./components/AdminEmployees";
import AddEmployee from "./components/AddEmployee";
import AdminFooter from "./components/AdminFooter";
import AdminChangePassword from "./components/AdminChangePassword";
import AdminSettings from "./components/AdminSettings";
import CreateProject from "./components/CreateProject";
import ProjectDetails from "./components/ProjectDetails";

/* ================= USER LAYOUT ================= */
const UserLayout = () => (
  <>
    <Header />
    <div style={{ minHeight: "80vh" }}>
      <Outlet />
    </div>
    <Footer />
  </>
);

/* ================= ADMIN LAYOUT ================= */
const AdminLayout = () => (
  <>
    <AdminHeader />
    <div style={{ minHeight: "80vh" }}>
      <Outlet />
    </div>
    <AdminFooter />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ================= USER ROUTES ================= */}
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/employees" element={<Employees />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<AdminLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/list-employees" element={<AdminEmployees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route
            path="/admin-change-password"
            element={<AdminChangePassword />}
          />
          <Route
            path="/admin/project/:projectCode"
            element={<ProjectDetails />}
          />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/edit-employee/:id" element={<AddEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
