import { Link } from "react-router";
import { MdEmail, MdFacebook, MdWhatsapp } from "react-icons/md";

function Footer() {
  return (
    <footer className="w-full bg-[#2c3639] text-[#f2d39a] mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <Link
            to="/"
            className="text-2xl font-semibold text-[#FFE2AF] hover:text-white transition"
          >
            Jan'Sports
          </Link>

          <p className="text-sm text-gray-300">
            Premium sports equipment built for performance and durability.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-3 font-semibold text-sm">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/#top-products" className="hover:text-white transition">
                Top Products
              </Link>
            </li>
            <li>
              <Link to="/#categories" className="hover:text-white transition">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/#why-choose-us" className="hover:text-white transition">
                Why Choose Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-3 font-semibold text-sm">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/#about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/#mission" className="hover:text-white transition">
                Mission
              </Link>
            </li>
            <li>
              <Link to="/#contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-3 font-semibold text-sm">Contact & Support</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 hover:text-white transition">
              <MdFacebook /> Jan Sports
            </li>
            <li className="flex items-center gap-3 hover:text-white transition">
              <MdWhatsapp /> +92 315 9878075
            </li>
            <li className="flex items-center gap-3 hover:text-white transition">
              <MdEmail /> jansports@email.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#3a464a] text-center py-4 text-xs text-gray-300">
        © {new Date().getFullYear()} Jan'Sports. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
