import { Link } from "react-router";

function SearchResult({FilteredItems, setSearchMode, setSearchVal}) {
    const linkClick = ()=>{
        setSearchMode(false);
        setSearchVal('');
    }

return (
    <section className="fixed inset-0 top-16 z-500 flex justify-center p-2 bg-black/70">
    <div className="min-h-[90vh] w-full overflow-y-auto bg-[#2c3639] rounded-2xl p-6  ">
      
      {FilteredItems.length === 0 ? (
        <p className="text-center text-gray-300 py-10">
          No product found.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-h-[90vh] w-full">
          
          {FilteredItems.map((item) => (
            <Link
              key={item._id}
              to={`/product/details/${item._id}`}
              onClick={linkClick}
              className="bg-[#f2d39a] rounded-2xl 
                         hover:scale-105 transition duration-300 
                         shadow-md min-h-1/2"
            >
              {/* Image */}
              <div className="relative h-40">
                <span
                  title="Add to favourite"
                  className="absolute top-2 left-2 z-10 
                             bg-white text-red-600 
                             px-2 rounded-full 
                             hover:bg-red-600 hover:text-white transition"
                >
                  ♥
                </span>

                <img
                  src={
                    item.Imgs?.[0]?.startsWith("http")
                      ? item.Imgs[0]
                      : `${item.Imgs?.[0] || ""}`
                  }
                  alt={item.Title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </div>

              {/* Content */}
              <div className="p-3 text-[#2c3639]">
                <h3 className="font-bold text-sm line-clamp-2">
                  {item.Title}
                </h3>
                <p className="font-semibold mt-1">
                  Rs. {item.Price}
                </p>
                <p className="text-xs mt-1">
                  Reviews: ⭐⭐⭐
                </p>
              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  </section>
    )
}
export default SearchResult