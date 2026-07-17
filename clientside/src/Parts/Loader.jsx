export function Loader() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50/50 font-sans antialiased">

      <div className="relative flex justify-center items-center gap-1">

        {/* Outer spinning wave ring */}
        <div className="w-28 h-28 rounded-full border-4 border-gray-100 border-t-purple-600 animate-spin"></div>

        {/* Inner wave ring (reverse direction for premium feel) */}
        <div className="absolute w-20 h-20 rounded-full border-4 border-gray-50 border-b-purple-400 animate-spin" style={{ animationDirection: 'reverse' }}></div>

        {/* Brand Text */}
        <div className="absolute text-[10px] font-black text-gray-900 tracking-wider uppercase ">
          Jan'Sports
        </div>

      </div>

    </div>
  );
}