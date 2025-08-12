import useSignup from "../../hooks/useSignup";
import Signup from "../../pages/Signup/Signup";

const SignupView = () => {

  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignup
  } = useSignup();

  return (
    <Signup 
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSignup={handleSignup}
    />
  )
};

export default SignupView;