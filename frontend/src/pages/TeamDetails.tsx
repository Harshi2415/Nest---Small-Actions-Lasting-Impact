import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BackToNest from "../components/common/BackToNext";

const teams = {
  "green-warriors": {
    name: "Green Warriors",
    category: "Clean neighbourhoods",
    location: "Delhi",
    description:
      "A local group turning regular neighbourhood cleanups into a shared habit.",
    members: 42,
    actions: 186,
    nextActivity: "October 11",
    about:
      "Green Warriors brings people together to care for the places they live in. What started as small weekend cleanups has grown into a regular community habit.",
  },
  "plastic-free": {
    name: "Plastic-Free Circle",
    category: "Waste reduction",
    location: "Noida",
    description:
      "A group exploring simple ways to reduce everyday plastic waste.",
    members: 28,
    actions: 94,
    nextActivity: "October 14",
    about:
      "The Plastic-Free Circle focuses on practical changes that make reducing plastic feel achievable in everyday life.",
  },
  "urban-gardeners": {
    name: "Urban Gardeners",
    category: "Greener spaces",
    location: "Gurugram",
    description:
      "People creating greener corners in balconies, rooftops and shared spaces.",
    members: 35,
    actions: 121,
    nextActivity: "October 18",
    about:
      "Urban Gardeners shares ideas, plants and small experiments that help bring more life into the spaces around us.",
  },
};

type Team = (typeof teams)[keyof typeof teams];

export default function TeamDetails() {
  const { id } = useParams();

  const hasJoined = localStorage.getItem(`nest_joined_${id}`) !== null;

  function handleLeaveTeam() {
    localStorage.removeItem(`nest_joined_${id}`);
    window.location.reload();
  }

  const team: Team =
    teams[id as keyof typeof teams] ?? teams["green-warriors"];

  const loggedIn =
    localStorage.getItem("nest_logged_in") === "true";

  return (
    <main className="min-h-screen bg-[#f7f4ec] text-[#173f32]">
      {/* Header */}
      <header className="border-b border-[#dce4d9] bg-[#f7f4ec]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            to="/"
            className="font-display text-2xl font-semibold tracking-tight text-[#173f32]"
          >
            NEST
          </Link>

          {loggedIn ? (
            <Link
              to="/profile"
              className="rounded-full bg-[#285b49] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#214d3e]"
            >
              My Profile
            </Link>
          ) : (
            <Link
              to="/register"
              className="rounded-full bg-[#285b49] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#214d3e]"
            >
              Join the moment
            </Link>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <BackToNest />

        {/* Hero */}
        <section className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#dce9dd] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#416653]">
                Active team
              </span>

              <span className="text-sm text-[#718177]">
                {team.category}
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-[#173f32] sm:text-6xl">
              {team.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#587064]">
              {team.description}
            </p>

            <div className="mt-7 flex items-center gap-2 text-sm text-[#718177]">
              <MapPin size={17} />
              {team.location}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#173f32] p-7 text-white shadow-[0_24px_70px_rgba(38,65,52,0.14)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9db5a4]">
              Next activity
            </p>

            <div className="mt-4 flex items-center gap-3">
              <CalendarDays size={22} className="text-[#b9d4bc]" />
              <p className="text-2xl font-semibold">
                {team.nextActivity}
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#b8c9bd]">
              Small actions become easier when people show up together.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.75rem] border border-[#d8e1d7] bg-white/55 p-6">
            <Users size={20} className="text-[#6b8879]" />
            <p className="mt-5 text-3xl font-semibold text-[#173f32]">
              {team.members}
            </p>
            <p className="mt-1 text-sm text-[#718177]">
              People in the team
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#d8e1d7] bg-white/55 p-6">
            <Check size={20} className="text-[#6b8879]" />
            <p className="mt-5 text-3xl font-semibold text-[#173f32]">
              {team.actions}
            </p>
            <p className="mt-1 text-sm text-[#718177]">
              Actions completed
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#d8e1d7] bg-white/55 p-6">
            <CalendarDays size={20} className="text-[#6b8879]" />
            <p className="mt-5 text-3xl font-semibold text-[#173f32]">
              {team.nextActivity}
            </p>
            <p className="mt-1 text-sm text-[#718177]">
              Next activity
            </p>
          </div>
        </section>

        {/* About */}
        <section className="mt-20 grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
              About the team
            </p>

            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#173f32]">
              A small group can change how a place feels.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-[#587064]">
              {team.about}
            </p>

            <p className="mt-5 text-base leading-7 text-[#718177]">
              There is no need to start with something huge. The idea is
              simply to make one useful choice, share it with others, and
              make the next one easier.
            </p>
          </div>
        </section>

        {/* Upcoming Activity */}
        <section className="mt-20 rounded-[2.5rem] bg-[#e8eee4] p-7 sm:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
                Coming up
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold text-[#173f32]">
                Next community activity
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#587064]">
                Join the team for its next activity and turn a small
                intention into something shared.
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#789083]">
                Date
              </p>
              <p className="mt-2 text-xl font-semibold text-[#285b49]">
                {team.nextActivity}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        {hasJoined ? (
        <section className="mt-20 border-t border-[#d8e1d7] pt-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="font-display text-3xl font-semibold text-[#173f32]">
                You're part of this team.
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#718177]">
                Keep showing up, or step away whenever you feel it's time.
                </p>
            </div>

            <button
                type="button"
                onClick={handleLeaveTeam}
                className="inline-flex w-fit items-center rounded-full border border-[#c9a59b] bg-[#f7eeea] px-6 py-3.5 text-sm font-semibold text-[#8b4c3e] transition hover:-translate-y-0.5 hover:bg-[#f2e4df]"
            >
                Leave this team
            </button>
            </div>
        </section>
        ) : (
        <section className="mt-20 border-t border-[#d8e1d7] pt-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="font-display text-3xl font-semibold text-[#173f32]">
                Ready to take part?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#718177]">
                You don't need to do everything. Just start with one thing.
                </p>
            </div>

            <Link
                to={`/teams/${id}/join`}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#285b49] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#214d3e]"
            >
                Join this team
                <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
                />
            </Link>
            </div>
        </section>
        )}
      </div>
    </main>
  );
}