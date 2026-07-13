import { FolderCode, Github, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Accueil", href: "#home" },
    { name: "À propos", href: "#About" },
    { name: "Projets", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/OnelKND", label: "GitHub" },
    { icon: <Phone className="w-5 h-5" />, href: "https://wa.me/22968266565", label: "WhatsApp" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:angekounde3@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-base-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center font-bold text-2xl mb-4">
              <FolderCode className="mr-2 text-secondary" />
              NEL
              <span className="text-secondary">DEV</span>
            </a>
            <p className="text-base-content/70 mb-4">
              Développeur Full-Stack passionné par la création d'expériences web
              modernes et performantes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-base-content/70 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-4">Suivez-moi</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-base-100 rounded-full hover:bg-secondary hover:text-white transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-content/10 pt-6 text-center">
          <p className="text-base-content/60">
            © {currentYear} NEL DEV. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;