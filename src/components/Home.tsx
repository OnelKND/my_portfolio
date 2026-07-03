import { useState, useEffect } from "react"; // 1. Importation des hooks React
import { Mail, Github, ArrowDown } from "lucide-react";
import img from "../assets/img.png";

const Home = () => {
  const [salutation, setSalutation] = useState("Bonjour");

  useEffect(() => {
    const heure = new Date().getHours();
    if (heure >= 5 && heure < 13) {
      setSalutation("Bonjour");
    } else {
      setSalutation("Bonsoir");
    }
  }, []);

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
            </h1>

            <p className="text-lg sm:text-xl text-base-content/70 max-w-xl mx-auto lg:mx-0">
              Développeur Full-Stack passionné avec{" "}
              <span className="font-semibold text-primary">4 ans d'expérience</span>.
              Je crée des applications web modernes, performantes et orientées utilisateur.
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

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary via-primary to-secondary rounded-full opacity-20 blur-3xl"></div>

              <div className="relative">
                <img
                  src={img}
                  alt="KOUNDE Ange-Onel - Développeur Full-Stack"
                  className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full border-4 border-secondary shadow-2xl"
                />

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
      </div>
    </section>
  );
};

export default Home;