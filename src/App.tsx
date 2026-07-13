import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/about";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <div>
      <Navbar />

      <main>
        <Home />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}