import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BackToNest() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-sm font-medium text-[#587064] transition hover:text-[#285b49]"
    >
      <ArrowLeft size={16} />
      Back to NEST
    </Link>
  );
}