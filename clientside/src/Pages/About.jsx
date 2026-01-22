import {  MdOutlineFacebook } from "react-icons/md"
import khush from '../Pics/pic3.png'
function About(){

    return(
        <section className="max-w-7xl bg-transparent mx-auto min-h-screen mt-8  rounded-2xl p-6 shadow-lg">
          <div className="w-full mx-auto rounded-2xl p-6 bg-[#2c3639] shadow-lg min-h-screen">
          <div className="my-2">
        <h1 className="text-3xl font-bold mb-4 text-left text-[#f2d39a]">About Us</h1>
        <p className="text-lg text-[#ffe2af] leading-relaxed mb-6">
          Welcome to the Jan'Sports! We are providing you the best online sports experience. Our mission is to offer a wide range of high-quality sports' products at competitive prices, ensuring customer satisfaction. 
          </p>

          </div>
          
          <div className=" my-6 grid grid-cols-1 place-items-center md:grid-cols-2 gap-4">
                <div className="flex flex-col justify-start space-y-4">
                    <h1 className="text-xl font-semibold text-[#f2d39a]">Jangin Nawaz</h1>
                    <h2 className="text-lg text-[#ffe2af]">Founder & Owner</h2>
                    <p className="text-[#ffe2af]">A young entrepreneur passionate about sports and entertainment. Aiming to keep the people entertain and physically active by arranging and supporting various sports events and tournoments. He is a visionary youngman who believes in the power of sports to bring people together and inspire greatness.</p>
                    <div className="flex justify-center gap-4">
                        <a href="https://www.facebook.com/jan.waxir.79" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-[#f2d39a] transition-all duration-300"> <MdOutlineFacebook className="text-3xl"/> </a>
                        <a href="https://www.facebook.com/jan.waxir.79" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-[#f2d39a] transition-all duration-300"> <MdOutlineFacebook className="text-3xl"/> </a>
                        <a href="https://www.facebook.com/jan.waxir.79" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-[#f2d39a] transition-all duration-300"> <MdOutlineFacebook className="text-3xl"/> </a>
                    </div>
                </div>
                <div className="max-w-2/3">
                    <img src={`https://scontent.fisb5-2.fna.fbcdn.net/v/t39.30808-6/475375893_1165862658292674_8364090840625912929_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHhGduz5U0pVExgNkh04s0RoMhYtQq_zkmgyFi1Cr_OSdwX_pCsvabJ1xedi9sZtVpJj8d8Qu3Ut8tA-384UAUw&_nc_ohc=krR8N6TNXY8Q7kNvwGn7uPb&_nc_oc=AdmnUBDM__ob2t7s9EAzjdQvW5t9U87gTAvU6NN9unfKV2SB4Rcq914-DMMvJ495slU&_nc_zt=23&_nc_ht=scontent.fisb5-2.fna&_nc_gid=_-uO8G7DKEnC0LZn7_B1Sg&oh=00_Afoooz2o8AFtB6VRElvtfqm7m9I7_XOqOP2apwOyrEJqqA&oe=69785223`} alt="jangin-nawaz pic" className="rounded-2xl w-full hover:scale-105 transition-all duration-300" />
                </div>
                
          </div>
          <div className=" my-6 grid grid-cols-1 place-items-center md:grid-cols-2">
                <div className="flex justify-center w-full items-end ">
                    <img src={khush} alt="khushdil shah pic" className="shadow-lg object-contain max-w-md w-full hover:scale-105 transition-all duration-300" />
                </div>
                <div className="flex flex-col justify-start space-y-4">
                    <h1 className="text-xl font-semibold text-[#f2d39a]">Khushdil Shah</h1>
                    <h2 className="text-lg text-[#ffe2af]">Brand Ambassador</h2>
                    <p className="text-[#ffe2af]">A professional Crickter and brand ambassador for Jan'Sports, dedicated to promoting sports and fitness in the community. He has played for Pakistan National Cricket Team. Also, he is has been the part of various national and international cricekt leagues like PSL, BPL, CPL, etc where he has delivered exceptional performances in both batting and bowling.</p>
                    <div className="flex justify-center gap-4">
                        <a href="https://www.facebook.com/jan.waxir.79" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-[#f2d39a] transition-all duration-300"> <MdOutlineFacebook className="text-3xl"/> </a>
                        <a href="https://www.facebook.com/jan.waxir.79" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-[#f2d39a] transition-all duration-300"> <MdOutlineFacebook className="text-3xl"/> </a>
                        <a href="https://www.facebook.com/jan.waxir.79" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-[#f2d39a] transition-all duration-300"> <MdOutlineFacebook className="text-3xl"/> </a>
                    </div>
                </div>
                

          </div>

          </div>

        </section>
    )
}
export default About