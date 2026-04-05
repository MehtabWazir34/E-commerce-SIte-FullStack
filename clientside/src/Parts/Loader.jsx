export function Loader() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#2c3639]">

      <div className="relative flex justify-center items-center">

        {/* Outer spinning wave ring */}
        <div className="w-28 h-28 rounded-full border-4 border-gray-200 border-t-gray-700 animate-spin"></div>

        {/* Inner wave ring (reverse direction for premium feel) */}
        <div className="absolute w-20 h-20 rounded-full border-4 border-gray-100 border-b-gray-500 animate-spin"></div>

        {/* Brand Text */}
        <div className="absolute text-sm font-semibold text-[#fed2af] tracking-wide">
          Jan'Sports
        </div>

      </div>

    </div>
  );
}