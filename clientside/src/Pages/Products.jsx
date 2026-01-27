import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import ContactForm from "../Parts/MsgForm";
// import {InPut} from '../Inputs/InPuts'

function Products() {
  // const [category, setCat] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({'low':'', 'high':''})
  const [productsList, setProducts] = useState([]);

  useEffect(()=>{
   const getFilteredItems = async()=>{
    try {
        const params = {}
        if(activeCategory.length) params.Category = activeCategory.join(',');
        if(priceRange.low) params.lowPrice = priceRange.low;
        if(priceRange.high) params.highPrice = priceRange.high;

        let res = await axios.get('http://localhost:3400/products/filtereditems', {params});
        setProducts(res.data.filteredItems);
        console.log(res.data);
        
    } catch (error) {
      console.log("Filter err:", error);
      
    }
   }

   getFilteredItems();
  }, [activeCategory, priceRange])


  return (
    <>
    <section className="max-w-7xl mx-auto min-h-[calc(100vh-120px)] grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 px-4 py-6">

      {/* Sidebar */}
      <aside className="bg-[#2c3639] rounded-2xl p-2 md:p-4 h-full">
        <h4 className="text-[#ffe2af] font-semibold border-b-2 border-amber-600 pb-2 mb-4">
          Browse Categories
        </h4>
<div className="m-4 space-2 gap-2 max-w-full md:w-full flex md:flex-col flex-row justify-center">
  <input className="max-w-1/2 rounded-md md:w-full border border-gray-100 text-gray-100 p-2" type={'number'} placeholder={'Min price'} onChange={(a)=> setPriceRange({...priceRange, low: a.target.value})}  />
  <input className="max-w-1/2 rounded-md md:w-full border border-gray-100 text-gray-100 p-2" type={'number'} placeholder={'Max price'} onChange={(a)=> setPriceRange({...priceRange, high: a.target.value})} />

</div>


<ul className="w-full space-y-2 text-lg leading-tight flex justify-center gap-2 sm:justify-around md:grid md:grid-cols-1">
  {["Cricket", "Football", "Volleyball", "Wears"].map((cat) => 
    ( 
    <li key={cat}> <label className="flex items-center gap-2 text-[#f2d39a]"> <input className="" type={"checkbox"}  onChange={(e) => setActiveCategory((prev) => e.target.checked ? [...prev, cat] : prev.filter((c) => c !== cat) ) } /> {cat} </label> </li> ))}

</ul>

      </aside>

      {/* Products Scroll Area */}
      <section className="bg-[#2c3639] rounded-2xl p-4 min-h-screen md:overflow-y-auto mb-8">
        {productsList.length === 0 ? (
          <p className="text-center text-gray-300 mt-10">
            No product found.
          </p>
        ) : (
          <div className="flex flex-col md:grid  md:grid-cols-3 lg:grid-cols-5 gap-6">
            {productsList.map((item) => (
              <Link
                key={item._id}
                to={`/product/details/${item._id}`}
                className="w-full bg-[#f2d39a] rounded-2xl hover:scale-105 transition duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-48">
                  <span
                    title="Add to favourite"
                    className="absolute top-2 left-2 z-10 bg-white text-red-600 px-2 rounded-full hover:bg-red-600 hover:text-white transition"
                  >
                    ♥
                  </span>

                  <img
                    src={item.Imgs[0].startsWith('http') || item.Imgs[1].startsWith('http') ? item.Imgs[0] : `http://localhost:3400${item.Imgs[0] || item.Imgs[1]}`}
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
                    Rs.{item.Price}
                  </p>
                  {/* <p className="text-xs mt-1">Category: {item.Category}</p> */}
                  <p className="text-xs mt-1">Reviews: ⭐⭐⭐</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </section>
      <div className="max-w-7xl mx-auto mb-8 px-6">
      <ContactForm/>

      </div>
    </>
  );
}

export default Products;
