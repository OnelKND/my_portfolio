import { useState, useEffect } from "react"; // 1. Importation des hooks React
import { Mail, Github, ArrowDown, Code2 } from "lucide-react";

const codeLines = [
  "const dev = {",
  "  name: 'Ange-Onel KOUNDE',",
  "  role: 'Full-Stack Developer',",
  "  stack: ['React', 'Node.js', 'TS'],",
  "  passion: true,",
  "};",
];

const TICK_MS = 35;
const PAUSE_TICKS = Math.round(2000 / TICK_MS);

// Precomputed once: each frame is the full lines array at that reveal step.
const codeFrames: string[][] = (() => {
  const frames: string[][] = [];
  const current: string[] = [];
  codeLines.forEach((full, li) => {
    current[li] = "";
    for (let c = 1; c <= full.length; c++) {
      current[li] = full.slice(0, c);
      frames.push([...current]);
    }
  });
  return frames;
})();

const cycleLength = codeFrames.length + PAUSE_TICKS;

const Home = () => {
  const [salutation, setSalutation] = useState("Bonjour");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const heure = new Date().getHours();
    if (heure >= 5 && heure < 13) {
      setSalutation("Bonjour");
    } else {
      setSalutation("Bonsoir");
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => (t + 1) % cycleLength);
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const displayedLines = codeFrames[Math.min(tick, codeFrames.length - 1)];

  return (
    <section
      className="min-h-screen flex items-center justify-center pt-16"
      id="home"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className=" inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-2">
               Disponible pour de nouvelles opportunités
            </div>

            {/* 4. Affichage dynamique de la salutation ici */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {salutation}, je suis{" "}
              <span className="text-secondary block mt-2">KOUNDE Ange-Onel</span>
              <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold mt-2 text-base-content/80">
                Développeur web et mobile à Cotonou, Bénin
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-base-content/70 max-w-xl mx-auto lg:mx-0">
              Développeur web et mobile full-stack basé à Cotonou, Bénin, avec{" "}
              <span className="font-semibold text-primary">4 ans d'expérience</span>.
              Je conçois des sites web, applications mobiles et solutions sur mesure,
              modernes, performantes et orientées utilisateur, pour les entreprises et
              particuliers au Bénin.
            </p>

            {/* Tech Stack Badge */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-base-200 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href="#contact"
                className="btn btn-secondary btn-lg"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5" />
                Me contacter
              </a>
              <a
                href="#projects"
                className="btn btn-outline btn-lg"
              >
                Voir mes projets
                <ArrowDown className="w-5 h-5" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4 pt-4">
              <a
                href="https://github.com/OnelKND"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right Content - Animated Code Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-96 lg:w-[26rem]">
              {/* Decorative morphing blob */}
              <div className="absolute -inset-6 bg-gradient-to-r from-secondary via-primary to-secondary opacity-20 blur-3xl animate-blob-morph"></div>

              {/* Floating tech icons */}
              <div className="absolute -top-6 left-6 bg-base-100 p-2.5 rounded-xl shadow-lg animate-float">
                <Code2 className="w-5 h-5 text-secondary" />
              </div>
              <div
                className="absolute top-8 -right-6 bg-base-100 p-2.5 rounded-xl shadow-lg animate-float"
                style={{ animationDelay: "1s" }}
              >
                <Github className="w-5 h-5 text-secondary" />
              </div>

              {/* Code editor card */}
              <div className="relative bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-base-200 border-b border-base-300">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>
                <pre className="p-6 text-sm sm:text-base font-mono leading-relaxed min-h-[220px] text-left overflow-x-auto">
                  {displayedLines.map((line, i) => (
                    <div key={i}>
                      <span className="text-base-content/80">{line}</span>
                      {i === displayedLines.length - 1 && (
                        <span className="inline-block w-2 h-4 bg-secondary ml-0.5 animate-blink-caret align-middle"></span>
                      )}
                    </div>
                  ))}
                </pre>
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 bg-base-100 p-3 rounded-xl shadow-lg">
                <div className="text-center">
                  <span className="text-2xl font-bold text-secondary">4+</span>
                  <p className="text-xs text-base-content/60">Années d'exp</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-base-100 p-3 rounded-xl shadow-lg">
                <div className="text-center">
                  <span className="text-2xl font-bold text-secondary">20+</span>
                  <p className="text-xs text-base-content/60">Projets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;