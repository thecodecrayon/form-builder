import { Link } from "react-router-dom";
import type { LoginProps } from "./types";

const Login = (props: LoginProps) => {

  const { email, password, setEmail, setPassword, handleLogin } = props;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#fafafa",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{
        background: "#ffffff",
        padding: "3rem",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        width: "400px",
        border: "1px solid #f0f0f0",
      }}>
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "2.5rem", 
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#1a1a1a",
          margin: "0 0 2.5rem 0"
        }}>
          Welcome back
        </h2>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ 
            display: "block", 
            fontWeight: "500", 
            marginBottom: "0.75rem",
            color: "#374151",
            fontSize: "0.9rem"
          }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "8px",
              border: "1.5px solid #e5e7eb",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3b82f6";
              e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={{ 
            display: "block", 
            fontWeight: "500", 
            marginBottom: "0.75rem",
            color: "#374151",
            fontSize: "0.9rem"
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "8px",
              border: "1.5px solid #e5e7eb",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3b82f6";
              e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "0.875rem",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            marginBottom: "1.5rem",
            transition: "background-color 0.15s ease-in-out, transform 0.1s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#3b82f6";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(1px)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
          }}
        >
          Sign in
        </button>

        <p style={{ 
          textAlign: "center", 
          fontSize: "0.9rem",
          color: "#6b7280",
          margin: 0
        }}>
          Don't have an account?{" "}
          <Link 
            to="/signup" 
            style={{ 
              color: "#3b82f6", 
              textDecoration: "none", 
              fontWeight: "500"
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;