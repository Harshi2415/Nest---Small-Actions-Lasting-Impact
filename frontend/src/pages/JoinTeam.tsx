import { ArrowRight, CalendarDays, Check, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BackToNest from "../components/common/BackToNext";

const teamNames: Record<string, string> = {
  "green-warriors": "Green Warriors",
  "plastic-free": "Plastic-Free Circle",
  "urban-gardeners": "Urban Gardeners",
};

export default function JoinTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const teamName = teamNames[id ?? ""] ?? "Green Warriors";

  const [message, setMessage] = useState("");

  const loggedIn =
    localStorage.getItem("nest_logged_in") === "true";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!loggedIn) {
      navigate("/register");
      return;
    }

    localStorage.setItem(
      `nest_joined_${id}`,
      JSON.stringify({
        teamId: id,
        teamName,
        joinedAt: new Date().toISOString(),
        message,
      })
    );

    navigate(`/teams/${id}?joined=true`);
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#f7f4ec] px-6 py-10 text-[#173f32]">
        <div className="mx-auto max-w-2xl">
          <BackToNest />

          <div className="mt-20 rounded-[2.5rem] border border-[#d8e1d7] bg-white/60 p-8 text-center sm:p-12">
            <h1 className="font-display text-4xl font-semibold">
              Join {teamName}
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#718177]">
              You need a NEST account before joining a team.
              Create one and come back to take part.
            </p>

            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#285b49] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#214d3e]"
            >
              Create an account
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ec] text-[#173f32]">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <BackToNest />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Intro */}
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
              Join a team
            </p>

            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight">
              Be part of {teamName}.
            </h1>

            <p className="mt-5 text-base leading-7 text-[#587064]">
              You're not signing up for everything. You're simply
              choosing to show up for something that matters.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#587064]">
                <Users size={18} className="text-[#6b8879]" />
                Meet people working toward the same goal.
              </div>

              <div className="flex items-center gap-3 text-sm text-[#587064]">
                <CalendarDays size={18} className="text-[#6b8879]" />
                Take part in upcoming team activities.
              </div>

              <div className="flex items-center gap-3 text-sm text-[#587064]">
                <Check size={18} className="text-[#6b8879]" />
                Turn small actions into shared progress.
              </div>
            </div>
          </section>

          {/* Form */}
          <section className="rounded-[2.5rem] border border-[#d8e1d7] bg-white/65 p-7 shadow-[0_20px_60px_rgba(38,65,52,0.07)] sm:p-9">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6b8879]">
                Almost there
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold">
                Confirm your spot.
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#718177]">
                Add an optional note about why you'd like to join.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-[#355443]"
              >
                Why do you want to join?
                <span className="ml-1 font-normal text-[#9aa79e]">
                  (optional)
                </span>
              </label>

              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Tell the team a little about what you'd like to contribute..."
                className="w-full resize-none rounded-2xl border border-[#d4ddd3] bg-white/70 px-4 py-3.5 text-sm leading-6 text-[#294438] outline-none transition placeholder:text-[#9aa79e] focus:border-[#789681] focus:bg-white"
              />

              <button
                type="submit"
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#285b49] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#214d3e]"
              >
                Join team
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}