import { Link } from 'react-router'
import pic1 from '../Pics/pic1.png'
import wears from '../Pics/wears.jpg'
import football from '../Pics/football.jfif'
import vollyball from '../Pics/vollyball.jpg'
import { TbCreditCardRefund, TbTruckDelivery } from "react-icons/tb";
import {MdOutlineRecommend} from 'react-icons/md'
import TopProducts from './TopProducts'
import ContactForm from '../Parts/MsgForm'
function Home() {
  return (
    <main className="w-full min-h-screen bg-gray-50/40 px-6 pt-10 font-sans antialiased text-gray-800">
      {/* Hero Banner Section */}
      <section className="max-w-7xl mx-auto bg-white rounded-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 md:p-12 border border-gray-100 shadow-sm">

        {/* Left Content */}
        <div data-aos="fade-up" className="flex flex-col gap-6 order-5 md:order-1 pb-4">
          <h1 className="text-4xl md:text-5xl font-sans font-black text-gray-900 leading-tight uppercase tracking-tighter">
            Elevate Your Game with Jan’Sports
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl font-medium">
            Discover premium sportswear, footwear, and equipment designed for performance,
            comfort, and style. Whether you train hard or play smart, Jan’Sports has you covered.
          </p>

          <div className="flex gap-4 mt-2">
            <Link to={'/products'} className="rounded-full cursor-pointer px-6 py-3 text-sm font-sans font-bold bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-sm shadow-purple-100 uppercase tracking-wider">
              Shop Now
            </Link>
            <Link to={'/about'} className="rounded-full cursor-pointer px-6 py-3 text-sm font-sans font-bold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-all uppercase tracking-wider">
              Know about us
            </Link>
          </div>
        </div>

        {/* Right side Image Canvas */}
        <div data-aos="fade-up" className="flex justify-center items-center w-full order-1 md:order-5 bg-gray-50/50 rounded-2xl p-6 relative mix-blend-multiply">
          <img
            src={pic1}
            alt="brand ambassador"
            className="w-full max-w-md object-contain transform hover:scale-102 transition-transform duration-300"
          />
        </div>

      </section>

      {/* Grid Category Showcase */}
      <section className="max-w-7xl bg-transparent mx-auto my-16">
  
      {/* Section Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-sans font-black text-gray-900 mb-10 uppercase tracking-tighter">
        Everything You Need for Every Sport
      </h2>

      {/* Cards Grid */}
      <div id='categories' className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Cricket Card */}
        <div data-aos="fade-right" className="rounded-3xl flex flex-col-reverse bg-white border border-gray-100 p-6 md:grid md:grid-cols-2 md:text-left text-center items-center gap-6 shadow-sm group hover:shadow-md transition-all">
          <div className="flex flex-col gap-4 items-start">
            <h3 className="text-xl font-sans font-bold text-gray-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors">
              Cricket Gear
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Premium bats, balls, wickets, pads, and protective equipment designed
              for power, control, and match-day confidence.
            </p>
            <Link to={'/products'} className="rounded-full text-center cursor-pointer px-6 py-2 text-xs font-sans font-bold text-gray-600 border border-gray-200 hover:bg-purple-700 hover:text-white transition-all uppercase tracking-wider mt-2 w-full md:w-auto">
              See All
            </Link>
          </div>

          <div className="h-44 w-full flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden p-3">
            <img
              src="https://www.starobserver.com.au/wp-content/uploads/2014/11/Screen-shot-2014-11-25-at-3.17.59-PM.png"
              alt="Cricket Equipment"
              className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Football Card */}
        <div data-aos="fade-left" className="rounded-3xl bg-white border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 items-center gap-6 shadow-sm group hover:shadow-md transition-all">
          <div className="h-44 w-full flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden p-3">
            <img
              src={football}
              alt="Football Equipment"
              className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col gap-4 text-center md:text-right md:items-end">
            <h3 className="text-xl font-sans font-bold text-gray-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors">
              Football Collection
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              High-performance footballs, boots, and accessories built for speed,
              precision, and complete control on the pitch.
            </p>
            <Link to={'/products'} className="rounded-full text-center cursor-pointer px-6 py-2 text-xs font-sans font-bold text-gray-600 border border-gray-200 hover:bg-purple-700 hover:text-white transition-all uppercase tracking-wider mt-2 w-full md:w-auto">
              See All
            </Link>
          </div>
        </div>

        {/* Sportswear Card */}
        <div data-aos="fade-right" className="rounded-3xl bg-white border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 items-center gap-6 shadow-sm group hover:shadow-md transition-all">
          <div className="flex flex-col gap-4 md:order-1 order-3 items-start  text-center md:text-left">
            <h3 className="text-xl font-sans font-bold text-gray-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors">
              Sportswear
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Breathable, flexible, and durable sportswear engineered to keep you
              comfortable during training, workouts, and competition.
            </p>
            <Link to={'/products'} className="rounded-full text-center cursor-pointer px-6 py-2 text-xs font-sans font-bold text-gray-600 border border-gray-200 hover:bg-purple-700 hover:text-white transition-all uppercase tracking-wider mt-2 w-full md:w-auto">
              See All 
            </Link>
          </div>

          <div className="h-44 w-full flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden p-3 order-1 md:order-3">
            <img
              src={wears}
              alt="Sports Wear"
              className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Volleyball Card */}
        <div data-aos="fade-left" className="rounded-3xl bg-white border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 items-center gap-6 shadow-sm group hover:shadow-md transition-all">
          <div className="h-44 w-full flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden p-3">
            <img
              src={vollyball}
              alt="Volleyball Gear"
              className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col gap-4 text-center md:text-right md:items-end">
            <h3 className="text-xl font-sans font-bold text-gray-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors">
              Volleyball Gear
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Durable volleyballs and accessories crafted for accuracy, grip, and
              consistent performance on indoor and outdoor courts.
            </p>
            <Link to={'/products'} className="rounded-full text-center cursor-pointer px-6 py-2 text-xs font-sans font-bold text-gray-600 border border-gray-200 hover:bg-purple-700 hover:text-white transition-all uppercase tracking-wider mt-2 w-full md:w-auto">
              See All
            </Link>
          </div>
        </div>

      </div>
    </section>

    {/* Values Section */}
    <section id='why-choose-us' className='w-full flex flex-col justify-center gap-6 bg-white border border-gray-100 shadow-sm rounded-3xl p-8 md:p-12 mx-auto my-12'>
      <h2 className='text-center text-xl md:text-2xl text-gray-900 leading-tight font-sans font-black uppercase tracking-tight mx-auto'>Why choose Jan'Sports?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4'>
            
            {/* Delivery Core Value */}
            <div data-aos="fade-right" data-aos-duration="450" className='flex items-center gap-4 border border-gray-50 rounded-2xl p-4 bg-gray-50/50 hover:bg-purple-50/30 transition-all duration-300'>
              <span className='rounded-xl p-3 bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100'>
                <TbTruckDelivery className='text-3xl font-bold'/>
              </span>
              <div>
                <h3 className='font-sans font-bold text-sm text-gray-900 uppercase tracking-wide'>Free Delivery</h3>
                <p className='text-xs text-gray-400 font-medium mt-0.5'>up to 3KM with 1500+ order.</p>
              </div>
            </div>

            {/* Refund Core Value */}
            <div data-aos="fade-up" data-aos-duration="350" className='flex items-center gap-4 border border-gray-50 rounded-2xl p-4 bg-gray-50/50 hover:bg-purple-50/30 transition-all duration-300'>
              <span className='rounded-xl p-3 bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100'>
                <TbCreditCardRefund className='text-3xl font-bold'/>
              </span>
              <div>
                <h3 className='font-sans font-bold text-sm text-gray-900 uppercase tracking-wide'>Return & Refund</h3>
                <p className='text-xs text-gray-400 font-medium mt-0.5'>Acceptable within a day after delivery.</p>
              </div>
            </div>

            {/* Quality Core Value */}
            <div data-aos="fade-left" data-aos-duration="250" className='flex items-center gap-4 border border-gray-50 rounded-2xl p-4 bg-gray-50/50 hover:bg-purple-50/30 transition-all duration-300'>
              <span className='rounded-xl p-3 bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100'>
                <MdOutlineRecommend className='text-3xl font-bold'/>
              </span>
              <div>
                <h3 className='font-sans font-bold text-sm text-gray-900 uppercase tracking-wide'>Best Quality</h3>
                <p className='text-xs text-gray-400 font-medium mt-0.5'>We've variety of qualities.</p>
              </div>
            </div>

        </div>
    </section>

    <TopProducts/>  
    <ContactForm/>
    </main>
  )
}

export default Home