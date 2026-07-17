import axiosInstance from '../Utility/axiosInstance.js'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { InPut, LaBel } from "../Inputs/InPuts";
import { useUser } from "../Utility/THEUser";

function Details() {
  const { id } = useParams();
  const {theUser} = useUser()

  const [item, setItem] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [theUser, setTheUser ] = useState();
  const [msgBox, setMsgBox] = useState(false);
  let isAdmin = theUser?.role === 'admin'; 
  const [editMode, setEditMode] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [editData, setEditData] = useState({
    Title: '',
    Detail:'',
    Category:'',
    Price:'',
    deliveryFee: '',
    offPrice: '',
    Imgs: []
  });

  let navigateTo = useNavigate();
  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        const product = res.data.product;
        setItem(product);
        setMainImg(product?.Imgs?.[0]); // first image as main
        setPreviewImages(editData?.Imgs)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getItem();
  }, [id]);

  const addItem = {
      "itemId" : id,
      "itemQty": quantity
  }
  const addToCart = async()=>{
    try {
          let theItemToadd = await axiosInstance.post(`/user/addtocart`,
            addItem
          );
          console.log(theItemToadd);
                
    } catch (error) {
      console.log("error to add item", error);
      
    }
  }

  const deleteProduct = async()=>{
    try {
        const delPro = await axiosInstance.delete(`/admin/delpro/${id}`, {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log("Deleted product:", delPro);
        navigateTo('/products');
    } catch (error) {
      console.log("Error:", error);
      
    }
  }

  const handleImageChange = (a)=>{
    let files = Array.from(a.target.files)
    if(files.length + previewImages.length > 6){
      alert("Maximum 6 images you can upload!")
    };
    setEditData((pre)=>({ 
      ...pre, 
      Imgs:[...pre.Imgs, ...files]
    }));
    const dispImg = files.map((img)=> URL.createObjectURL(img));
    setPreviewImages((pre)=> [...pre, ...dispImg]);
  }
  const removeImage = (idx)=>{
    setPreviewImages((pre)=> pre.filter((_, i)=> i !== idx));

    setEditData((pre)=>({
      ...pre, Imgs: pre.Imgs.filter((_, i)=> i !== idx),
    }));
  }
  const updateProduct = async (a)=>{
    a.preventDefault();
    const myFormData = new FormData();
    myFormData.append("Title", editData.Title)
    myFormData.append("Detail", editData.Detail)
    myFormData.append("deliveryFee", editData.deliveryFee)
    myFormData.append("Price", editData.Price)
    myFormData.append("offPrice", editData.offPrice)
    myFormData.append("Category", editData.Category)
    editData.Imgs.forEach((file)=>{
      myFormData.append("Imgs", file)
    })
      await axiosInstance.put(`/admin/editpro/${id}`, myFormData,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data"
        }
      })
      window.location.reload()
      setEditMode(false)
      
  }

  const handleEdit = () => {
    setEditMode(true)
    setEditData({
      Title: item.Title,
      Detail: item.Detail,
      Category: Array.isArray(item?.Category) ? item.Category[0] : item.Category,
      Price: item?.Price,
      offPrice: item?.offPrice,
      deliveryFee: item.deliveryFee,
      Imgs: item?.Imgs?.slice(0, 6) // limit to 6 images
    })
    // setPreviewImages(item.Imgs || [])
  }
   
  if (!item) return null;

  const Price = item?.Price || 0;
  const offPrice = item?.offPrice || 0;
  const deliveryFee = item?.deliveryFee || 0;
  const subtotal = Price * quantity - quantity * offPrice;
  const total = Number(subtotal) + Number(deliveryFee);

  return (
    <section className="max-w-7xl min-h-screen mt-8 rounded-3xl p-6 mx-auto bg-transparent font-sans antialiased text-gray-800">

      <div className="max-w-full flex flex-col md:grid md:grid-cols-2 gap-8 mt-4">
        {/* Images Canvas Panel */}
        <div className="w-full shadow-sm rounded-3xl p-6 bg-white border border-gray-100 flex flex-col justify-between">
          {/* Main Display Window */}
          <div className="w-full rounded-2xl overflow-hidden bg-gray-50/50 flex items-center justify-center p-6 min-h-80">
            <img
              src={mainImg}
              alt={item.Title}
              className="max-h-80 object-contain rounded-xl transition-all duration-300 transform hover:scale-105"
            />
          </div>

          {/* Micro Thumbnails Carousel Grid */}
          <div className="grid grid-cols-4 sm:flex sm:justify-center gap-3 mt-6">
            {item.Imgs?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                onClick={() => setMainImg(img)}
                className={`w-16 h-16 object-cover rounded-xl cursor-pointer border transition-all duration-200 ${mainImg === img ? 'border-purple-600 scale-105 shadow-sm shadow-purple-100' : 'border-gray-100 opacity-70 hover:opacity-100'}`}
              />
            ))}
          </div>
        </div>

        {/* Detailed Description & Action Dashboard Container */}
        <div className="w-full flex flex-col rounded-3xl shadow-sm p-6 text-left bg-white border border-gray-100 justify-between">
          <div>
            {/* Admin Utility Toolbar layout */}
            <div className={"flex gap-3 mb-6 " + (isAdmin ? "" : "hidden")}>
              <button 
                onClick={()=> setMsgBox(true)} 
                className="flex-1 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-white text-red-600 border border-red-200 hover:bg-red-50 cursor-pointer">
                Delete Product
              </button>
              <button 
                onClick={() => handleEdit()} 
                className="flex-1 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700">
                Edit Product
              </button>
            </div>

            {/* Confirm Removal System Modal box layout */}
            {
              msgBox && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
                  <div className="rounded-3xl p-6 bg-white shadow-xl max-w-md w-full border border-gray-100">
                    <h2 className="text-lg font-sans font-black text-gray-900 uppercase tracking-tight">Delete Product?</h2>
                    <p className="text-xs text-gray-400 mt-1 font-medium">This action cannot be undone.</p>
                    <div className="flex justify-end gap-x-3 mt-6">
                      <button onClick={()=> setMsgBox(false)} className="px-4 py-2 rounded-full text-xs font-bold transition-all bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer">Cancel</button>
                      <button onClick={()=> deleteProduct(item._id)} className="px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-100">Delete</button>
                    </div>
                  </div>
                </div>
              )
            }

            {/* Global Update Core Module Panel Screen wrapper */}
            {
              editMode && (
                <div className="w-full inset-0 fixed bg-gray-900/40 backdrop-blur-sm z-50 p-4 flex items-center justify-center overflow-y-auto">
                  <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-6 border border-gray-100 relative max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl text-gray-900 font-sans font-black text-center mb-6 uppercase tracking-tight">
                      Update Product
                    </h2>
                    <button 
                      className="absolute top-6 right-6 font-sans font-bold text-gray-400 hover:text-gray-900 bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer text-sm" 
                      onClick={() => setEditMode(false)}
                    >
                      ✕
                    </button>
                    <form onSubmit={updateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5 [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-500">
                        <LaBel lblFor="Category" lblName="Category" />
                        <select
                          id="Category"
                          className="rounded-xl px-3 py-2.5 text-gray-700 text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:border-purple-300 font-medium"
                          value={editData.Category}
                          onChange={(e) => setEditData({ ...editData, Category: e.target.value })}
                          required
                        >
                          <option value="">-- Select Category --</option>
                          <option value="Cricket">Cricket</option>
                          <option value="Football">Football</option>
                          <option value="Volleyball">Volleyball</option>
                          <option value="Wears">Wears</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5 [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-500">
                        <LaBel lblFor="Title" lblName="Title" />
                        <textarea
                          id="Title"
                          rows={1}
                          className="resize-none rounded-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-700 font-medium border border-gray-200 focus:outline-none focus:border-purple-300"
                          placeholder="Enter product Title"
                          value={editData.Title}
                          onChange={(e) => setEditData({ ...editData, Title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3 md:col-span-2 [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-500 [&_input]:bg-gray-50 [&_input]:border-gray-200 [&_input]:rounded-xl [&_input]:text-sm [&_input]:py-2.5 focus-within:[&_input]:border-purple-300">
                        <div className='grid gap-1'>
                          <LaBel lblFor="original" lblName="Original Price" />
                          <InPut type="number" id="original" placeholder="Price" value={editData.Price} onChange={(e) => setEditData({ ...editData, Price: e.target.value })} required />
                        </div>
                        <div className='grid gap-1'>
                          <LaBel lblFor="deliveryFee" lblName="Delivery Fee" />
                          <InPut type="number" id="deliveryFee" placeholder="Fee" value={editData.deliveryFee} onChange={(e) => setEditData({ ...editData, deliveryFee: e.target.value })} />
                        </div>
                        <div className='grid gap-1'>
                          <LaBel lblFor="Discount" lblName="Discount" />
                          <InPut type="number" id="Discount" placeholder="Discount" value={editData.offPrice} onChange={(e) => setEditData({...editData, offPrice: e.target.value})} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2 [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-500">
                        <LaBel lblFor="Detail" lblName="Detail" />
                        <textarea
                          id="Detail"
                          rows={4}
                          className="rounded-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-700 font-medium border border-gray-200 focus:outline-none focus:border-purple-300"
                          placeholder="Write Detailed description of the item"
                          value={editData.Detail}
                          onChange={(e) => setEditData({ ...editData, Detail: e.target.value })}
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2 [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-500">
                        <LaBel lblFor="" lblName="Images" />
                        <input id="imgs" type='file' accept='image/*' multiple hidden onChange={handleImageChange} />
                        <label htmlFor='imgs' className='bg-gray-100 px-4 py-2.5 font-sans font-bold text-center text-xs rounded-xl cursor-pointer text-gray-600 border border-gray-200 max-w-fit hover:bg-gray-200 transition-colors uppercase tracking-wider'>Select Files</label>
                      </div>

                      {previewImages.length > 0 && 
                        <div className='grid grid-cols-3 sm:grid-cols-6 md:col-span-2 gap-2 mt-2'>
                          {previewImages.map((file, idx)=>(
                            <div key={idx} className='relative border border-gray-100 rounded-xl p-1 bg-gray-50/50 aspect-square flex items-center justify-center'>
                              <img src={file} alt="product img" className='object-contain h-full w-full rounded-lg' />
                              <span onClick={()=>removeImage(idx)} className='absolute -top-1.5 -right-1.5 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer bg-red-600 text-white font-bold text-[10px] shadow-sm'>✕</span>
                            </div>
                          ))}
                        </div>
                      }

                      <div className="md:col-span-2 flex justify-center mt-4">
                        <button type="submit" className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700 w-full md:w-auto">
                          Update Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )
            }

            {/* Typography Header Content text blocks */}
            <div className="pb-4 mb-4 border-b border-gray-100"> 
              <h2 className="text-xl md:text-2xl font-sans font-black text-gray-900 uppercase tracking-tight">{item.Title}</h2>
              <p className="text-xs text-gray-400 mt-2.5 font-medium leading-relaxed">
                {item.Detail}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-4">
            {/* Numerical Properties Matrix Display card layout */}
            <div className="text-xs bg-gray-50/70 border border-gray-100 p-4 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-gray-500 font-medium">
                <span>Price</span>
                <span className="font-sans font-bold text-gray-900 text-sm">${Price}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 font-medium">
                <span>Quantity</span>
                <span className="font-sans font-bold text-gray-900 text-sm">{quantity > 9 ? quantity : `0${quantity}`}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 font-medium">
                <span>Discount</span>
                <span className="font-sans font-bold text-purple-600 text-sm">-{offPrice > 9 ? offPrice : `0${offPrice}`}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 font-medium">
                <span>Delivery Fee</span>
                <span className="font-sans font-bold text-gray-900 text-sm">${deliveryFee > 0 ? deliveryFee : '0.00'}</span>
              </div>

              <hr className="border-gray-100" />
              <div className="flex justify-between items-center font-sans font-black text-base text-gray-900 pt-1">
                <span>Total Amount</span>
                <span className="text-purple-600 text-lg">${total}</span>
              </div>
            </div>

            {/* Checkout Action Control row buttons */}
            <div className="flex gap-3">
              <button onClick={()=> addToCart(id)} className="flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-white text-purple-600 border border-purple-200 hover:bg-purple-50 cursor-pointer">
                Add to Cart
              </button>
              <button onClick={() => navigateTo(`/placeorder/${item._id}`)} className="flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700 cursor-pointer">
                Buy Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Details;