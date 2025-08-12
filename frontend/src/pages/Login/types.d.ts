export interface LoginProps {
  email: string;
  password: string;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  handleLogin: () => void;
}