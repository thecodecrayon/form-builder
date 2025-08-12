export interface SignupProps {
  name: string;
  email: string;
  password: string;
  setName: (e: string) => void;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  handleSignup: () => void;
}