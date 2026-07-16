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

  const handleEdit = ()=>{
    setEditMode(true)
    setEditData({
        Title: item.Title,
        Detail: item.Detail,
        Category: Array.isArray(item?.Category) ? item.Category[0] : item.Category ,
        Price: item?.Price,
        offPrice: item?.offPrice,
        deliveryFee: item.deliveryFee,
        Imgs: item?.Imgs?.slice(0,6) // limit to 6 images
        
      
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
    <section className="max-w-10/11 min-h-10/11 mt-8 rounded-2xl p-4 mx-auto bg-[#2c3639]">

      <div className="max-w-full flex flex-col md:grid md:grid-cols-2 gap-6 mt-4">
        {/* Images Section */}
        <div className="w-full md:w-7/12 shadow-2xl rounded-2xl p-4">
          {/* Main Image */}
          <div className="w-full rounded-xl overflow-hidden">
            <img
              src={mainImg
                // .startsWith('http') ? mainImg : `${mainImg}`
            }
              alt={item.Title}
              className="w-full h-80 object-contain rounded-xl transition-all duration-300 hover:scale-[1.5]"
            />
          </div>

          <div className="grid grid-cols-3 sm:place-items-center sm:flex sm:justify-center gap-3 mt-4">
            {item.Imgs?.map((img, index) => (
              <img
                key={index}
                src={img
                  // .startsWith('http') ? img : `${img}`
                  }
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
        <div className="w-full flex flex-1 flex-col rounded-2xl shadow-2xl p-4 text-left text-[#ffe2af]">
          <div className={"flex gap-2 " + (isAdmin ? "" : "hidden")}>
                <button 
                onClick={()=> setMsgBox(true)} 
                className="flex-1 cursor-pointer rounded-md p-2 border font-semibold bg-red-500 hover:bg-red-600 transition">
                  {/* Admin Only */}
                  Delete Product
                </button>
                <button 
                onClick={() => handleEdit()} 
                className="flex-1 cursor-pointer rounded-md p-2 border font-semibold hover:bg-green-600 transition">
                  {/* Admin Only */}
                  Edit Product
                </button>
              </div>
              {
                msgBox &&(
                  <div className="fixed inset-0 bg-black/60 z-10 flex justify-center items-center">
                  <div className="rounded-2xl p-4 bg-[#2c3936] shadow-lg w-120">
                    <h2 className="text-xl font-semibold">The action can't be return. Delete Product?</h2>
                    <div className="flex justify-end gap-x-4">
                      <button onClick={()=> setMsgBox(false)} className="bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-2xl p-2">Cancel</button>
                      <button onClick={()=> deleteProduct(item._id)} className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-2xl p-2">Delete</button>
                    </div>
                  </div>
                  </div>
                )
              }
              {
                editMode && (
                  <section className="w-full min-h-screen overflow-auto bg-black/60 inset-0 fixed z-30 p-4">
        <div className="max-w-6xl mx-auto bg-[#364145] rounded-2xl shadow-xl p-6">
          <h2 className="text-3xl text-[#f2d39a] text-center mb-6 font-semibold">
            Update Product
          </h2>
                  <span className="absolute top-10 right-28 font-semibold text-[#2c3936] bg-[#f2d39a] px-3 py-1 rounded-full transition-all duration-200  cursor-pointer" 
                  onClick={() => setEditMode(false)}
                  > X</span>
          <form
            onSubmit={updateProduct}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
            <div className="flex flex-col gap-2">
              <LaBel lblFor="Category" lblName="Category" />
              <select
                id="Category"
                className="rounded-md border border-gray-500 px-2 py-2 text-[#f2d39a] text-sm text-center outline-none"
                value={editData.Category}
                onChange={(e) =>
                  setEditData({ ...editData, Category: e.target.value })
                }
                required
              >
                <option value="">-- Select Category --</option>
                <option className='bg-[#364145]' value="Cricket">Cricket</option>
                <option className='bg-[#364145]' value="Football">Football</option>
                <option className='bg-[#364145]' value="Volleyball">Volleyball</option>
                <option className='bg-[#364145]' value="Wears">Wears</option>
              </select>
            </div>
  
            <div className="flex flex-col gap-2">
              <LaBel lblFor="Title" lblName="Title" />
              <textarea
                id="Title"
                rows={2}
                resize="none"
                className="resize-none rounded-md border border-gray-500  px-2 py-2 text-sm outline-none"
                placeholder="Enter product Title"
                value={editData.Title}
                onChange={(e) =>
                  setEditData({ ...editData, Title: e.target.value })
                }
                required
              />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-2">
              <div className='grid'>
                <LaBel lblFor="original" lblName="Original Price" />
                <InPut
                  type="number"
                  id="original"
                  placeholder="Original Price"
                  value={editData.Price}
                  onChange={(e) =>
                    setEditData({ ...editData, Price: e.target.value }
                  )
                  }
                  required
                />
              </div>
  
              <div className='grid'>
                <LaBel lblFor="deliveryFee" lblName="Delivery Fee" />
                <InPut
                  type="number"
                  id="deliveryFee"
                  placeholder="Delivery Fee"
                  value={editData.deliveryFee}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      deliveryFee: e.target.value,
                    })
                  }
                />
              </div>
  
              <div className='grid'>
                <LaBel lblFor="Discount" lblName="Discount" />
                <InPut
                  type="number"
                  id="Discount"
                  placeholder="Discount"
                  value={editData.offPrice}
                  onChange={(e) =>
                    setEditData({...editData, offPrice: e.target.value})
                  }
                />
              </div>
            </div>
  
            <div className="flex flex-col gap-2 lg:col-span-2">
              <LaBel lblFor="Detail" lblName="Detail" />
              <textarea
                id="Detail"
                rows={5}
                className="rounded-md border border-gray-500  px-2 py-2 text-sm outline-none"
                placeholder="Write Detailed description of the item"
                value={editData.Detail}
                onChange={(e) =>
                  setEditData({ ...editData, Detail: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col gap-2 lg:col-span-2">
              <LaBel lblFor="" lblName="Images" />
              <input
                id="imgs"
                type='file'
                accept='image/*'
                multiple hidden
                className=" w-full text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d39a] file:px-4 file:py-2 file:text-black"
                // placeholder="Write Detailed description of the item"
                // value={editData.Imgs}
                onChange={handleImageChange}
                
              />
              <label htmlFor='imgs' className='bg-[#f2d39a] p-2 font-semibold text-center text-sm rounded-md cursor-pointer text-black max-w-28'>Select Files</label>
            </div>
              { previewImages.length > 0 && 
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:col-span-2 gap-1'>
                  {
                    previewImages.map((file, idx)=>(
                      <div key={idx} className='relative'>
                        <img src={file} alt="product img" className='object-contain rounded-md h-24 w-full border rounded-sm ' />
                        <span onClick={()=>removeImage(idx)} className='absolute top-0 right-0 rounded-full px-1 cursor-pointer bg-red-500'>X</span>
                      </div>
                    ))
                  }
                </div>
              }
  
            <div className="lg:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-[#f2d39a] text-black font-semibold hover:opacity-90 transition-all duration-300 cursor-pointer"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </section>
                )
              }
          <div className="border-b-2 pb-4 mb-4 wrap-break-word overflow-hidden"> 
            <h2 className="text-2xl font-bold ">{item.Title}</h2>
            <p className="text-sm opacity-80 mt-2">
              {item.Detail}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quantity & Actions */}
            <div className="flex flex-col gap-4">
             

              {/* Buttons */}
              <div className="flex gap-2">
                <button onClick={()=> addToCart(id)} className="flex-1 cursor-pointer rounded-md p-2 border font-semibold hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button onClick={() => navigateTo(`/placeorder/${item._id}`)} className="flex-1 cursor-pointer rounded-md p-2 border font-semibold bg-blue-600 hover:bg-blue-700 transition">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Price Info */}
            <div className="text-sm">
              <div className="flex justify-between">
              <h2 className="my-1">Price</h2>
              <h2 className="my-1">{Price}</h2>
              </div>
              <div className="flex justify-between">
              <h2 className="my-1">Quantity</h2>
              <h2 className="my-1">{quantity > 9 ? quantity : `0${quantity}`}</h2>
              </div>
              <div className="flex justify-between">
              <h2 className="my-1">Discount</h2>
              <h2 className="my-1"> {offPrice > 9 ? offPrice : `0${offPrice}`}</h2>
              </div>
              <div className="flex justify-between">
              <h2 className="my-1">Delivery</h2>
              <h2 className="my-1">{deliveryFee > 9 ? deliveryFee : '00'}</h2>
              </div>

              <div className="flex justify-between border-t-2 mt-2 pt-2 font-bold text-lg">
                <h2 className="my-1">Total</h2>
                <h2 className="my-1">{total}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
