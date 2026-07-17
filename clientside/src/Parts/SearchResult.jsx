import { useEffect } from "react";
import { Link } from "react-router";

function SearchResult({FilteredItems, setSearchMode, setSearchVal}) {
    const linkClick = ()=>{
        setSearchMode(false);
        setSearchVal('');
    }

    // Freeze background document scrolling while the search results overlay is mounted
    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    
return (
    <section className="fixed inset-0 top-16 z-40 flex justify-center p-4 bg-gray-900/40 backdrop-blur-sm font-sans antialiased text-gray-800">
    <div className="w-full max-w-7xl overflow-y-auto bg-transparent rounded-3xl p-2 h-[calc(100vh-5rem)] scrollbar-none">
      
      {FilteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
          <p className="text-gray-400 text-xs font-medium py-10">
            No product found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full pb-10">
          
          {FilteredItems.map((item) => (
            <Link
                onClick={linkClick}
                key={item._id}
                to={`/product/details/${item._id}`}
                className="bg-chalk rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition-all duration-300 overflow-hidden group"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-t-[20px] bg-[#EDEFF0]">
                  <img
                    src={item?.Imgs[0]?.startsWith('http') || item?.Imgs[1]?.startsWith('http') ? item?.Imgs[0] : `${item?.Imgs[0] || item?.Imgs[1]}`}
                    alt={item?.Title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* <span className="absolute top-3 left-3 bg-volt text-court text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                    Top item
                  </span> */}

                  <button className="absolute top-3 right-3 p-2.5 rounded-full transition-all duration-150 bg-chalk/90 shadow-sm hover:bg-volt">
                    <svg className="w-4 h-4 text-court" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-purple-600 transition-colors">{item.Title}</h3>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-100">
                      Rs. {item.Price}
                    </span>
                  </div>
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