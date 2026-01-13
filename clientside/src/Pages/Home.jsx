import pic1 from '../Pics/pic1.png'

function Home() {
  return (
    <section className="w-full min-h-screen bg-[#2c3639] px-6 pt-10 flex items-end">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFE2AF] leading-tight">
            Elevate Your Game with Jan’Sports
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
            Discover premium sportswear, footwear, and equipment designed for performance,
            comfort, and style. Whether you train hard or play smart, Jan’Sports has you covered.
          </p>

          <div className="flex gap-4 mt-2">
            <button className="rounded-full cursor-pointer px-6 py-2 text-sm font-semibold bg-[#FFE2AF] text-[#2c3639] hover:bg-[#F2D39A] transition">
              Shop Now
            </button>

            <button className="rounded-full cursor-pointer px-6 py-2 text-sm font-semibold border border-[#FFE2AF] text-[#FFE2AF] hover:bg-[#FFE2AF] hover:text-[#2c3639] transition">
              Browse Collection
            </button>
          </div>
        </div>
{/* Right side */}
        <div className="flex justify-center items-end w-full">
          <img
            src={pic1}
            alt="Sports Equipment"
            className="w-full max-w-md object-contain"
          />
        </div>

      </div>
    </section>
  )
}

export default Home
