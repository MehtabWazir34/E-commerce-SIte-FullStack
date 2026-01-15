import { Link } from 'react-router'
import pic1 from '../Pics/pic1.png'
import wears from '../Pics/wears.jpg'
import football from '../Pics/football.jfif'
import vollyball from '../Pics/vollyball.jpg'
import { TbCreditCardRefund, TbTruckDelivery } from "react-icons/tb";
import {MdOutlineRecommend} from 'react-icons/md'
import TopProducts from './TopProducts'
function Home() {
  return (
    <main className="w-full min-h-screen  px-6 pt-10">
      <section className="max-w-7xl mx-auto bg-[#2c3639] rounded-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div className="flex flex-col gap-6 ml-8 order-5 md:order-1 pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFE2AF] leading-tight">
            Elevate Your Game with Jan’Sports
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
            Discover premium sportswear, footwear, and equipment designed for performance,
            comfort, and style. Whether you train hard or play smart, Jan’Sports has you covered.
          </p>

          <div className="flex gap-4 mt-2 mx-auto">
            <Link to={'/products'} className="rounded-full cursor-pointer px-6 py-2 text-sm font-semibold bg-[#FFE2AF] text-[#2c3639] hover:bg-[#F2D39A] transition">
              Shop Now
            </Link>

            <Link to={'/about'} className="rounded-full cursor-pointer px-6 py-2 text-sm font-semibold border border-[#FFE2AF] text-[#FFE2AF] hover:bg-[#FFE2AF] hover:text-[#2c3639] transition">
              Know about us
            </Link>
          </div>
        </div>
{/* Right side */}
        <div className="flex justify-center items-end w-full order-1 md:order-5 shadow-2xl">
          <img
            src={pic1}
            alt="brand ambassador"
            className="w-full max-w-md object-contain"
          />
        </div>

      </section>

<section className="max-w-7xl bg-[#2c3639] rounded-2xl p-10 mx-auto my-10">
  
  {/* Section Heading */}
  <h2 className="text-center text-3xl font-bold text-[#FFE2AF] mb-10">
    Everything You Need for Every Sport
  </h2>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Cricket */}
    <div className="rounded-xl flex flex-col-reverse bg-blue-500/90 p-6 md:grid md:grid-cols-2 md:text-left text-center items-center gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-white">
          Cricket Gear
        </h3>
        <p className="text-sm text-white/90 leading-relaxed">
          Premium bats, balls, wickets, pads, and protective equipment designed
          for power, control, and match-day confidence.
        </p>
        <Link to={'/products'} className="rounded-full text-center cursor-pointer px-6 py-2 text-sm font-semibold border border-[#FFE2AF] text-[#FFE2AF] hover:bg-[#FFE2AF] hover:text-[#2c3639] transition">
              See All
            </Link>
      </div>

      <div className="h-40 w-full flex items-center justify-center">
        <img
          src="https://www.starobserver.com.au/wp-content/uploads/2014/11/Screen-shot-2014-11-25-at-3.17.59-PM.png"
          alt="Cricket Equipment"
          className="h-full w-full object-contain md:object-cover rounded-2xl md:rounded-full"
        />
      </div>
    </div>

    {/* Football */}
    <div className="rounded-xl bg-red-500/90 p-6 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
      <div className="h-40 w-full flex items-center justify-center">
        <img
          src={football}
          alt="Football Equipment"
          className="h-full w-full object-contain md:object-cover rounded-2xl md:rounded-full"
        />
      </div>

      <div className="flex flex-col gap-4 text-center md:text-right">
        <h3 className="text-2xl font-semibold text-white">
          Football Collection
        </h3>
        <p className="text-sm text-white/90 leading-relaxed">
          High-performance footballs, boots, and accessories built for speed,
          precision, and complete control on the pitch.
        </p>
        <Link to={'/products'} className="rounded-full text-center cursor-pointer px-6 py-2 text-sm font-semibold border border-[#FFE2AF] text-[#FFE2AF] hover:bg-[#FFE2AF] hover:text-[#2c3639] transition">
              See All
            </Link>
      </div>
    </div>

    {/* Sports Wear */}
    <div className="rounded-xl bg-yellow-500/90 p-6 grid grid-cols-1 md:grid-cols-2  items-center gap-6">
      <div className="flex flex-col gap-4 md:order-1 order-3 justify-center text-center md:text-left ">
        <h3 className="text-2xl font-semibold text-black">
          Sportswear
        </h3>
        <p className="text-sm text-black/80 leading-relaxed">
          Breathable, flexible, and durable sportswear engineered to keep you
          comfortable during training, workouts, and competition.
        </p>
        <Link to={'/products'} className="rounded-full text-center cursor-pointer px-6 py-2 text-sm font-semibold border border-black hover:bg-[#FFE2AF] hover:text-[#2c3639] transition">
            See All 
             </Link>
      </div>

      <div className="h-40 w-full flex items-center justify-center order-1 md:order-3">
        <img
          src={wears}
          alt="Sports Wear"
          className="h-full w-full object-contain md:object-cover rounded-2xl md:rounded-full"
        />
      </div>
    </div>

    {/* Volleyball */}
    <div className="rounded-xl bg-green-500/90 p-6 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
      <div className="h-40 w-full flex items-center justify-center">
        <img
          src={vollyball}
          alt="Volleyball Gear"
          className="h-full w-full object-contain md:object-cover rounded-2xl md:rounded-full"
        />
      </div>

      <div className="flex flex-col gap-4 text-center md:text-right">
        <h3 className="text-2xl font-semibold text-white">
          Volleyball Gear
        </h3>
        <p className="text-sm text-white/90 leading-relaxed">
          Durable volleyballs and accessories crafted for accuracy, grip, and
          consistent performance on indoor and outdoor courts.
        </p>
        <Link to={'/products'} className="rounded-full text-center cursor-pointer px-6 py-2 text-sm font-semibold border border-[#FFE2AF] text-[#FFE2AF] hover:bg-[#FFE2AF] hover:text-[#2c3639] transition">
              See All
            </Link>
      </div>
    </div>

  </div>
</section>

    <section className='w-full flex flex-col justify-center gap-4 bg-[#2c3639] rounded-2xl p-12 mx-auto'>
        <h2 className='text-center sm:text-lg md:text-2xl text-[#FFE2AF] pb-1 leading-tight font-bold border-b-2 border-[#FFE2AF] md:max-w-1/2 mx-auto '>Why choose Jan'Sports?</h2>
        <div className='sm:grid sm:grid-cols-1 md:flex md:justify-center sm:gap-y-12 md:gap-x-10'>
            <div className='grid grid-cols-1 hover:scale-105 transition-all duration-300 md:flex md:justify-between gap-x-2 shadow-md shadow-white/50 rounded-md p-2 text-[#F2D39A]'>
              <span className='rounded-full w-auto mx-auto p-3 text-center bg-blue-500'>
              <TbTruckDelivery className='text-4xl mx-auto '/>
              </span>
              <div className='text-center'>
                <h2 className='font-semibold'>Free Delivery</h2>
                <p className='text-sm'>up to 3KM with 1500+ order.</p>
              </div>
            </div>
            <div className='grid grid-cols-1 hover:scale-105 transition-all duration-300 md:flex md:justify-between gap-x-2 shadow-md shadow-white/50 rounded-md p-2 text-[#F2D39A]'>
              <span className='rounded-full w-auto mx-auto p-3 bg-blue-500'>
              <TbCreditCardRefund className='text-4xl '/>
              </span>
              <div className='text-center'>
                <h2 className='font-semibold'>Return & Refund</h2>
                <p className='text-sm'>Acceptable within a day after delivery.</p>
              </div>
            </div>
            <div className='grid grid-cols-1 hover:scale-105 transition-all duration-300 md:flex md:justify-between gap-x-2 shadow-md shadow-white/50 rounded-md p-2 text-[#F2D39A]'>
              <span className='rounded-full w-auto mx-auto p-3 bg-blue-500'>
              <MdOutlineRecommend className='text-4xl '/>
              </span>
              <div className='text-center'>
                <h2 className='font-semibold'>Best Quality</h2>
                <p className='text-sm'>We've variety of qualities.</p>
              </div>
            </div>
        </div>
    </section>

    <TopProducts/>  

    </main>
  )
}

export default Home
