import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/hero/Hero";
import SmallWin from "../components/home/SmallWin";
import Highlights from "../components/home/Highlights";
import ImpactPreview from "../components/home/ImpactPreview";
import TeamPreview from "../components/home/TeamPreview";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f4ec]">
      <Navbar />

      <main>
        <Hero />
        <SmallWin />
        <Highlights />
        <ImpactPreview />
        <TeamPreview />
      </main>

      <Footer />
    </div>
  );
}