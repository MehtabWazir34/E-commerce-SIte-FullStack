import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {InPut} from '../Inputs/InPuts'

function Products() {
  const [category, setCat] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({'low':'', 'high':''})
    
  const [productsList, setProducts] = useState([]);
  useEffect(()=>{
   const getFilteredItems = async()=>{
    try {
        let params = {}
        if(activeCategory.length) params.cats = activeCategory.join(',');
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

  /* Category Filter Logic */
  // const handleCategory = () => {
  //   setActiveCategory(category);

  //   if (category === "All") {
  //     setFilteredProducts(productsList);
  //   } else {
  //     const filtered = productsList.filter(
  //       (item) => item.Category === category
  //     );
  //     setFilteredProducts(filtered);
  //   }
  // };

  return (
    <section className="max-w-7xl mx-auto h-[calc(100vh-120px)] grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 p-6">

      {/* Sidebar */}
      <aside className="bg-[#2c3639] rounded-2xl p-4 h-full">
        <h4 className="text-[#ffe2af] font-semibold border-b-2 border-amber-600 pb-2 mb-4">
          Browse Categories
        </h4>
<ul className="space-y-2 text-sm">
  {["cricket", "Pants", "Shoes"].map((cat) => (
    <li key={cat}>
      <label className="flex items-center gap-2 text-[#f2d39a]">
        <input
          type="checkbox"
          value={cat}
          onChange={(e) =>
            setActiveCategory((prev) =>
              e.target.checked
                ? [...prev, cat]
                : prev.filter((c) => c !== cat)
            )
          }
        />
        {cat}
      </label>
    </li>
  ))}
</ul>
<div className="mt-4">
  <InPut type={'number'} placeholder={'Enter min price'} onChange={(a)=> setPriceRange({...priceRange, low: a.target.value})}  />
  <InPut type={'number'} placeholder={'Enter max price'} onChange={(a)=> setPriceRange({...priceRange, high: a.target.value})} />
  {/* <input
    type="number"
    placeholder="Max Price"
    className="w-full p-1 rounded"
    onChange={(e) =>
      setPriceRange({ ...priceRange, high: e.target.value })
    }
  /> */}
</div>

      </aside>

      {/* Products Scroll Area */}
      <section className="bg-[#2c3639] rounded-2xl p-4 overflow-y-auto">
        {productsList.length === 0 ? (
          <p className="text-center text-gray-300 mt-10">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
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
                    src={item.Imgs?.[0]}
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
                    Rs.{item.Price.originalPrice}
                  </p>
                  <p className="text-xs mt-1">Category: {item.Category}</p>
                  <p className="text-xs mt-1">Reviews: ⭐⭐⭐</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Products;
