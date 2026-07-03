import { useState, useEffect } from "react";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Title from "./Title";

import img1 from "../assets/projects/1.png";
import img2 from "../assets/projects/2.png";
import img3 from "../assets/projects/3.png";
import img4 from "../assets/projects/4.png";
import img5 from "../assets/projects/5.png";
import img6 from "../assets/projects/6.png";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  demoLink: string;
  repoLink: string;
  image: string;
}

// NOTE: Remplace ces données par tes vrais projets!
// Pour chaque projet: nom, description courte (1-2 phrases), les techs utilisées, et les liens
const projects: Project[] = [
  {
    id: 1,
    title: "Gestionnaire de tâches",
    description:
      "Application web complète pour la gestion de projets et tâches. Fonctionnalités: tableaux Kanban, assignation de tâches, deadlines et notifications.",
    technologies: ["React", "Node.js", "Tailwind CSS", "MongoDB"],
    demoLink: "#",
    repoLink: "#",
    image: img1,
  },
  {
    id: 2,
    title: "Plateforme E-commerce",
    description:
      "Boutique en ligne complète avec panier, paiement sécurisé, gestion des commandes et interface d'administration.",
    technologies: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    demoLink: "#",
    repoLink: "#",
    image: img2,
  },
  {
    id: 3,
    title: "Portfolio interactif",
    description:
      "Portfolio créatif avec animations fluides, design responsive et optimisation SEO pour un développeur.",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    demoLink: "#",
    repoLink: "#",
    image: img3,
  },
  {
    id: 4,
    title: "Application de Chat",
    description:
      "Application de messagerie temps réel avec salons privés, partage de fichiers et notifications en direct.",
    technologies: ["React", "Socket.io", "Express.js", "MongoDB"],
    demoLink: "#",
    repoLink: "#",
    image: img4,
  },
  {
    id: 5,
    title: "Système de réservation",
    description:
      "Plateforme de réservation de salles de réunion avec calendrier interactif, gestion des utilisateurs et notifications.",
    technologies: ["Next.js", "MongoDB", "Chakra UI", "Node.js"],
    demoLink: "#",
    repoLink: "#",
    image: img5,
  },
  {
    id: 6,
    title: "API RESTful",
    description:
      "API backend robuste avec authentification JWT, documentation Swagger et gestion complète des données.",
    technologies: ["Node.js", "Express", "PostgreSQL", "Docker"],
    demoLink: "#",
    repoLink: "#",
    image: img6,
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
                <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent z-10" />
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
                    href={project.demoLink}
                    className="btn btn-secondary btn-sm flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                  <a
                    href={project.repoLink}
                    className="btn btn-ghost btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
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