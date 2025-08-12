import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.status) {
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/fillform");
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    loginUser();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
    error
  };
};

export default useLogin;
