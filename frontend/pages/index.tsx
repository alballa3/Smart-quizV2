import Header from "@/components/layout/header";
import Hero from "@/components/pages/index/hero";
import AboutUs from "@/components/pages/index/aboutus";
import Features from "@/components/pages/index/features";
import GetStartedSection from "@/components/pages/index/started";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-950/30 via-blue-900/10 to-transparent -z-10"></div>
      <Header />
      <main>
        <Hero />
        <Features />
        <AboutUs />
        <GetStartedSection />
      </main>
    </div>
  );
}
