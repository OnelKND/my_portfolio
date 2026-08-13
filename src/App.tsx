import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/about";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import NotFound from "./components/NotFound";

function MainPage() {
  return (
    <>
      <Home />
      <About />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <div>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
