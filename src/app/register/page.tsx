import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Join StudioSpace"
      description="Create your account to book spaces or host your own studio."
    >
      <RegisterForm />
    </AuthShell>
  );
}
