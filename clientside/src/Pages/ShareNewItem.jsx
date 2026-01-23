import { useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts";

function ShareNewItem() {
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    category: "",
    prices: {
      original: "",
      market: "",
      off: "",
    },
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  /* ===============================
     IMAGE HANDLING (MAX 6)
  ================================ */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + previewImages.length > 6) {
      alert("You can upload only up to 6 images.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /* ===============================
     SUBMIT HANDLER
  ================================ */
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("detail", formData.detail);
    payload.append("category", formData.category);

    payload.append("originalPrice", formData.prices.original);
    payload.append("marketPrice", formData.prices.market);
    payload.append("offPrice", formData.prices.off);

    formData.images.forEach((img) => {
      payload.append("images", img);
    });

    console.log("Ready for backend upload");
    // axios.post("/api/products", payload)
  };

  return (
    <section className="w-full min-h-screen bg-[#2c3936] px-4 py-8">
      <div className="max-w-6xl mx-auto bg-[#364145] rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl text-[#f2d39a] text-center mb-6 font-semibold">
          Share New Item
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* ================= CATEGORY ================= */}
          <div className="flex flex-col gap-2">
            <LaBel lblFor="category" lblName="Category" />
            <select
              id="category"
              className="rounded-md border border-gray-500 bg-[#ffe2af] px-2 py-2 text-sm outline-none"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Wears">Wears</option>
            </select>
          </div>

          {/* ================= TITLE ================= */}
          <div className="flex flex-col gap-2">
            <LaBel lblFor="title" lblName="Title" />
            <textarea
              id="title"
              rows={2}
              resize="none"
              className="resize-none rounded-md border border-gray-500 bg-[#ffe2af] px-2 py-2 text-sm outline-none"
              placeholder="Enter product title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* ================= PRICES ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-2">
            <div>
              <LaBel lblFor="original" lblName="Original Price" />
              <InPut
                type="number"
                id="original"
                placeholder="Original price"
                value={formData.prices.original}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prices: { ...formData.prices, original: e.target.value },
                  })
                }
                required
              />
            </div>

            <div>
              <LaBel lblFor="market" lblName="Market Price" />
              <InPut
                type="number"
                id="market"
                placeholder="Market price"
                value={formData.prices.market}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prices: { ...formData.prices, market: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <LaBel lblFor="off" lblName="Off Price" />
              <InPut
                type="number"
                id="off"
                placeholder="Discounted price"
                value={formData.prices.off}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prices: { ...formData.prices, off: e.target.value },
                  })
                }
              />
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="flex flex-col gap-2 lg:col-span-2">
            <LaBel lblFor="detail" lblName="Detail" />
            <textarea
              id="detail"
              rows={5}
              className="rounded-md border border-gray-500 bg-[#ffe2af] px-2 py-2 text-sm outline-none"
              placeholder="Write detailed description of the item"
              value={formData.detail}
              onChange={(e) =>
                setFormData({ ...formData, detail: e.target.value })
              }
              required
            />
          </div>

          {/* ================= IMAGE UPLOAD ================= */}
          <div className="lg:col-span-2">
            <LaBel lblFor="images" lblName="Upload Images (Max 6)" />
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d39a] file:px-4 file:py-2 file:text-black"
            />
          </div>

          {/* ================= IMAGE PREVIEW ================= */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 lg:col-span-2">
              {previewImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt="preview"
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ================= SUBMIT ================= */}
          <div className="lg:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#f2d39a] text-black font-semibold hover:opacity-90 transition"
            >
              Upload Item
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ShareNewItem;
