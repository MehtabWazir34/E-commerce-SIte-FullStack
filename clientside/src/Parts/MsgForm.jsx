import { useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts";
import { MdFacebook, MdWhatsapp, MdEmail } from "react-icons/md";


function ContactForm() {
    const [name, saveName] = useState('')
    const [email, saveEmail] = useState('')
    const [msg, saveMsg] = useState('')
  return (
    <section
      id="contact"
      className="w-full bg-[#2c3639] text-[#f2d39a] py-16 rounded-2xl"
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#FFE2AF]">
            Get in Touch
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            Have questions about our products or need support?
            Fill out the form and our team will respond as soon as possible.
          </p>

            <ul className="space-y-3 text-lg ">
                      <li className="flex items-center gap-3 hover:text-white transition">
                        <MdFacebook /> Jan Sports
                      </li>
                      <li className="flex items-center gap-3 hover:text-white transition">
                        <MdWhatsapp /> +92 315 9878075
                      </li>
                      <li className="flex items-center gap-3 hover:text-white transition">
                        <MdEmail /> jansports@email.com
                      </li>
                    </ul>
        </div>

        {/*MSg Form */}
        <form className="bg-[#3a464a] p-8 rounded-xl shadow-lg space-y-5">

          
          <div className="grid grid-cols-1">
            <LaBel lblFor={'name'} lblName={'Full Name'}/>
            <InPut
            id="name"
              type="text"
              placeholder="Enter your name"
              required={'required'}
              value={name} onChange={(a)=> saveName(a.target.value)}
            />
          </div>
          <div className="grid grid-cols-1">
            <LaBel lblFor={'email'} lblName={'Email'}/>
            <InPut
            id="email"
              type="text"
              placeholder="Enter your email@gmail.com"
              required={'required'}
              value={email} onChange={(a)=> saveEmail(a.target.value)}
            />
          </div>

          {/* Message */}
          <div className="grid grid-cols-1">
            <LaBel lblFor={'msg'} lblName={'Message'}/>
            <textarea id={'msg'} placeholder={'Wirte your messge.'} value={msg} onChange={(a)=> saveMsg(a.target.value)}
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
