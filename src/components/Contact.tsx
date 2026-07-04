import { Mail, Phone, MapPin, Github, Send } from "lucide-react";
import Title from "./Title";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "angekounde3@gmail.com",
      href: "mailto:angekounde3@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Téléphone",
      value: "+229 68 266 565",
      href: "https://wa.me/22968266565",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Localisation",
      value: "Cotonou, Bénin",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/OnelKND",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "WhatsApp",
      href: "https://wa.me/22968266565"
    }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Créer le lien mailto avec les infos du formulaire
    const mailtoLink = `mailto:angekounde3@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;

    // Ouvrir le client mail
    window.location.href = mailtoLink;

    // Reset le formulaire
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title title="Me contacter" />

        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          Vous avez un projet en tête ou vous voulez simplement dire bonjour ?
          N'hésitez pas à me contacter, je répondrai dans les plus brefs délais.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-base-100 rounded-xl hover:shadow-lg transition-shadow group"
                >
                  <div className="p-3 bg-secondary/10 rounded-full text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="font-semibold mb-4">Mes réseaux sociaux</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-base-100 rounded-full hover:bg-secondary hover:text-white transition-all hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Envoyer un message</h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Nom</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ton nom"
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="ton@email.com"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Sujet</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Sujet de ton message"
                  className="input input-bordered w-full"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Écris ton message ici..."
                  className="textarea textarea-bordered h-40"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-secondary w-full"
              >
                <Send className="w-5 h-5" />
                Ouvrir mon client mail
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;