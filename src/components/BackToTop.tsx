import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * BackToTop button that appears after scrolling down a bit and smoothly scrolls the
 * page back to the top when clicked.
 */
const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button when the user has scrolled more than 300px down the page
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    // Run once on mount in case the page is already scrolled
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-secondary/80 transition-colors"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default BackToTop;
