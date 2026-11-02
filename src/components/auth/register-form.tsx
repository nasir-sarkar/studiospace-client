"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
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
import { authClient } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { GoogleButton } from "./google-button";

const passwordRules = [
  { label: "At least one uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "At least one lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "Minimum 6 characters", test: (value: string) => value.length >= 6 },
];

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError("");

    const failedRule = passwordRules.find((rule) => !rule.test(password));
    if (failedRule) {
      const message = `Password error: ${failedRule.label.toLowerCase()} is required.`;
      setPasswordError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
    };

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      image: user.image,
      password,
    });

    if (error || !data) {
      toast.error(error?.message || "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Account created. Please login to continue.");
    router.push(
      `/login${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`,
    );
  };

  return (
    <form onSubmit={handleRegister}>
      <FieldGroup>
        <Field>
          <GoogleButton redirectTo={redirectTo} />
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or register with email
        </FieldSeparator>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            className="h-10"
            required
          />
        </Field>
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
          <FieldLabel htmlFor="image">Photo URL</FieldLabel>
          <Input
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/your-photo.jpg"
            className="h-10"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(passwordError)}
            className="h-10"
            required
          />
          <ul className="mt-1 grid gap-1">
            {passwordRules.map((rule) => {
              const passed = rule.test(password);
              return (
                <li
                  key={rule.label}
                  className={cn(
                    "flex items-center gap-2 text-xs",
                    passed ? "text-green-600 dark:text-green-400" : "text-muted-foreground",
                  )}
                >
                  {passed ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                  {rule.label}
                </li>
              );
            })}
          </ul>
          {passwordError && (
            <p role="alert" className="text-sm text-destructive">
              {passwordError}
            </p>
          )}
        </Field>
        <Field>
          <Button type="submit" size="lg" disabled={loading}>
            {loading && <Spinner />}
            Register
          </Button>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link
              href={`/login${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
              className="font-semibold text-primary"
            >
              Login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
