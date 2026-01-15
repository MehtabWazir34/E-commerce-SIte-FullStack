import { Link } from "react-router";
import football from "../Pics/football.jfif";
import vollyball from "../Pics/vollyball.jpg";
import wears from "../Pics/wears.jpg";

const products = [
  { id: 1, title: "Tournament Football", price: 1800, img: football },
  { id: 2, title: "Professional Volleyball", price: 1600, img: vollyball },
  { id: 3, title: "Sports Wear Kit", price: 2200, img: wears },
  { id: 4, title: "Match Football Pro", price: 2000, img: football },
];

function ProductRow() {
  return (
    <div className="mx-auto flex justify-center w-full">
      <div className="flex gap-x-6 min-w-max ">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/detail/${item.id}`}
            className="w-64 h-80 bg-[#f2d39a] rounded-2xl  hover:scale-105 transition duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-48 ">
              <span
                title="Add to favourite"
                className="absolute top-2 left-2 z-10 bg-white text-red-600 px-2 rounded-full hover:bg-red-600 hover:text-white transition"
              >
                ♥
              </span>

              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>

            {/* Content */}
            <div className="p-2 text-[#2c3639]">
              <h3 className="font-bold text-sm">{item.title}</h3>
              <p className="font-semibold">Rs. {item.price}</p>
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
      <ProductRow />

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
