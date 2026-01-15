import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";


function Products() {
    // const [category, setCat] = useState([]);
    // const [filteredProducts, setFilteredProducts] = useState([]);
    // const [activeCategory, setActiveCategory] = useState("All");
    
  const [productsList, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3400/products/");
        setProducts(res.data.products);
        console.log(res.data.products);
        // (res.data);
        // setCat(res.data.filteredItems.Category);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

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
{/* 
        <ul className="space-y-3 text-sm">
          {category.map((cat) => (
            <li
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`cursor-pointer transition px-3 py-1 rounded-md
                ${
                  activeCategory === cat
                    ? "bg-amber-500 text-black font-semibold"
                    : "text-[#f2d39a] hover:text-white"
                }
                `
              }
            >
              {cat}
            </li>
          ))}
        </ul> */}
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
                key={item.id}
                to={`/product/detail/${item.id}`}
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
