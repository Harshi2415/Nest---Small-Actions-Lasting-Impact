import {
  ArrowRight,
  LockKeyhole,
  Mail,
  Leaf,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackToNest from "../components/common/BackToNext";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const storedUser = localStorage.getItem("nest_user");

    if (!storedUser) {
      setError("No NEST account found. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (email !== user.email) {
      setError("Email address doesn't match the registered account.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    localStorage.setItem("nest_logged_in", "true");

    navigate("/profile");
  }

  return (
    <main className="min-h-screen bg-[#f7f4ec] text-[#173f32]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left */}
        <section className="relative hidden overflow-hidden bg-[#173f32] lg:flex">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#315c49]/40 blur-3xl" />

          <div className="absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-[#557861]/25 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <BackToNest />

            <div className="max-w-xl">
              <Leaf
                size={32}
                strokeWidth={1.4}
                className="mb-8 text-[#b9d4bc]"
              />

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9db5a4]">
                Welcome back
              </p>

              <h1 className="mt-5 font-display text-5xl font-semibold leading-tight text-white xl:text-6xl">
                Your small actions still matter.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-[#b8c9bd]">
                Pick up where you left off, reconnect with your teams, and
                keep sharing the things that matter to you.
              </p>
            </div>

            <p className="text-xs text-[#81988a]">
              A place for everyday actions that matter.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <BackToNest />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
                Log in
              </p>

              <h2 className="mt-3 font-display text-4xl font-semibold text-[#173f32]">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#718177]">
                Log in to access your NEST profile and community.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#355443]"
                >
                  Email address
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-[#d4ddd3] bg-white/65 px-4 py-3.5 transition focus-within:border-[#789681] focus-within:bg-white">
                  <Mail size={18} className="text-[#789083]" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm text-[#294438] outline-none placeholder:text-[#9aa79e]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#355443]"
                >
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-[#d4ddd3] bg-white/65 px-4 py-3.5 transition focus-within:border-[#789681] focus-within:bg-white">
                  <LockKeyhole size={18} className="text-[#789083]" />

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm text-[#294438] outline-none placeholder:text-[#9aa79e]"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl bg-[#f3dfd8] px-4 py-3 text-sm text-[#8b4c3e]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#285b49] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#214d3e]"
              >
                Log in

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#718177]">
              New to NEST?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#285b49] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}