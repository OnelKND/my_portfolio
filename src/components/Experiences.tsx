import Title from "./Title";

import imgCSS from "../assets/techno/css.png";
import imgJS from "../assets/techno/js.png";
import imgREACT from "../assets/techno/react.png";
import imgHTML from "../assets/techno/html.png";
import imgwordpress from "../assets/techno/WordPress.png";
import imgNODE from "../assets/techno/node-js.png";
import imgprisma from "../assets/techno/prisma.png";
import imgTAILWIND from "../assets/techno/tailwind.png";
import imgphp from "../assets/techno/php.png";
import imgnext from "../assets/techno/nextjs.png";

import { Code2, Database, Palette, Layers } from "lucide-react";

const skills = [
  { id: 1, name: "HTML", image: imgHTML, category: "Frontend" },
  { id: 2, name: "CSS", image: imgCSS, category: "Frontend" },
  { id: 3, name: "JavaScript", image: imgJS, category: "Frontend" },
  { id: 4, name: "React", image: imgREACT, category: "Frontend" },
  { id: 5, name: "Next.js", image: imgnext, category: "Frontend" },
  { id: 6, name: "Tailwind CSS", image: imgTAILWIND, category: "Frontend" },
  { id: 7, name: "Node.js", image: imgNODE, category: "Backend" },
  { id: 8, name: "PHP", image: imgphp, category: "Backend" },
  { id: 9, name: "Prisma", image: imgprisma, category: "Backend" },
  { id: 10, name: "WordPress", image: imgwordpress, category: "CMS" },
];

// NOTE: Remplace ces données par tes vraies expériences!
// Pour chaque expérience: poste, entreprise, période, description des missions
const experiences = [
  {
    id: 1,
    role: "Stagiaire Développeur Full-Stack",
    company: "La Vedette Média",
    period: "Juil. 2023 - Sept. 2024",
    description: [
      "Développement d'une application web de gestion de contenu (CMS)",
      "Optimisation des performances et correction de bugs",
      "Collaboration avec l'équipe design pour l'UI/UX",
    ],
  },
  {
    id: 2,
    role: "Développeur Web Freelance",
    company: "Projets personnels",
    period: "2022 - Présent",
    description: [
      "Création de sites web responsives pour des clients locaux",
      "Intégration de maquettes Figma en code",
      "Maintenance et mise à jour de sites existants",
    ],
  },
  {
    id: 3,
    role: "Formation Développeur Web",
    company: "Bootcamp / Formation",
    period: "2022 - 2023",
    description: [
      "Apprentissage des technologies frontend et backend",
      "Création de projets personnels (portfolio, applications)",
      "Travail en équipe sur des projets collaboratifs",
    ],
  },
];

const skillCategories = [
  {
    name: "Frontend",
    icon: <Code2 className="w-5 h-5" />,
    skills: skills.filter((s) => s.category === "Frontend"),
  },
  {
    name: "Backend",
    icon: <Database className="w-5 h-5" />,
    skills: skills.filter((s) => s.category === "Backend"),
  },
  {
    name: "CMS",
    icon: <Layers className="w-5 h-5" />,
    skills: skills.filter((s) => s.category === "CMS"),
  },
];

const Experiences = () => {
  return (
    <section id="Experiences" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title title="Expériences & Compétences" />

        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          Voici un aperçu de mon parcours professionnel et des technologies
          que j'utilise au quotidien.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Palette className="text-secondary" />
              Compétences techniques
            </h3>

            <div className="space-y-6">
              {skillCategories.map((category) => (
                <div key={category.name} className="bg-base-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-secondary">{category.icon}</span>
                    <h4 className="font-semibold">{category.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 bg-base-100 px-3 py-2 rounded-lg hover:scale-105 transition-transform cursor-default"
                        title={skill.name}
                      >
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Layers className="text-secondary" />
              Parcours professionnel
            </h3>

            <div className="space-y-4">
              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="bg-base-200 p-5 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-secondary">
                        {experience.role}
                      </h4>
                      <p className="text-base-content/70">{experience.company}</p>
                    </div>
                    <span className="text-sm bg-base-100 px-3 py-1 rounded-full">
                      {experience.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {experience.description.map((desc, index) => (
                      <li
                        key={index}
                        className="text-base-content/80 text-sm flex items-start gap-2"
                      >
                        <span className="text-secondary mt-1">▹</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;