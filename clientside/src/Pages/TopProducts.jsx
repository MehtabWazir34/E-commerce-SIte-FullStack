import { Link } from "react-router";
import football from "../Pics/football.jfif";
import vollyball from "../Pics/vollyball.jpg";
import wears from "../Pics/wears.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const products = [
  { id: 1, Title: "Tournament Football", Detail:"Here is more details about the product.", Price: 1800, img: football },
  { id: 2, Title: "Professional Volleyball", Detail:"Here is more details about the product.", Price: 1600, img: vollyball },
  { id: 3, Title: "Sports Wear Kit", Detail:"Here is more details about the product.", Price: 2200, img: wears },
  { id: 4, Title: "Match Football Pro", Detail:"Here is more details about the product.", Price: 2000, img: football },
];

function ProductRow() {
  const [productList, setProductList] = useState(products);

  useEffect(()=>{
    const TopProducts = async()=>{
      try {
        const products = await axios.get('http://localhost:3400/products/');
        // setProductList(products.data.products);
        setProductList(products.data.products.slice(0,8))
        
      } catch (error) {
        console.log("Err to getTOp:", error);
        
      }
    };
    TopProducts();
  },[]);
  if(!productList) return null;
  console.log("list",productList);
  
  return (
    <div id="top-products" className="mx-auto flex justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max ">
        {productList.map((item) => (
          <Link
            key={item._id}
            to={`/product/details/${item._id}`}
            className="w-72 h-80 bg-[#f2d39a] rounded-2xl  hover:scale-105 transition duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-48 ">
              <span
                Title="Add to favourite"
                className="absolute top-2 left-2 z-10 bg-white text-red-600 px-2 rounded-full hover:bg-red-600 hover:text-white transition"
              >
                ♥
              </span>

              <img
                src={item?.Imgs?.[0] || item?.Imgs?.[1] ? item.Imgs[0].startsWith('http') || item.Imgs[1].startsWith('http') ? item.Imgs[0] || item.Imgs[1] : `http://localhost:3400${item.Imgs[0] || item.Imgs[1]}` : '/placeholder.png'}
                alt={item.Title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>

            {/* Content */}
            <div className="p-2 text-[#2c3639]">
              <h3 className="font-bold text-sm">{item.Title}</h3>
              <p className="font-semibold">Rs. {item.Price}</p>
              <p className="text-sm">Reviews: ⭐⭐⭐</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TopProducts() {
  return (
    <section className="w-full flex flex-col justify-center p-4 my-10 bg-[#2c3639] rounded-2xl space-y-8">
      <h2 className="text-3xl font-bold text-[#ffe2af] border-b-4 border-amber-600 w-fit mx-auto pb-2">
        Our Top Items
      </h2>

      {/* Product Rows */}
      <ProductRow />
      <div className="w-full hidden md:flex">

      {/* <ProductRow /> */}
      </div>

      {/* CTA */}
      <div className="flex justify-center py-6">
        <Link
          to="/products"
          className="rounded-full border border-[#ffe2af] text-[#ffe2af] px-8 py-2 font-semibold hover:bg-[#ffe2af] hover:text-black transition"
        >
          Explore All
        </Link>
      </div>
    </section>
  );
}

export default TopProducts;
