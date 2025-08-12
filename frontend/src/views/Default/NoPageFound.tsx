const NoPageFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: "0", color: "#333" }}>404</h1>
      <h2 style={{ margin: "0.5rem 0", color: "#555" }}>Page Not Found</h2>
      <p style={{ color: "#777", maxWidth: "400px" }}>
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#0056b3")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#007bff")
        }
      >
        Go Home
      </a>
    </div>
  );
};

export default NoPageFound;
