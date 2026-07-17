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
      className="w-full bg-white text-gray-800 py-16 rounded-3xl border border-gray-100 font-sans antialiased shadow-sm"
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div data-aos="fade-right" className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">
            Get in Touch
          </h2>

          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Have questions about our products or need support?
            Fill out the form and our team will respond as soon as possible.
          </p>

            <ul className="space-y-3 text-xs font-semibold text-gray-600">
                      <a href="https://web.facebook.com/profile.php?id=61581245577311" className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-150">
                        <MdFacebook className="text-base text-gray-400" /> Jan Sports
                      </a>
                      <a href="http://wa.me/+923159878075" className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-150">
                        <MdWhatsapp className="text-base text-gray-400" /> +92 315 9878075
                      </a>
                      <li className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-150">
                        <MdEmail className="text-base text-gray-400" /> jansports@email.com
                      </li>
                    </ul>
        </div>

        {/*MSg Form */}
        <form data-aos="fade-left" onSubmit={sendMsg} ref={refForm} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-400">

          
          <div className="grid grid-cols-1 gap-1">
            <LaBel lblFor={'name'} lblName={'Full Name'}/>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required={'required'}
              value={name} onChange={(a)=> saveName(a.target.value)}
              className="rounded-xl px-3 py-2.5 text-gray-700 text-sm font-medium border border-transparent bg-gray-50 focus:outline-none focus:border-purple-300 focus:bg-white transition-all"
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <LaBel lblFor={'email'} lblName={'Email'}/>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email@gmail.com"
              required={'required'}
              className="rounded-xl px-3 py-2.5 text-gray-700 text-sm font-medium border border-transparent bg-gray-50 focus:outline-none focus:border-purple-300 focus:bg-white transition-all"
              value={email} onChange={(a)=> saveEmail(a.target.value)}
            />
          </div>

          {/* Message */}
          <div className="grid grid-cols-1 gap-1">
            <LaBel lblFor={'msg'} lblName={'Message'}/>
            <textarea id={'message'} name="message" placeholder={'Write your message.'} 
            value={msg} onChange={(a)=> saveMsg(a.target.value)}
        className="rounded-xl border border-transparent text-gray-700 p-3.5 bg-gray-50 focus:outline-none focus:border-purple-300 focus:bg-white font-medium text-sm transition-all resize-none h-28"
        ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700 cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;