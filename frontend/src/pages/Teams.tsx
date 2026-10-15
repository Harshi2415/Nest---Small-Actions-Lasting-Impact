import {
  ArrowUpRight,
  CalendarDays,
  Leaf,
  MapPin,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import BackToNest from "../components/common/BackToNext";

const teams = [
  {
    name: "Green Warriors",
    description:
      "A local group turning regular neighborhood cleanups into a shared habit.",
    location: "Delhi",
    members: 42,
    actions: 186,
    nextActivity: "Oct 11",
    category: "Clean Communities",
    featured: true,
  },
  {
    name: "Urban Gardeners",
    description:
      "Growing greener corners together, from balconies to shared community spaces.",
    location: "Delhi",
    members: 28,
    actions: 94,
    nextActivity: "Oct 14",
    category: "Green Spaces",
    featured: false,
  },
  {
    name: "Plastic-Free Circle",
    description:
      "Small everyday choices that help reduce unnecessary single-use plastic.",
    location: "Mumbai",
    members: 36,
    actions: 143,
    nextActivity: "Oct 16",
    category: "Low Waste",
    featured: false,
  },
  {
    name: "Neighbourhood Care",
    description:
      "People making their streets, shared spaces, and local communities better.",
    location: "Bengaluru",
    members: 51,
    actions: 217,
    nextActivity: "Oct 18",
    category: "Community",
    featured: false,
  },
  {
    name: "Everyday Earth",
    description:
      "A community focused on practical environmental habits that fit everyday life.",
    location: "Pune",
    members: 31,
    actions: 128,
    nextActivity: "Oct 20",
    category: "Everyday Action",
    featured: false,
  },
  {
    name: "The Refill Club",
    description:
      "Making refill, reuse, and conscious consumption easier through collective action.",
    location: "Jaipur",
    members: 24,
    actions: 87,
    nextActivity: "Oct 22",
    category: "Low Waste",
    featured: false,
  },
];

const categories = [
  "All teams",
  "Community",
  "Green Spaces",
  "Low Waste",
  "Clean Communities",
];

export default function Teams() {
  return (
    <main className="min-h-screen bg-[#f7f4ec] text-[#173f32]">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#e8eee4] px-6 pb-20 pt-32 lg:px-8">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#c8d9c4]/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-[#dce6cf]/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <BackToNest />

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
              Find your people
            </p>

            <h1 className="font-display text-5xl font-semibold tracking-tight text-[#173f32] sm:text-6xl lg:text-7xl">
              Better together.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#587064] sm:text-lg">
              Teams bring small actions together. Find a community that
              matches what you care about and turn good intentions into
              something shared.
            </p>
          </div>

          {/* Categories */}
          <div className="mt-10 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  index === 0
                    ? "border-[#285b49] bg-[#285b49] text-white"
                    : "border-[#aabdad] bg-white/45 text-[#496555] hover:bg-white/75"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Featured */}
          <div className="mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
              Featured team
            </p>

            <div className="overflow-hidden rounded-[2.5rem] bg-[#173f32] p-7 text-white shadow-[0_24px_70px_rgba(38,65,52,0.12)] sm:p-10">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-[#dce9dd]">
                    <span className="h-2 w-2 rounded-full bg-[#9bc59d]" />
                    Active team
                  </div>

                  <h2 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">
                    Green Warriors
                  </h2>

                  <p className="mt-4 max-w-xl text-base leading-7 text-[#b8c9bd]">
                    A local group turning regular neighborhood cleanups into a
                    shared habit — one street, one action, one weekend at a
                    time.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-5 text-sm text-[#b8c9bd]">
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} />
                      Delhi
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Users size={16} />
                      42 members
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Leaf size={16} />
                      186 actions
                    </span>
                  </div>
                </div>

                <Link
                  to="/teams/green-warriors"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#e5efe2] px-5 py-3 text-sm font-semibold text-[#285b49] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Explore team
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* All teams */}
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
                Explore
              </p>

              <h2 className="font-display text-3xl font-semibold text-[#173f32] sm:text-4xl">
                Find a team that feels right.
              </h2>
            </div>

            <span className="hidden text-sm text-[#718378] sm:block">
              {teams.length} communities
            </span>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <article
                key={team.name}
                className="group flex min-h-[330px] flex-col rounded-[2rem] border border-[#d7dfd3] bg-white/55 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_50px_rgba(38,65,52,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-[#e5eee3] px-3 py-1.5 text-xs font-semibold text-[#547060]">
                    {team.category}
                  </span>

                  <div className="grid h-9 w-9 place-items-center rounded-full border border-[#d5dfd5] text-[#557261] transition group-hover:border-[#9eb6a4] group-hover:bg-[#e8eee4]">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <h3 className="mt-7 font-display text-2xl font-semibold text-[#244b3c]">
                  {team.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#667a6e]">
                  {team.description}
                </p>

                <div className="mt-auto pt-7">
                  <div className="flex flex-wrap gap-4 border-t border-[#dfe5dd] pt-5 text-xs text-[#75867b]">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} />
                      {team.location}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} />
                      {team.members}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Leaf size={14} />
                      {team.actions}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-[#728277]">
                      <CalendarDays size={14} />
                      Next activity · {team.nextActivity}
                    </span>

                    <Link
                      to={`/teams/${team.name
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                      className="font-semibold text-[#285b49] hover:underline"
                    >
                      View team
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#dfe9db] px-7 py-14 text-center sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
            Don't see your kind of team?
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold text-[#173f32] sm:text-4xl">
            Maybe you're the person who should start one.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#617569]">
            NEST grows through people who decide to turn a small idea into a
            shared one.
          </p>

          <Link
            to="/register"
            className="mt-7 inline-flex rounded-full bg-[#285b49] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#214d3e]"
          >
            Join the moment
          </Link>
        </div>
      </section>
    </main>
  );
}