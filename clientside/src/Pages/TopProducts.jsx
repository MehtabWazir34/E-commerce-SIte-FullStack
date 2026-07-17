import { Link } from "react-router";
import football from "../Pics/football.jfif";
import vollyball from "../Pics/vollyball.jpg";
import wears from "../Pics/wears.jpg";
import { useEffect, useState } from "react";
import axiosInstance from '../Utility/axiosInstance.js'

function ProductRow() {
  const [productList, setProductList] = useState([]);

  useEffect(()=>{
    const TopProducts = async()=>{
      try {
        const res = await axiosInstance.get(`/products/`);
        // setProductList(products.data.products);
        setProductList((res.data.products ?? []).slice(0, 8)); 
      } catch (error) {
        console.log("Err to getTTopProducts:", error);
        
      }
    };
    TopProducts();
  },[]);
  if(!productList) return null;
  // console.log("list",productList);
  
  return (
    <div id="top-products" className="mx-auto flex justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productList.map((item) => (
          <Link
            data-aos="fade-up"
            key={item._id}
            to={`/product/details/${item._id}`}
            className="w-72 h-80 bg-chalk rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition-all duration-300 overflow-hidden group"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-t-[20px] bg-[#EDEFF0]">
              <img
                src={item?.Imgs?.[0] || item?.Imgs?.[1] ? item.Imgs[0].startsWith('http') || item.Imgs[1].startsWith('http') ? item.Imgs[0] || item.Imgs[1] : `${item.Imgs[0] || item.Imgs[1]}` : '/placeholder.png'}
                alt={item.Title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <span className="absolute top-3 left-3 bg-volt text-court text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                Top item
              </span>

              <button className="absolute top-3 right-3 p-2.5 rounded-full transition-all duration-150 bg-chalk/90 shadow-sm hover:bg-volt">
                <svg className="w-4 h-4 text-court" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium text-court line-clamp-2 mb-2">{item.Title}</h3>
              <div className="flex items-center gap-2">
                <span className="bg-court text-volt text-sm font-bold px-3 py-1.5 rounded-full">
                  Rs. {item.Price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TopProducts() {
  return (
    <section className="w-full flex flex-col justify-center p-4 my-10 bg-chalk rounded-2xl space-y-8">
      <h2 className="text-3xl font-display font-black text-court border-b-4 border-volt w-fit mx-auto pb-2 uppercase tracking-wider">
        Our Top Items
      </h2>

      {/* Product Rows */}
      <ProductRow />
      {/* <div className="w-full hidden md:flex">

      <ProductRow />
      </div> */}

      {/* CTA */}
      <div className="flex justify-center py-6">
        <Link
          to="/products"
          className="px-5 py-2.5 text-sm font-bold uppercase tracking-wide rounded-md transition-all duration-150 bg-purple-500 hover:bg-purple-700  text-white"
        >
          Explore All
        </Link>
      </div>
    </section>
  );
}

export default TopProducts;
