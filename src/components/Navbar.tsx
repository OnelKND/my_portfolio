import { useState } from "react";
import { FolderCode, Menu, X, Github, Phone } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "/#home" },
    { name: "À propos", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Projets", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base-100/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center font-bold text-2xl">
            <FolderCode className="mr-2 text-secondary" />
            NEL
            <span className="text-secondary">DEV</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-base-content/80 hover:text-secondary font-medium after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/OnelKND"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/70 hover:text-secondary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/22968266565"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/70 hover:text-secondary transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-base-100 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 px-4 hover:bg-base-200 rounded-lg transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}

          {/* Social Links Mobile */}
          <div className="flex justify-center space-x-6 pt-4 border-t border-base-200">
            <a
              href="https://github.com/OnelKND"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-base-200 rounded-lg transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/22968266565"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-base-200 rounded-lg transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
