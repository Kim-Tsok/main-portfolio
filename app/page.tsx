import Header from "@/components/header";
import Hero from "@/components/hero";
import Work from "@/components/work";
import About from "@/components/about";
import Services from "@/components/services";
import Contact from "@/components/contact";
import MotionProvider from "@/components/motion-provider";
import { getProjects, getSkills, getServices, isClientProject } from "@/lib/data";

export default async function Home() {
  const [projects, skills, services] = await Promise.all([
    getProjects(),
    getSkills(),
    getServices(),
  ]);

  const clientCount = projects.filter(isClientProject).length;

  return (
    <MotionProvider>
      <div className="grid-paper min-h-svh">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main>
          <Hero />
          <Work projects={projects} />
          <About
            skills={skills}
            projectCount={projects.length}
            clientCount={clientCount}
          />
          <Services services={services} />
          <Contact />
        </main>
      </div>
    </MotionProvider>
  );
}
