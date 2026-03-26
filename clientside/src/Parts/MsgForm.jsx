import {useRef, useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts";
import { MdFacebook, MdWhatsapp, MdEmail } from "react-icons/md";
import {init, sendForm} from '@emailjs/browser';
// import {dotenv} from 'dotenv';
// dotenv.config();

function ContactForm() {
    const [name, saveName] = useState('')
    const [email, saveEmail] = useState('')
    const [msg, saveMsg] = useState('')
    const [statusMsg, setStatusMsg] = useState('')

    init(`${import.meta.env.VITE_key_PUBLICJS}`)

    const refForm = useRef()

    const sendMsg = (a)=>{
      a.preventDefault();
      setStatusMsg("Message Sending...");
      // try {
          sendForm(
            import.meta.env.VITE_JSEml_ID_Srvc,
            import.meta.env.VITE_JSTmplt_ID,
            refForm.current
          ).then(()=>{
            setStatusMsg("Message has been sent");
            alert(statusMsg);
            refForm.current.reset();
          }).catch((err)=>{
            setStatusMsg("Failed to sent message!");
            alert(statusMsg);
            console.log("Err:", err);
            
          })
    }

  return (
    <section
      id="contact"
      className="w-full bg-[#2c3639] text-[#f2d39a] py-16 rounded-2xl"
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div data-aos="fade-right" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#FFE2AF]">
            Get in Touch
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            Have questions about our products or need support?
            Fill out the form and our team will respond as soon as possible.
          </p>

            <ul className="space-y-3 text-lg ">
                      <a href="https://web.facebook.com/profile.php?id=61581245577311" className="flex items-center gap-3 hover:text-white transition">
                        <MdFacebook /> Jan Sports
                      </a>
                      <a href="http://wa.me/+923159878075" className="flex items-center gap-3 hover:text-white transition">
                        <MdWhatsapp /> +92 315 9878075
                      </a>
                      <li className="flex items-center gap-3 hover:text-white transition">
                        <MdEmail /> jansports@email.com
                      </li>
                    </ul>
        </div>

        {/*MSg Form */}
        <form data-aos="fade-left" onSubmit={sendMsg} ref={refForm} className="bg-[#3a464a] p-8 rounded-xl shadow-lg space-y-5">

          
          <div className="grid grid-cols-1">
            <LaBel lblFor={'name'} lblName={'Full Name'}/>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required={'required'}
              value={name} onChange={(a)=> saveName(a.target.value)}
              className="rounded-sm px-2  text-[#2c3639] font-semibold border border-gray-500 outline-0 bg-[#ffe2af] focus:bg-[#F2D39A]"
            />
          </div>
          <div className="grid grid-cols-1">
            <LaBel lblFor={'email'} lblName={'Email'}/>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email@gmail.com"
              required={'required'}
              className="rounded-sm px-2  text-[#2c3639] font-semibold border border-gray-500 outline-0 bg-[#ffe2af] focus:bg-[#F2D39A]"
              value={email} onChange={(a)=> saveEmail(a.target.value)}
            />
          </div>

          {/* Message */}
          <div className="grid grid-cols-1">
            <LaBel lblFor={'msg'} lblName={'Message'}/>
            <textarea id={'message'} name="message" placeholder={'Wirte your messge.'} 
            value={msg} onChange={(a)=> saveMsg(a.target.value)}
        className="rounded-2xl border border-gray-500 outline-0 text-[#2c3639] p-4 bg-[#ffe2af] focus:bg-[#F2D39A] "
        ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
