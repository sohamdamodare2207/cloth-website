"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, signUp, user, loading, supabaseReady } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  if (user) {
    router.replace("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    const fn = isSignUp ? signUp : signIn;
    const { error } = await fn(email, password);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    if (isSignUp) {
      setMessage({ type: "success", text: "Check your email to confirm your account." });
    } else {
      router.replace("/");
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-charcoal/70">Loading...</p>
      </div>
    );
  }

  if (!supabaseReady) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-charcoal">
          <h2 className="font-serif text-lg font-semibold">Supabase not configured</h2>
          <p className="mt-2 text-sm text-charcoal/80">
            Sign in uses Supabase. Add your project credentials to <code className="rounded bg-amber-100 px-1">.env.local</code> (see <code className="rounded bg-amber-100 px-1">.env.local.example</code>).
          </p>
          <p className="mt-3 text-xs text-charcoal/60">
            Get them from: Supabase Dashboard → your project → Settings → API
          </p>
          <Link href="/" className="mt-4 inline-block text-sm font-medium text-terracotta hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-2xl font-semibold text-charcoal">
        {isSignUp ? "Create account" : "Sign in"}
      </h1>
      <p className="mt-2 text-sm text-charcoal/70">
        {isSignUp ? "Sign up with your email." : "Sign in to your account."}
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal/80">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-charcoal"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-charcoal/80">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-charcoal"
            placeholder="••••••••"
          />
        </div>
        {message.text && (
          <p className={`text-sm ${message.type === "error" ? "text-red-600" : "text-green-700"}`}>
            {message.text}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-full bg-charcoal px-4 py-3 text-sm font-medium text-white hover:bg-charcoal/90"
        >
          {isSignUp ? "Sign up" : "Sign in"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => { setIsSignUp(!isSignUp); setMessage({ type: "", text: "" }); }}
        className="mt-4 w-full text-center text-sm text-charcoal/70 hover:text-charcoal"
      >
        {isSignUp ? "Already have an account? Sign in" : "No account? Sign up"}
      </button>
      <Link href="/" className="mt-6 block text-center text-sm text-charcoal/60 hover:text-charcoal">
        ← Back to home
      </Link>
    </div>
  );
}
