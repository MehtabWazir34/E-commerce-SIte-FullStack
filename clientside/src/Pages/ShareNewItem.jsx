import { useEffect, useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts";
import axios from "axios";

function ShareNewItem() {
  const [formData, setFormData] = useState({
    Title: "",
    Detail: "",
    Category: "",
    Price: {
      originalPrice: "",
      mrp: "",
      offPrice: "",
    },
    Imgs: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  // useEffect(()=>{
  //   const addNewItem = async()=>{
  //       try {
  //           let theItem = await axios.post('http://localhost:3400/products/addnew', {formData});

  //           console.log('Item uploaded', theItem);
  //       } catch (error) {
  //           console.log('Error to upload item', error);
            
  //       }
  //   };
  //   addNewItem();
  // })
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + previewImages.length > 6) {
      alert("You can upload only up to 6 images.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      Imgs: [...prev.Imgs, ...files],
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      Imgs: prev.Imgs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("Title", formData.Title);
    payload.append("Detail", formData.Detail);
    payload.append("Category", formData.Category);

    payload.append("originalPrice", formData.Price.original);
    payload.append("mrp", formData.Price.mrp);
    payload.append("offPrice", formData.Price.offPrice);

    formData.Imgs.forEach((img) => {
      payload.append("Imgs", img);
    });

    console.log("Ready for backend upload");
    // axios.post("/api/products", payload)
    await axios.post('http://localhost:3400/products/addnew', payload,{
      headers:{
          "Content-Type": "multipart/form-data"
      }
    } )
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
            <LaBel lblFor="Category" lblName="Category" />
            <select
              id="Category"
              className="rounded-md border border-gray-500 bg-[#ffe2af] px-2 py-2 text-sm text-center outline-none"
              value={formData.Category}
              onChange={(e) =>
                setFormData({ ...formData, Category: e.target.value })
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

          <div className="flex flex-col gap-2">
            <LaBel lblFor="Title" lblName="Title" />
            <textarea
              id="Title"
              rows={2}
              resize="none"
              className="resize-none rounded-md border border-gray-500 bg-[#ffe2af] px-2 py-2 text-sm outline-none"
              placeholder="Enter product Title"
              value={formData.Title}
              onChange={(e) =>
                setFormData({ ...formData, Title: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-2">
            <div>
              <LaBel lblFor="original" lblName="Original Price" />
              <InPut
                type="number"
                id="original"
                placeholder="Original price"
                value={formData.Price.originalPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Price: { ...formData.Price, originalPrice: e.target.value },
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
                value={formData.Price.mrp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Price: { ...formData.Price, mrp: e.target.value },
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
                value={formData.Price.offPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Price: { ...formData.Price, offPrice: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-2">
            <LaBel lblFor="Detail" lblName="Detail" />
            <textarea
              id="Detail"
              rows={5}
              className="rounded-md border border-gray-500 bg-[#ffe2af] px-2 py-2 text-sm outline-none"
              placeholder="Write Detailed description of the item"
              value={formData.Detail}
              onChange={(e) =>
                setFormData({ ...formData, Detail: e.target.value })
              }
              required
            />
          </div>

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

          <div className="lg:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#f2d39a] text-black font-semibold hover:opacity-90 transition-all duration-300 cursor-pointer"
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
