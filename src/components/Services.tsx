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

import { Code2, Database, Globe, Layers, Palette, PenTool, Wrench } from "lucide-react";

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

const services = [
  {
    id: 1,
    icon: <Globe className="w-8 h-8" />,
    title: "Développement Web",
    description: "Création de sites web modernes et responsives avec les dernières technologies. Applications web performantes et optimisées pour le SEO.",
    features: [
      "Sites vitrines et e-commerce",
      "Applications web React/Next.js",
      "API REST et intégration",
    ],
  },
  {
    id: 2,
    icon: <PenTool className="w-8 h-8" />,
    title: "Design Graphique",
    description: "Conception d'identités visuelles percutantes et de supports de communication qui reflètent l'image de votre entreprise.",
    features: [
      "Logo et identité visuelle",
      "Maquettes Figma",
      "Supports (affiches, flyers)",
    ],
  },
  {
    id: 3,
    icon: <Wrench className="w-8 h-8" />,
    title: "Maintenance",
    description: "Suivi et évolution de votre projet web pour garantir sa performance, sa sécurité et sa pérennité dans le temps.",
    features: [
      "Mises à jour et optimisations",
      "Correction de bugs",
      "Ajout de nouvelles fonctionnalités",
    ],
  },
];


const Services = () => {
  return (
    <section id="services" className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title title="Services" />

        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          Des solutions complètes pour répondre à vos besoins numériques.
          Je vous accompagne de la conception à la mise en ligne de votre projet.
        </p>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-base-100 p-6 rounded-2xl hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 text-secondary">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-base-content/70 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-sm flex items-start gap-2 text-base-content/80"
                  >
                    <span className="text-secondary mt-1">▹</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Palette className="text-secondary" />
            Compétences techniques
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div key={category.name} className="bg-base-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-secondary">{category.icon}</span>
                  <h4 className="font-semibold">{category.name}</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 bg-base-200 px-3 py-2 rounded-lg hover:scale-105 transition-transform cursor-default"
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
      </div>
    </section>
  );
};

export default Services;