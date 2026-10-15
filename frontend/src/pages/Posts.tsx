import {
  ArrowUpRight,
  Heart,
  MessageCircle,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import BackToNest from "../components/common/BackToNext";

const posts = [
  {
    id: 1,
    name: "Aarav Mehta",
    initials: "AM",
    location: "Delhi",
    time: "2h ago",
    category: "Small Win",
    title: "One small swap I actually kept doing.",
    content:
      "I started carrying a reusable bottle everywhere this month. It sounds tiny, but after a while it stopped feeling like an extra effort.",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    name: "Mira Kapoor",
    initials: "MK",
    location: "Mumbai",
    time: "5h ago",
    category: "Community",
    title: "Our building finally started composting.",
    content:
      "A few conversations turned into a small composting corner for our building. We are still figuring things out, but everyone is learning together.",
    likes: 67,
    comments: 14,
  },
  {
    id: 3,
    name: "Rohan Sharma",
    initials: "RS",
    location: "Bengaluru",
    time: "Yesterday",
    category: "Idea",
    title: "What if every street had a green corner?",
    content:
      "There is an unused patch near our apartment that could become something useful. Thinking about starting with a few plants and inviting neighbours in.",
    likes: 31,
    comments: 12,
  },
  {
    id: 4,
    name: "Diya Malhotra",
    initials: "DM",
    location: "Pune",
    time: "Yesterday",
    category: "Small Win",
    title: "Walked instead of taking the car.",
    content:
      "Nothing dramatic. Just chose to walk for a short errand today. These are the choices I want to get better at making naturally.",
    likes: 29,
    comments: 5,
  },
  {
    id: 5,
    name: "Kabir Singh",
    initials: "KS",
    location: "Jaipur",
    time: "2 days ago",
    category: "Story",
    title: "A cleanup became a monthly tradition.",
    content:
      "Our first neighbourhood cleanup had six people. Last weekend we had twenty-three. The best part is that nobody had to convince anyone this time.",
    likes: 84,
    comments: 19,
  },
  {
    id: 6,
    name: "Ananya Rao",
    initials: "AR",
    location: "Hyderabad",
    time: "3 days ago",
    category: "Idea",
    title: "Sharing before buying.",
    content:
      "We created a small group where neighbours can ask if someone already owns something before buying it. It has saved money and unnecessary purchases.",
    likes: 53,
    comments: 9,
  },
];

const categories = ["All posts", "Small Wins", "Stories", "Ideas", "Community"];

export default function Posts() {
  return (
    <main className="min-h-screen bg-[#f7f4ec] text-[#173f32]">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#e8eee4] px-6 pb-16 pt-32 lg:px-8">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#c8d9c4]/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-[#dce6cf]/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <BackToNest />

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
              From the community
            </p>

            <h1 className="font-display text-5xl font-semibold tracking-tight text-[#173f32] sm:text-6xl lg:text-7xl">
              Small moments. Shared.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#587064] sm:text-lg">
              Ideas, stories, and everyday actions from people making their
              corners of the world a little better.
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-xl">
            <div className="flex items-center gap-3 rounded-full border border-[#b9c9b9] bg-white/60 px-5 py-3.5 backdrop-blur-sm">
              <Search size={18} className="text-[#718378]" />

              <input
                type="text"
                placeholder="Search the community..."
                className="w-full bg-transparent text-sm text-[#294438] outline-none placeholder:text-[#8a998f]"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-7 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
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

      {/* Community feed */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Posts */}
            <div>
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
                    Latest
                  </p>

                  <h2 className="font-display text-3xl font-semibold text-[#173f32]">
                    What people are sharing
                  </h2>
                </div>

                <span className="hidden text-sm text-[#7a887f] sm:block">
                  {posts.length} posts
                </span>
              </div>

              <div className="space-y-5">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-[2rem] border border-[#d9e0d6] bg-white/55 p-6 transition duration-300 hover:bg-white hover:shadow-[0_18px_50px_rgba(38,65,52,0.07)] sm:p-7"
                  >
                    {/* Author */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-full bg-[#dce9d9] text-sm font-semibold text-[#3f6753]">
                          {post.initials}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#294b3d]">
                            {post.name}
                          </p>

                          <div className="mt-1 flex items-center gap-2 text-xs text-[#7a897f]">
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={12} />
                              {post.location}
                            </span>

                            <span>·</span>
                            <span>{post.time}</span>
                          </div>
                        </div>
                      </div>

                      <span className="rounded-full bg-[#e8eee4] px-3 py-1.5 text-xs font-semibold text-[#587064]">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <Link to={`/posts/${post.id}`} className="block">
                      <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-[#244b3c] transition group-hover:text-[#285b49]">
                        {post.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#65786d]">
                        {post.content}
                      </p>
                    </Link>

                    {/* Actions */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#e0e5de] pt-5">
                      <div className="flex items-center gap-5 text-sm text-[#75857b]">
                        <button className="inline-flex items-center gap-2 transition hover:text-[#285b49]">
                          <Heart size={17} />
                          {post.likes}
                        </button>

                        <button className="inline-flex items-center gap-2 transition hover:text-[#285b49]">
                          <MessageCircle size={17} />
                          {post.comments}
                        </button>
                      </div>

                      <Link
                        to={`/posts/${post.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#285b49]"
                      >
                        Read more
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            {localStorage.getItem("nest_logged_in") !== "true" && (
                <aside className="lg:pt-16">
                <div className="sticky top-28 rounded-[2rem] bg-[#173f32] p-7 text-white">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
                    <Sparkles size={20} className="text-[#b9d4bc]" />
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-semibold">
                    Your small win could inspire someone else.
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#b8c9bd]">
                    NEST is built around the idea that meaningful change doesn't
                    have to start big.
                    </p>

                    <Link
                    to="/register"
                    className="mt-7 inline-flex rounded-full bg-[#e5efe2] px-5 py-3 text-sm font-semibold text-[#285b49] transition hover:-translate-y-0.5 hover:bg-white"
                    >
                    Join the moment
                    </Link>
                </div>
                </aside>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}