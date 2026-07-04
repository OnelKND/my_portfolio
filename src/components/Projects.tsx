import { useState, useEffect } from "react";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";
import Title from "./Title";

import img1 from "../assets/projects/1.png";
import img2 from "../assets/projects/2.png";
import img3 from "../assets/projects/3.png";
import img4 from "../assets/projects/4.png";
import img5 from "../assets/projects/5.png";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  demoLink: string;
  repoLink: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Abonnement Newsletter",
    description: "Application d'inscription et de gestion d'une newsletter avec envoi automatisé d'e-mails.",
    technologies: ["React", "Node.js", "Tailwind CSS", "MailChimp"],
    demoLink: "#",
    repoLink: "https://github.com/OnelKND/newsletter",
    image: img1,
  },
  {
    id: 2,
    title: "Gestion d'utilisateurs",
    description: "Système de gestion des utilisateurs avec authentification et administration.",
    technologies: ["Django", "Python", "Html", "DaisyUI"],
    demoLink: "#",
    repoLink: "https://github.com/OnelKND/django_app",
    image: img2,
  },
  {
    id: 3,
    title: "Green Cycle",
    description: "Plateforme de gestion et suivi d'un projet de recyclage et d'écologie.",
    technologies: ["MySQL", "PHP", "CSS"],
    demoLink: "#",
    repoLink: "https://github.com/OnelKND/Green_Cycle",
    image: img3,
  },
  {
    id: 4,
    title: "Gest_Finance",
    description: "Application de gestion financière pour suivre revenus et dépenses.",
    technologies: ["Typescript", "DaisyUI", "TailwindCSS"],
    demoLink: "#",
    repoLink: "https://github.com/OnelKND/Gest_Finance",
    image: img4,
  },
  {
    id: 5,
    title: "Nel_Dev AI",
    description: "Assistant IA permettant d’analyser un site web à partir d’une URL et de poser des questions sur son contenu.",    technologies: ["NextJS", "DaisyUI", "MetaLLama"],
    demoLink: "#",
    repoLink: "https://github.com/OnelKND/ia_perso",
    image: img5,
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const projectsPerPage = 3;
  const totalSlides = Math.ceil(projects.length / projectsPerPage);

  const nextSlide = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Reset direction after animation completes
  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => setDirection(null), 500);
      return () => clearTimeout(timer);
    }
  }, [direction, currentIndex]);

  const visibleProjects = projects.slice(
    currentIndex * projectsPerPage,
    currentIndex * projectsPerPage + projectsPerPage
  );

  return (
    <section className="py-16" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title title="Mes projets" />

        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          Découvrez quelques-uns de mes projets récents. Chaque projet est une
          opportunité d'apprentissage et de création de solutions innovantes.
        </p>

        {/* Projects Carousel / Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out ${direction === "right" ? "translate-x-[-20px] opacity-0" : direction === "left" ? "translate-x-[20px] opacity-0" : ""}`}>
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-fadeInUp group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-base-200/30 to-transparent z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">
                  {project.title}
                </h3>
                <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-base-300 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.repoLink}
                    className="btn btn-secondary btn-sm flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    Voir sur GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="btn btn-circle btn-secondary"
              aria-label="Projet précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-secondary w-8"
                      : "bg-base-300 hover:bg-base-content/30"
                  }`}
                  aria-label={`Aller au slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="btn btn-circle btn-secondary"
              aria-label="Projet suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;