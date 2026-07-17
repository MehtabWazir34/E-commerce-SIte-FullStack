import { useEffect, useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts";
import axiosInstance from '../Utility/axiosInstance.js'
import { useNavigate } from "react-router";

function ShareNewItem() {
  const [formData, setFormData] = useState({
    Title: "",
    Detail: "",
    Category: "",
    Price:"", deliveryFee:"", offPrice:"",
    Imgs: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  let navigateTo = useNavigate()
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
    try {
      
      const payload = new FormData();
      payload.append("Title", formData.Title);
      payload.append("Detail", formData.Detail);
      payload.append("Category", formData.Category);
      payload.append("Price", formData.Price)
      payload.append("offPrice", formData.offPrice);
      payload.append("deliveryFee", formData.deliveryFee)
      
      formData.Imgs.forEach((img) => {
        payload.append("Imgs", img);
      });
      console.log(formData);
      
      console.log("Ready for backend upload");
      // axios.post("/api/products", payload)
      await axiosInstance.post('/products/addnew', payload)
      alert("New item uploaded!")
      navigateTo('/products');
    } catch (error) {
      console.log("Backend stopped!", error);
      
    }
  };

  return (
    <section className="w-full min-h-screen bg-transparent px-4 py-8 font-sans antialiased text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 text-center mb-8 uppercase tracking-tight">
          Upload New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-400 [&_input]:bg-gray-50 [&_input]:border-transparent [&_input]:rounded-xl [&_input]:text-sm [&_input]:py-2.5 focus-within:[&_input]:border-purple-300 focus-within:[&_input]:bg-white"
        >
          <div className="flex flex-col gap-1.5">
            <LaBel lblFor="Category" lblName="Category" />
            <select
              id="Category"
              className="rounded-xl px-3 py-2.5 text-gray-700 text-sm bg-gray-50 border border-transparent focus:border-purple-300 focus:bg-white outline-none font-medium transition-all"
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

          <div className="flex flex-col gap-1.5">
            <LaBel lblFor="Title" lblName="Title" />
            <textarea
              id="Title"
              rows={1}
              className="resize-none rounded-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-700 font-medium border border-transparent focus:border-purple-300 focus:bg-white outline-none transition-all"
              placeholder="Enter product Title"
              value={formData.Title}
              onChange={(e) =>
                setFormData({ ...formData, Title: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3 md:col-span-2">
            <div className="grid gap-1">
              <LaBel lblFor="original" lblName="Original Price" />
              <InPut
                type="number"
                id="original"
                placeholder="Original price"
                value={formData.Price}
                onChange={(e) =>
                  setFormData({ ...formData, Price: e.target.value }
                )
                }
                required
              />
            </div>

            <div className="grid gap-1">
              <LaBel lblFor="market" lblName="Delivery Fee" />
              <InPut
                type="number"
                id="market"
                placeholder="Delivery Fee"
                value={formData.deliveryFee}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deliveryFee: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-1">
              <LaBel lblFor="off" lblName="Off Price" />
              <InPut
                type="number"
                id="off"
                placeholder="Discounted price"
                value={formData.Price.offPrice}
                onChange={(e) =>
                  setFormData({...formData, offPrice: e.target.value})
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <LaBel lblFor="Detail" lblName="Detail" />
            <textarea
              id="Detail"
              rows={4}
              className="rounded-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-700 font-medium border border-transparent focus:border-purple-300 focus:bg-white outline-none transition-all"
              placeholder="Write Detailed description of the item"
              value={formData.Detail}
              onChange={(e) =>
                setFormData({ ...formData, Detail: e.target.value })
              }
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-1.5">
            <LaBel lblFor="images" lblName="Upload Images (Max 6)" />
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple hidden
              onChange={handleImageChange}
            />
            <label htmlFor="images" className="block w-full text-xs bg-gray-100 hover:bg-gray-200 border border-gray-200 p-2.5 rounded-xl max-w-xs text-center font-bold cursor-pointer uppercase tracking-wider transition-all" >Select Files</label>
          </div>

          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:col-span-2 mt-2">
              {previewImages.map((img, index) => (
                <div key={index} className="relative aspect-square border border-gray-100 rounded-xl p-1 bg-gray-50/50 flex items-center justify-center">
                  <img
                    src={img}
                    alt="preview"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px] shadow-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700 w-full md:w-auto cursor-pointer"
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