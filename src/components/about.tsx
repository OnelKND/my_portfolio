import { Code2, Database, Palette, Lightbulb } from "lucide-react";
import Title from "./Title";
import img from "../assets/img2.jpg";

const aboutSections = [
  {
    id: 1,
    title: "Développeur Frontend",
    description:
      "Spécialisé dans la création d'interfaces utilisateur modernes et responsives avec React, Next.js et Tailwind CSS. Je fait attention à l'expérience utilisateur et aux performances.",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Développeur Backend",
    description:
      "Capable de créer des APIs robustes et scalables avec Node.js, Express et des bases de données relationnelles ou NoSQL.",
    icon: <Database className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Passionné par l'UI/UX",
    description:
      "Jeune développeur kreatif qui aime transformer les designs en code et créer des expériences utilisateur fluides et intuitives.",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Apprentissage continu",
    description:
      "Toujours à l'affût des nouvelles technologies et des bonnes pratiques pour améliorer mes compétences et deliverer le meilleur.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
];

const About = () => {
  return (
    <section id="About" className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title title="À propos de moi" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary via-primary to-secondary rounded-2xl opacity-20 blur-2xl"></div>

              <img
                src={img}
                alt="NEL DEV - Développeur Full-Stack"
                className="relative w-80 h-96 lg:w-96 lg:h-[450px] object-cover rounded-2xl shadow-2xl border-4 border-secondary/30"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-base-content/70 leading-relaxed">
              Je m'appelle <strong>KOUNDE Ange-Onel</strong>, développeur
              Full-Stack basé au Bénin. Fort de{" "}
              <strong>4 ans d'expérience</strong>, je transforme vos idées en
              applications web modernes, performantes et orientées utilisateur.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Mon approche combine expertise technique et sensibilité design
              pour créer des solutions qui non seulement fonctionnent, mais
              aussi rendent l'expérience utilisateur agréable.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-base-100 p-4 rounded-xl">
                <span className="text-3xl font-bold text-secondary">4+</span>
                <p className="text-sm text-base-content/60">
                  Années d'expérience
                </p>
              </div>
              <div className="bg-base-100 p-4 rounded-xl">
                <span className="text-3xl font-bold text-secondary">15+</span>
                <p className="text-sm text-base-content/60">Projets réalisés</p>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {aboutSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-base-100 p-4 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="text-secondary mb-2">{section.icon}</div>
                  <h3 className="font-semibold mb-1">{section.title}</h3>
                  <p className="text-xs text-base-content/60">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
