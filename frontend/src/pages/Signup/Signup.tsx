import { Link } from "react-router-dom";

interface SignupProps {
  name: string;
  email: string;
  password: string;
  setName: (e: string) => void;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  handleSignup: () => void;
}

const Signup = ({ name, email, password, setName, setEmail, setPassword, handleSignup }: SignupProps) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        padding: "2.5rem",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: "380px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "1.8rem" }}>Sign Up</h2>

        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            marginBottom: "1.2rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
        />

        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            marginBottom: "1.2rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
        />

        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            marginBottom: "1.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
        />

        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "0.9rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Sign Up
        </button>

        <p style={{ textAlign: "center", fontSize: "0.95rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007bff", textDecoration: "none", fontWeight: 600 }}>
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
