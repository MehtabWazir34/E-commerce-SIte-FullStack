import { MdOutlineFacebook } from "react-icons/md";
import khush from "../Pics/pic3.png";
import ContactForm from "../Parts/MsgForm";
import jan from '../Pics/jan.jpg'

function About() {
  return (
    <section className="max-w-7xl mx-auto min-h-screen mt-8 p-4 md:p-6 rounded-3xl bg-transparent font-sans antialiased text-gray-800">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-10 space-y-16 mb-8">

        {/* INTRO SECTION */}
        <div data-aos="fade-down" data-aos-once="true" data-aos-duration="300" id="about" className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">About Jan’Sports</h1>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium">
            Jan’Sports is a premier multi-sport e-commerce platform dedicated to delivering high-performance sports gear, athletic apparel, and premium equipment. Built on a foundation of reliability, discipline, and absolute athletic excellence, we serve enthusiasts and professionals alike across the region, empowering athletes to achieve their peak potential.
          </p>
        </div>

        {/* MISSION SECTION */}
        <div data-aos="fade-down" data-aos-once="true" data-aos-duration="350" id="mission" className="bg-gray-50/60 border border-gray-100 rounded-3xl p-6 md:p-8 shadow-none my-5">
          <h2 className="text-lg md:text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">Our Mission & Vision</h2>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
            Our mission is to democratize access to world-class sporting goods. We bridge the gap between passion and performance by offering an optimized online marketplace that guarantees authenticity, continuous technical innovation, and exceptional durability. 
            <br /><br />
            Through Jan’Sports, we utilize the transformative power of sports to drive community enrichment, promote active mental and physical well-being, and equip the next generation of athletes with the reliable tools they require to build confidence, execute teamwork, and master competitive play.
          </p>
        </div>

        {/* BRAND AMBASSADOR SECTION */}
        <div data-aos="fade-down" data-aos-once="true" data-aos-duration="300" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div data-aos="fade-right" data-aos-once="true" data-aos-duration="400" className="w-full flex justify-center bg-gray-50/50 rounded-2xl p-4 md:p-6 mix-blend-multiply">
            <img
              src={khush}
              alt="Khushdil Shah"
              className="max-w-md w-full rounded-2xl shadow-sm hover:scale-102 transition-all duration-300"
            />
          </div>

          <div data-aos="fade-left" data-aos-once="true" data-aos-duration="400" className="space-y-4 text-center md:text-left">
            <span className="bg-purple-50 text-purple-700 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider border border-purple-100 inline-block">
              Official Partner
            </span>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">Khushdil Shah</h2>
            <h3 className="text-xs font-bold text-gray-400 tracking-wide uppercase">International Brand Ambassador</h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
              Khushdil Shah is an elite professional Pakistani international cricketer and the proud global brand ambassador of Jan’Sports. Widely recognized for his dynamic all-round match-winning capabilities, he has represented Pakistan at the pinnacle of international cricket and clean-hitting leagues globally, including the PSL, BPL, and CPL.
              <br /><br />
              His strict operational discipline, resilience under pressure, and elite competitive integrity perfectly represent the core standards of our brand, inspiring young athletes to pursue systematic excellence.
            </p>
            <a
              href="https://en.wikipedia.org/wiki/Khushdil_Shah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold text-purple-600 hover:text-purple-700 underline mt-2 transition-colors"
            >
              Read more about Khushdil Shah
            </a>
          </div>
        </div>

        {/* CORE VALUES */}
        <div data-aos="fade-down" data-aos-once="true" data-aos-duration="300" className="bg-gray-50/60 border border-gray-100 rounded-3xl p-6 md:p-8 shadow-none">
          <h2 className="text-lg md:text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Operational Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold uppercase tracking-wider text-gray-600">
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
              Authenticity Guaranteed
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
              Uncompromised Quality
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
              Affordable Excellence
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
              Customer-Centric Logistics
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
              Elite Performance Design
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
              Community Advancement
            </div>
          </div>
        </div>

        {/* CLOSING */}
        <div data-aos="fade-up" data-aos-once="true" data-aos-duration="300" className="text-center pt-4 border-t border-gray-50">
          <p className="text-gray-400 text-xs md:text-sm font-medium">
            Jan’Sports is more than a store — it is your ultimate digital locker room, fostering competitive capability through reliable service.
          </p>
        </div>

      </div>
      <ContactForm/>
    </section>
  );
}

export default About;