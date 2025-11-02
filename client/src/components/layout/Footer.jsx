import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-4">
              🎬 EntertainIndia
            </h3>
            <p className="text-sm text-gray-400">
              Your ultimate source for latest entertainment news from Bollywood, Hollywood, OTT platforms, TV shows, music, and celebrity updates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/bollywood" className="hover:text-primary-400 transition-colors">
                  Bollywood
                </Link>
              </li>
              <li>
                <Link to="/hollywood" className="hover:text-primary-400 transition-colors">
                  Hollywood
                </Link>
              </li>
              <li>
                <Link to="/ott" className="hover:text-primary-400 transition-colors">
                  OTT
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-primary-400 transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest entertainment news delivered to your inbox.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} EntertainIndia. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Facebook">
              📘
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Twitter">
              🐦
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Instagram">
              📷
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="YouTube">
              📺
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
