import { useNavigate } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { SiX } from "react-icons/si"; // X (Twitter) icon

export default function Footer() {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-950 text-gray-300 pt-16 pb-8 mt-24 border-t border-neutral-800">
      <div className="container mx-auto px-6 md:px-10 flex flex-col gap-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between flex-wrap gap-10 border-b border-neutral-800 pb-10">
          {/* Logo & About */}
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-3xl font-extrabold text-amber-400 mb-4">MenStyle</h2>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Redefining men’s fashion with timeless elegance and modern flair.  
              Designed for confidence. Crafted for style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Shirts", path: "/products?category=Shirts" },
                { name: "Trousers", path: "/products?category=Trousers" },
                { name: "Suits", path: "/products?category=Suits" },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNav(item.path)}
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1 min-w-[300px]">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4 max-w-sm">
              Subscribe to get exclusive style updates, new arrivals, and special offers.
            </p>
            <form
              className="flex items-center bg-neutral-900 rounded-full overflow-hidden border border-neutral-700 focus-within:border-amber-400 transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-2 rounded-full transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} MenStyle. All Rights Reserved.</p>

          {/* Social Icons */}
          <div className="flex space-x-5">
            {[ 
              { icon: <Instagram size={18} />, label: "Instagram" },
              { icon: <Facebook size={18} />, label: "Facebook" },
              { icon: <SiX size={17} />, label: "X" },
              { icon: <Linkedin size={18} />, label: "LinkedIn" },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                aria-label={item.label}
                className="hover:text-amber-400 transition-colors duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
