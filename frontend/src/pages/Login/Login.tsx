interface LoginProps {
  email: string;
  password: string;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  handleLogin: () => void;
}

const Login = (props: LoginProps) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin
  } = props;

  return (
    <>
      <h1>Login</h1>
      <label>Email:</label>
      <input type="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Submit</button>
    </>
  );
}

export default Login;