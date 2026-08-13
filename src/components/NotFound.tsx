import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <p className="text-secondary font-mono text-sm">Erreur 404</p>

        <h1 className="text-6xl sm:text-8xl font-bold text-secondary">404</h1>

        <h2 className="text-2xl sm:text-3xl font-bold">
          Oups, cette page n'existe pas
        </h2>

        <p className="text-base-content/70 max-w-md mx-auto">
          La page que vous recherchez a peut-être été déplacée, supprimée ou
          n'a jamais existé.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/" className="btn btn-secondary btn-lg">
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Page précédente
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
