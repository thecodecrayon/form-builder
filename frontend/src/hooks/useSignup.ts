import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signupUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok && data.status) {
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard/home");
      } else {
        setError(data.msg || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    signupUser();
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
    loading,
    error
  };
};

export default useSignup;
