import useLogin from "../../hooks/useLogin";
import Login from "../../pages/Login/Login";

const LoginView = () => {

  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin
  } = useLogin();

  return (
    <Login 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      />
  )
};

export default LoginView;