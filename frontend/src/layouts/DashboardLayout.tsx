import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const navItems = [
    { path: "/dashboard/home", label: "Home", icon: "🏠" },
    { path: "/dashboard/create", label: "Create Form", icon: "➕" },
    { path: "/dashboard/profile", label: "Profile", icon: "👤" },
    { path: "/dashboard/settings", label: "Settings", icon: "⚙️" }
  ];

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f0f0f0",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem"
        }}>
          <nav style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4rem"
          }}>
            {/* Logo/Brand */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem"
              }}>
                📋
              </div>
              <h1 style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#1a1a1a"
              }}>
                FormBuilder
              </h1>
            </div>

            {/* Navigation Links */}
            <ul style={{
              display: "flex",
              listStyle: "none",
              padding: 0,
              margin: 0,
              gap: "0.5rem",
              alignItems: "center"
            }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: "#6b7280",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      transition: "all 0.15s ease-in-out",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                      e.currentTarget.style.color = "#374151";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#6b7280";
                      e.currentTarget.style.transform = "translateY(0px)";
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Menu */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}>
              {/* Notifications */}
              <button style={{
                background: "none",
                border: "none",
                padding: "0.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                color: "#6b7280",
                fontSize: "1.25rem",
                transition: "all 0.15s ease-in-out",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
                e.currentTarget.style.color = "#374151";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#6b7280";
              }}
              >
                🔔
                {/* Notification badge */}
                <div style={{
                  position: "absolute",
                  top: "0.25rem",
                  right: "0.25rem",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#ef4444",
                  borderRadius: "50%",
                  border: "2px solid #ffffff"
                }} />
              </button>

              {/* User Avatar */}
              <div style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#e5e7eb",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.15s ease-in-out",
                fontSize: "1.1rem"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d1d5db";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#e5e7eb";
                e.currentTarget.style.transform = "scale(1)";
              }}
              >
                👤
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        backgroundColor: "#fafafa",
        minHeight: "calc(100vh - 4rem)"
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;