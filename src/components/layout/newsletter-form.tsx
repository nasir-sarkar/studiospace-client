"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("You are subscribed. Watch your inbox for new studio drops.");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex w-full max-w-xs items-center rounded-lg bg-white/10 ring-1 ring-white/15 focus-within:ring-primary"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/60"
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="px-4 text-white transition-colors hover:text-primary"
      >
        <ArrowUpRight className="size-5" />
      </button>
    </form>
  );
}
