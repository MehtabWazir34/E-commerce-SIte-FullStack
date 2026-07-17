import axiosInstance from '../Utility/axiosInstance.js'
import { useEffect, useState } from "react";
import { Link } from "react-router";
import ContactForm from "../Parts/MsgForm";
// AOS.init();
function Products() {
  // const [category, setCat] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({'low':'', 'high':''})
  const [productsList, setProducts] = useState([]);
  console.log('prod:', productsList);
  
  useEffect(()=>{
   const getFilteredItems = async()=>{
    try {
        const params = {}
        if(activeCategory.length) params.Category = activeCategory.join(',');
        if(priceRange.low) params.lowPrice = priceRange.low;
        if(priceRange.high) params.highPrice = priceRange.high;

        let res = await axiosInstance.get(`/products/filtereditems`, {params});
        setProducts(res.data.filteredItems);
        // console.log("Data", res.data, res.data.filteredItems);
        
    } catch (error) {
      console.log("Filter err:", error);
    }
   }
   getFilteredItems();
  }, [activeCategory, priceRange])

  return (
    <>
    <section className="max-w-7xl mx-auto min-h-[calc(100vh-120px)] grid grid-cols-1 
    
    gap-6 px-4 py-6">
    {/* md:grid-cols-[260px_1fr] */}


      {/* Sidebar */}
      <aside className="bg-chalk rounded-card shadow-card p-6 sticky top-4">
        <h4 className="font-display uppercase text-xs tracking-wide text-court mb-3">
          Browse Categories
        </h4>
<div className="m-4 space-2 gap-2 max-w-full md:w-1/2 mx-auto flex  flex-row justify-center">
  {/* md:flex-col */}
  <input className="max-w-1/2 rounded-md md:w-full border border-steel bg-chalk text-court placeholder-slate p-2 focus:outline-none focus:ring-2 focus:ring-volt font-body text-sm" type={'number'} placeholder={'Min price'} onChange={(a)=> setPriceRange({...priceRange, low: a.target.value})}  />
  <input className="max-w-1/2 rounded-md md:w-full border border-steel bg-chalk text-court placeholder-slate p-2 focus:outline-none focus:ring-2 focus:ring-volt font-body text-sm" type={'number'} placeholder={'Max price'} onChange={(a)=> setPriceRange({...priceRange, high: a.target.value})} />

</div>


<ul className="w-full flex justify-center gap-2 overflow-x-auto pb-2">
  {/* sm:justify-around md:grid md:grid-cols-1 */}
  {["Cricket", "Football", "Volleyball", "Wears"].map((cat) => (
    <li key={cat}>
      <label
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setActiveCategory((prev) =>
              prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
            );
          }
        }}
        onClick={() =>
          setActiveCategory((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
          )
        }
        
        className={`${activeCategory.includes(cat) ? 'bg-purple-600 text-white hover:bg-purple-500 transition-all duration-250 shadow-sm shadow-purple-100 rounded-full px-4 py-2 text-sm font-bold' : ' hover:bg-purple-500 hover:text-white text-purple-700 border border-purple-500/40 rounded-full px-4 py-2 text-sm font-medium '} flex items-center gap-2 cursor-pointer select-none`}
      >
        {cat}
      </label>
    </li>
  ))}

</ul>

      </aside>

      {/* Products Scroll Area */}
      <section className="bg-chalk rounded-2xl p-4 min-h-screen mb-8">
        { productsList.length === 0 ? (
          <p className="text-center text-slate mt-10 font-body">
            No product found.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {productsList.map((item) => (
              <Link
                data-aos="fade-up"
                data-aos-duration={150 * productsList.indexOf(item)}
                data-aos-once="true"
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
      </section>
    </section>
      <div  className="max-w-7xl mx-auto mb-8 px-6">
      <ContactForm/>

      </div>
    </>
  );
}

export default Products;
