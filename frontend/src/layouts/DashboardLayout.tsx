import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header style={{ background: "#f0f0f0", padding: "1rem" }}>
        <nav>
          <ul style={{
            display: "flex",
            listStyle: "none",
            padding: 0,
            margin: 0,
            gap: "1rem"
          }}>
            <li><Link to="/dashboard/home">Home</Link></li>
            <li><Link to="/dashboard/create">Create Form</Link></li>
            <li><Link to="/dashboard/profile">Profile</Link></li>
            <li><Link to="/dashboard/settings">Settings</Link></li>
          </ul>
        </nav>
      </header>

      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
