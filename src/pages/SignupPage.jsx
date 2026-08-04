import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import AuthLayout from "../components/layout/AuthLayout";
import { isNonEmpty, isValidEmail } from "../utils/validators";
import { getErrorMessage } from "../utils/getErrorMessage";

const INITIAL_FORM = { username: "", email: "", password: "" };

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const nextErrors = {};
    if (!isNonEmpty(form.username)) nextErrors.username = "Username is required.";
    if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await signup(form);
      if (result.success) {
        toast.success("Account created. Please log in.");
        navigate("/login");
      } else {
        toast.error(result.message || "Could not create your account.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not create your account."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-xl font-semibold text-ink">Create your account</h1>
      <p className="mt-1 text-sm text-muted">Build your portfolio in a few minutes.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          error={errors.username}
          autoComplete="username"
        />
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
          autoComplete="new-password"
        />
        <Button type="submit" loading={submitting} fullWidth icon={UserPlus}>
          Sign up
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-accent hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
