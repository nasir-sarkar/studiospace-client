import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Login to manage your bookings, listings and saved studios."
    >
      <LoginForm />
    </AuthShell>
  );
}
