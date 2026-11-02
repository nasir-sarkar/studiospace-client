"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { syncSession } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { GoogleButton } from "./google-button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const credentials = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error: loginError } = await authClient.signIn.email(credentials);

    if (loginError || !data) {
      const message = loginError?.message || "Invalid email or password.";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    await syncSession();
    toast.success("Welcome back to StudioSpace.");
    router.push(redirectTo);
    router.refresh();
  };

  const handleForgotPassword = () => {
    toast.info("Password reset is not available in this release.");
  };

  return (
    <form onSubmit={handleLogin}>
      <FieldGroup>
        <Field>
          <GoogleButton redirectTo={redirectTo} />
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with email
        </FieldSeparator>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="h-10"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="ml-auto text-sm text-primary underline-offset-4 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="h-10"
            required
          />
        </Field>
        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <Field>
          <Button type="submit" size="lg" disabled={loading}>
            {loading && <Spinner />}
            Login
          </Button>
          <FieldDescription className="text-center">
            New to StudioSpace?{" "}
            <Link
              href={`/register${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
              className="font-semibold text-primary"
            >
              Register
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
