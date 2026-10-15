import { Heart, Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#173f32] px-6 py-14 text-[#eef3e8]">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dbe9d2] text-[#173f32]">
            <Leaf size={18} />
          </span>

          <span className="font-display text-xl font-semibold">
            NEST
          </span>
        </div>

        <p className="mt-4 max-w-sm text-sm leading-6 text-[#b8c9bd]">
          A community where small environmental actions become collective
          change.
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm text-[#b8c9bd]">
          Made with
          <Heart size={15} fill="currentColor" />
          for a cleaner world.
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-center text-xs text-[#91aa9b]">
        © {new Date().getFullYear()} NEST. Community-powered environmental
        action.
      </div>
    </footer>
  );
}