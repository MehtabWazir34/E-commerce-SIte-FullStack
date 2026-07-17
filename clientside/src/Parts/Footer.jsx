import { Link, NavLink } from "react-router";
import { MdEmail, MdFacebook, MdWhatsapp } from "react-icons/md";

function Footer() {
  return (
    <footer data-aos="fade-up" data-aos-once="true" className="w-full bg-white border-t border-gray-100 text-gray-600 mt-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div data-aos="fade-right" data-aos-duration="200" className="space-y-4">
          <Link
            to="/"
            className="text-2xl font-sans font-black text-gray-900 hover:text-purple-600 transition-colors duration-150 uppercase tracking-tighter"
          >
            Jan'Sports
          </Link>

          <p className="text-xs text-gray-400 font-medium leading-relaxed">
            Premium sports equipment built for performance and durability.
          </p>
        </div>

        {/* Explore */}
        <div data-aos="fade-right" data-aos-duration="300">
          <h3 className="mb-4 font-bold text-xs uppercase tracking-wider text-gray-400">Explore</h3>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <Link to="/#top-products" className="text-gray-600 hover:text-purple-600 transition-colors duration-150">
                Top Products
              </Link>
            </li>
            <li>
              <Link to="/#categories" className="text-gray-600 hover:text-purple-600 transition-colors duration-150">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/#why-choose-us" className="text-gray-600 hover:text-purple-600 transition-colors duration-150">
                Why Choose Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div data-aos="fade-right" data-aos-duration="400">
          <h3 className="mb-4 font-bold text-xs uppercase tracking-wider text-gray-400">Company</h3>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <Link to="/#about" className="text-gray-600 hover:text-purple-600 transition-colors duration-150">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/#mission" className="text-gray-600 hover:text-purple-600 transition-colors duration-150">
                Mission
              </Link>
            </li>
            <li>
              <Link to="/#contact" className="text-gray-600 hover:text-purple-600 transition-colors duration-150">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div data-aos="fade-right" data-aos-duration="500">
          <h3 className="mb-4 font-bold text-xs uppercase tracking-wider text-gray-400">Contact & Support</h3>
          <ul className="space-y-2.5 text-xs font-semibold">
            <a href={'https://web.facebook.com/profile.php?id=61581245577311'} className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-150">
              <MdFacebook className="text-base text-gray-400" /> Jan Sports
            </a>
            <a href={'http://wa.me/+923159878075'} className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-150">
              <MdWhatsapp className="text-base text-gray-400" /> +92 315 9878075
            </a>
            <button type="button" onClick={()=>{
              window.location.href = 'mailto:34methab@gmail.com'
            }} className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-all duration-150 p-0 bg-transparent font-semibold border-none cursor-pointer">
              <MdEmail className="text-base text-gray-400" /> jansports@email.com
            </button>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-50 text-center py-5 text-[11px] text-gray-400 font-medium">
        © {new Date().getFullYear()} Jan'Sports. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;