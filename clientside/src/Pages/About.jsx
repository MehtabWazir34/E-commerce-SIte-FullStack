import { MdOutlineFacebook } from "react-icons/md";
import khush from "../Pics/pic3.png";
import ContactForm from "../Parts/MsgForm";
import jan from '../Pics/jan.jpg'
function About() {
  return (
    <section className="max-w-7xl mx-auto min-h-screen mt-8 p-6 rounded-2xl bg-transparent">
      <div className="bg-[#2c3639] rounded-2xl shadow-lg p-6 space-y-12 mb-8">

        {/* INTRO SECTION */}
        <div data-aos="fade-down" data-aos-once="true" data-aos-duration="300" id="about">
          <h1 className="text-3xl font-bold text-[#f2d39a] mb-4">About Jan’Sports</h1>
          <p className="text-lg text-[#ffe2af] leading-relaxed max-w-4xl">
            Jan’Sports is more than an online sports shop. It is a vision born in Bannu,
            built for the people who believe in strength, discipline, and perseverance.
            We provide quality sports products while actively working to promote a
            healthy, active, and positive lifestyle among the youth.
          </p>
        </div>

        {/* MISSION SECTION */}
        <div data-aos="fade-down" data-aos-once="true" data-aos-duration="350" id="mission" className="bg-[#364145] rounded-2xl p-6 shadow-md my-5">
          <h2 className="text-2xl font-semibold text-[#f2d39a] mb-4">Our Mission</h2>
          <p className="text-[#ffe2af] leading-relaxed">
            Bannu is known for its strong, hardworking, and resilient people. However,
            due to limited resources and long-standing unrest in the region, the youth
            often face mental pressure, lack of opportunities, and limited access to
            structured sports activities.
            <br /><br />
            Our mission is to use sports as a positive force — to keep young boys
            mentally and physically active, provide them healthy entertainment, and
            create pathways toward their favorite sports. Through Jan’Sports, we aim
            to encourage discipline, teamwork, confidence, and hope in a region that
            deserves growth and stability.
          </p>
        </div>

        {/* FOUNDER SECTION */}
        <div data-aos="fade-down" data-aos-once="true" data-aos-duration="300" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
          <div data-aos="fade-right" data-aos-once="true" data-aos-duration="400" className="space-y-4 text-center md:text-left">
            <h2 className="text-xl font-semibold text-[#f2d39a]">Jangin Nawaz</h2>
            <h3 className="text-lg text-[#ffe2af]">Founder & Owner</h3>
            <p className="text-[#ffe2af] leading-relaxed">
              Jangin Nawaz is a young entrepreneur from Bannu with a strong belief in
              the power of sports to transform lives. Despite challenges, he chose
              action over limitation — creating Jan’Sports with a clear purpose:
              to serve the community, uplift youth, and promote physical and mental
              well-being.
              <br /><br />
              His positive mindset, leadership, and dedication to social impact reflect
              a new generation of entrepreneurs who build not only businesses, but
              meaningful change.
            </p>
            <div  className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com/jan.waxir.79"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-[#f2d39a] transition-all duration-300"
              >
                <MdOutlineFacebook className="text-3xl" />
              </a>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-once="true" data-aos-duration="400" className="w-full items-end flex justify-center ">
            <img
              src={jan}
              alt="Jangin Nawaz"
              className="rounded-2xl w-full max-w-md object-contain shadow-lg hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>

        {/* BRAND AMBASSADOR SECTION */}
        <div data-aos="fade-down" data-aos-once="true" data-aos-duration="300" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div data-aos="fade-right" data-aos-once="true" data-aos-duration="400" className="flex justify-center">
            <img
              src={khush}
              alt="Khushdil Shah"
              className="max-w-md w-full rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
            />
          </div>

          <div data-aos="fade-left" data-aos-once="true" data-aos-duration="400" className="space-y-4 text-center md:text-left">
            <h2 className="text-xl font-semibold text-[#f2d39a]">Khushdil Shah</h2>
            <h3 className="text-lg text-[#ffe2af]">Brand Ambassador</h3>
            <p className="text-[#ffe2af] leading-relaxed">
              Khushdil Shah is a professional Pakistani international cricketer and a
              proud brand ambassador of Jan’Sports. Known for his all-round abilities,
              he has represented Pakistan at the highest level and played in major
              leagues including PSL, BPL, and CPL.
              <br /><br />
              His journey, discipline, and performances inspire young athletes to
              believe in their potential and work relentlessly toward excellence.
            </p>
            <a
              href="https://en.wikipedia.org/wiki/Khushdil_Shah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-[#f2d39a] transition-all duration-300"
            >
              Read more about Khushdil Shah
            </a>
          </div>
        </div>

        {/* CORE VALUES */}
        <div data-aos="fade-down" data-aos-once="true" data-aos-duration="300" className="bg-[#364145] rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-[#f2d39a] mb-4">Our Core Values</h2>
          <ul className="list-disc list-inside text-[#ffe2af] space-y-2">
            <li>Community empowerment through sports</li>
            <li>Youth development and mental well-being</li>
            <li>Quality, integrity, and affordability</li>
            <li>Discipline, teamwork, and resilience</li>
            <li>Positive change through consistent action</li>
          </ul>
        </div>

        {/* CLOSING */}
        <div data-aos="fade-up" data-aos-once="true" data-aos-duration="300" className="text-center">
          <p className="text-[#ffe2af] text-lg">
            Jan’Sports is not just about selling products — it is about building hope,
            strength, and opportunity through sports.
          </p>
        </div>

      </div>
      <ContactForm/>
    </section>
  );
}

export default About;
