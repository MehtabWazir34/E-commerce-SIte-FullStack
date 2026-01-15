import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Details() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get(`http://localhost:3400/products/${id}`);
        const product = res.data.product;

        setItem(product);
        setMainImg(product?.Imgs?.[0]); // first image as main
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getItem();
  }, [id]);

  if (!item) return null;

  const price = item?.Price?.originalPrice || 0;
  const discount = 0;
  const total = price * quantity - discount;

  return (
    <section className="max-w-10/11 min-h-8/10 mt-8 rounded-2xl p-4 mx-auto bg-[#2c3639]">

      <div className="w-full grid grid-cols-2 gap-6 mt-4">
        {/* Images Section */}
        <div className="w-7/12 shadow-2xl rounded-2xl p-4">
          {/* Main Image */}
          <div className="w-full rounded-xl overflow-hidden">
            <img
              src={mainImg}
              alt={item.Title}
              className="w-full h-80 object-cover rounded-xl transition-all duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-4">
            {item.Imgs?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                onClick={() => setMainImg(img)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border transition-all duration-300
                  ${
                    mainImg === img
                      ? "border-[#ffe2af] scale-105 cursor-pointer"
                      : "border-transparent hover:border-[#ffe2af]"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full rounded-2xl shadow-2xl p-4 text-left text-[#ffe2af]">
          <div className="border-b-2 pb-4 mb-4">
            <h2 className="text-2xl font-bold">{item.Title}</h2>
            <p className="text-sm opacity-80 mt-2">
              {item.Detail}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Quantity & Actions */}
            <div className="flex flex-col gap-4">
              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex-1 cursor-pointer rounded-md p-2 font-bold bg-red-600 hover:bg-red-700 transition"
                >
                  −
                </button>

                <span className="px-4 font-bold text-lg">{quantity < 10 ? `0${quantity}` : quantity}</span>

                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="flex-1 cursor-pointer rounded-md p-2 font-bold bg-green-600 hover:bg-green-700 transition"
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 cursor-pointer rounded-md p-2 border font-semibold hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button className="flex-1 cursor-pointer rounded-md p-2 border font-semibold bg-blue-600 hover:bg-blue-700 transition">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Price Info */}
            <div className="text-sm">
              <h2 className="my-1">Price : {price}</h2>
              <h2 className="my-1">Quantity : {quantity}</h2>
              <h2 className="my-1">Discount : {discount}</h2>
              <h2 className="my-1">Delivery : 0</h2>

              <h2 className="border-t-2 mt-2 pt-2 font-bold text-lg">
                Total : {total}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
