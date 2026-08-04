import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import AuthLayout from "../components/layout/AuthLayout";
import { isNonEmpty, isValidEmail } from "../utils/validators";
import { getErrorMessage } from "../utils/getErrorMessage";

const INITIAL_FORM = { email: "", password: "" };

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const nextErrors = {};
    if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!isNonEmpty(form.password)) nextErrors.password = "Password is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await login(form);
      if (result.success) {
        toast.success("Welcome back.");
        navigate("/dashboard");
      } else {
        toast.error(result.message || "Email or password is wrong.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Email or password is wrong."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-xl font-semibold text-ink">Log in</h1>
      <p className="mt-1 text-sm text-muted">Manage your portfolio content.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          error={errors.email}
          autoComplete="email"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          error={errors.password}
          autoComplete="current-password"
        />
        <Button type="submit" loading={submitting} fullWidth icon={LogIn}>
          Log in
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-accent hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
