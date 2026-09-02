"use client";

import { useState } from "react";
import { X, Mail, Lock, User, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@/components/ui/LogoIcon";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; travelStyle?: string }) => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [travelStyle, setTravelStyle] = useState("Balanced");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) return;

    try {
      const storedUsersRaw = localStorage.getItem("sanchari_users");
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      if (isLogin) {
        const existingUser = storedUsers.find(
          (user: { email?: string; password?: string }) =>
            String(user.email).toLowerCase() === email.toLowerCase() && user.password === password
        );

        if (!existingUser) {
          setErrorMessage("Account not found. Please sign up first.");
          return;
        }

        const userData = {
          name: existingUser.name || email.split("@")[0] || "Traveler",
          email: existingUser.email,
          travelStyle: existingUser.travelStyle || travelStyle,
          loggedInAt: new Date().toISOString(),
        };

        localStorage.setItem("sanchari_user", JSON.stringify(userData));
        setErrorMessage("");
        setSubmitted(true);

        setTimeout(() => {
          onLoginSuccess(userData);
          onClose();
          setSubmitted(false);
        }, 1000);
        return;
      }

      const emailAlreadyExists = storedUsers.some(
        (user: { email?: string }) => String(user.email).toLowerCase() === email.toLowerCase()
      );

      if (emailAlreadyExists) {
        setErrorMessage("This email is already registered. Please sign in instead.");
        return;
      }

      const userData = {
        name,
        email,
        password,
        travelStyle,
        loggedInAt: new Date().toISOString(),
      };

      localStorage.setItem("sanchari_users", JSON.stringify([...storedUsers, userData]));
      localStorage.setItem("sanchari_user", JSON.stringify({
        name,
        email,
        travelStyle,
        loggedInAt: userData.loggedInAt,
      }));
      setErrorMessage("");
      setSubmitted(true);

      setTimeout(() => {
        onLoginSuccess({ name, email, travelStyle });
        onClose();
        setSubmitted(false);
      }, 1000);
    } catch (error) {
      setErrorMessage("Unable to save your account right now. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0E172F] p-6 sm:p-8 text-warm-white shadow-2xl space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-2 text-zinc-400 hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <LogoIcon className="h-8 w-8" />
            <span className="font-mono text-xs text-saffron uppercase font-bold tracking-wider">
              SANCHARI BHARAT
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-warm-white">
            {isLogin ? "Welcome Back" : "Join Sanchari Bharat"}
          </h3>
          <p className="text-xs text-muted-gray">
            {isLogin
              ? "Access your saved AI itineraries and verified reviews."
              : "Create an account to save trips, customize AI preferences, and discover hidden gems."}
          </p>
        </div>

        {submitted ? (
          <div className="my-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-6 text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check className="h-6 w-6" />
            </div>
            <p className="font-display text-lg font-bold text-warm-white">
              {isLogin ? "Signed In Successfully!" : "Account Created!"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                {errorMessage}
              </div>
            )}
            {!isLogin && (
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-gray" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Iyer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-navy-dark pl-10 pr-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-saffron"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-gray" />
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-navy-dark pl-10 pr-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-saffron"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-gray" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-navy-dark pl-10 pr-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-saffron"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full justify-center !py-2.5 text-xs mt-2">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-saffron hover:underline cursor-pointer"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

