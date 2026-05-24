import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../api";
import { useAuth } from "../../../app/providers/AuthProvider";
import { ApiError } from "../../../shared/api";

interface UseLoginForm {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  errors: string[];
  isLoading: boolean;
  handleSubmit: (e: FormEvent) => Promise<void>;
}

export function useLoginForm(): UseLoginForm {
  const { login: setUser } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    try {
      const { user } = await login(email, password);
      setUser(user);
      history.push("/");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setErrors(["Invalid email or password."]);
      } else if (err instanceof ApiError) {
        setErrors(Object.values(err.errors).flat());
      } else {
        setErrors(["An unexpected error occurred."]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, errors, isLoading, handleSubmit };
}
