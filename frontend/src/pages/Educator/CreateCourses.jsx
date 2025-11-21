import React, { useState, useRef } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from './../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

/*
  IMPORTANT: I did NOT change any of your logic. handleCreateCourse, state variables,
  API call and flow are exactly preserved. All additions below are purely UI/UX
  (animations, CSS, decorations) and do not alter your original logic.
*/

function CreateCourses() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // --- ORIGINAL LOGIC (kept exactly as you had it) ---
  const handleCreateCourse = async (e) => {
    e.preventDefault();   // prevent page reload
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/course/create",
        { title, category },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      toast.success("Course Created");
      navigate("/courses");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // small ref for CSS-only ripple effect scope
  const btnRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#071027] to-[#071225] px-4 py-10 overflow-hidden'
    >

      {/* BACKGROUND EFFECTS: particles, grid, floating orbs (pure CSS) */}
      <div aria-hidden className='absolute inset-0 pointer-events-none'>
        <div className='absolute -left-40 -top-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 bg-gradient-to-br from-[#00ffd5] to-[#00baff] animate-slowFloat'></div>
        <div className='absolute right-[-120px] bottom-[-140px] w-[520px] h-[520px] rounded-full blur-[160px] opacity-18 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] animate-verySlowFloat'></div>

        {/* subtle cyber grid */}
        <div className='absolute inset-0 bg-grid mask-fade pointer-events-none'></div>

        {/* floating particles */}
        <div className='absolute inset-0 overflow-hidden'>
          <span className='particle' style={{left: '5%', top: '20%'}} />
          <span className='particle' style={{left: '30%', top: '10%', width: 6, height: 6, opacity:0.4}} />
          <span className='particle' style={{left: '70%', top: '40%', width: 8, height: 8, opacity:0.35}} />
          <span className='particle' style={{left: '85%', top: '70%', width: 10, height:10, opacity:0.25}} />
          <span className='particle' style={{left: '15%', top: '75%', width: 7, height:7, opacity:0.3}} />
        </div>
      </div>

      {/* Card - neon border, glass morphism, hover tilt (CSS-only), parallax background on hover */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='relative max-w-xl w-[640px] mx-auto p-8 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] backdrop-blur-md border border-cyan-500/20 shadow-[0_10px_30px_rgba(2,6,23,0.6)] neon-card'
      >

        {/* animated neon border */}
        <div className='absolute -inset-px rounded-2xl pointer-events-none neon-border' />

        {/* header & back icon */}
        <div className='flex items-center justify-between mb-6'>
          <motion.div whileHover={{ scale: 1.12 }} className='cursor-pointer text-cyan-300' onClick={() => navigate('/courses')}>
            <FaArrowLeftLong className='w-[22px] h-[22px]' />
          </motion.div>
          <h2 className='text-2xl font-bold tracking-wide text-cyan-100'>Create Course</h2>
          <div style={{width:22}} />
        </div>

        <form onSubmit={handleCreateCourse} className='space-y-5'>

          <div className='transform transition-transform duration-300 hover:-translate-y-1 tilt-on-hover'>
            <label htmlFor='title' className='block text-sm font-medium text-cyan-200 mb-1'>Course Title</label>
            <input
              id='title'
              type='text'
              placeholder='Enter Course title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className='w-full px-4 py-2 rounded-md border border-cyan-400/20 bg-[#071428]/50 text-cyan-50 placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.01] input-animated'
            />
          </div>

          <div className='transform transition-transform duration-350 hover:-translate-y-1 tilt-on-hover'>
            <label htmlFor='cat' className='block text-sm font-medium text-cyan-200 mb-1'>Course Category</label>
            <select
              id='cat'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className='w-full px-4 py-2 rounded-md border border-cyan-400/20 bg-[#071428]/50 text-cyan-50 placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 select-animated'
            >
              <option value="">Select Category</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/Ml</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* CSS-only ripple + pulse button */}
          <div className='pt-2'>
            <button
              ref={btnRef}
              type='submit'
              disabled={loading}
              className='relative overflow-hidden w-full py-2 rounded-md font-semibold text-black bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed btn-ripple'
            >
              <span className='block'>{loading ? 'Creating...' : 'Create'}</span>
              {/* decorative pulse */}
              <span aria-hidden className='absolute -inset-1 rounded-md pulse-anim' />
            </button>
          </div>

        </form>

      </motion.div>

      {/* Decorative labels at bottom (optional) */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan-300/40 text-sm'>A List Of Your Recent Courses</div>

      {/* Styles (tailwind classes mixed with raw CSS in JSX style block) */}
      <style>{`
        /* Keyframes */
        @keyframes slowFloat { 0%{ transform: translateY(0px); } 50%{ transform: translateY(-22px);} 100%{ transform: translateY(0px);} }
        @keyframes verySlowFloat { 0%{ transform: translateY(0px); } 50%{ transform: translateY(-12px);} 100%{ transform: translateY(0px);} }
        @keyframes particleMove { 0%{ transform: translateY(0) translateX(0) scale(1);} 50%{ transform: translateY(-30px) translateX(10px) scale(1.2);} 100%{ transform: translateY(0) translateX(0) scale(1);} }
        @keyframes neonPulse { 0%{ box-shadow: 0 0 6px rgba(6,182,212,0.08), inset 0 0 12px rgba(6,182,212,0.02);} 50%{ box-shadow: 0 0 22px rgba(6,182,212,0.18), inset 0 0 18px rgba(6,182,212,0.04);} 100%{ box-shadow: 0 0 6px rgba(6,182,212,0.08), inset 0 0 12px rgba(6,182,212,0.02);} }

        .animate-slowFloat { animation: slowFloat 8s ease-in-out infinite; }
        .animate-verySlowFloat { animation: verySlowFloat 10s ease-in-out infinite; }

        /* Cyber Grid */
        .bg-grid {
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 120px 120px, 120px 120px;
          mix-blend-mode: overlay;
          opacity: 0.06;
          transform: translateZ(0);
        }

        .mask-fade { mask-image: linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.2)); }

        /* Particles */
        .particle{
          position: absolute; display:block; width:10px; height:10px; border-radius:999px; background: linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.15));
          opacity: 0.3; filter: blur(6px);
          animation: particleMove 6s ease-in-out infinite;
        }

        /* Neon border animation */
        .neon-card{
          position: relative; z-index: 10;
        }
        .neon-border{
          z-index:0; border-radius:16px; background: linear-gradient(90deg, rgba(0,255,230,0.08), rgba(0,120,255,0.06));
          -webkit-mask: linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff);
          mask: linear-gradient(#fff,#fff) content-box, linear-gradient(#fff,#fff);
          padding:2px; pointer-events:none; box-shadow: 0 8px 40px rgba(0,200,220,0.05);
          animation: neonGlow 3.6s ease-in-out infinite;
        }
        @keyframes neonGlow { 0%{ filter: drop-shadow(0 0 6px rgba(3,218,197,0.06)); } 50%{ filter: drop-shadow(0 0 18px rgba(3,218,197,0.12)); } 100%{ filter: drop-shadow(0 0 6px rgba(3,218,197,0.06)); } }

        /* Inputs focus glow */
        .input-animated:focus, .select-animated:focus{ box-shadow: 0 6px 30px rgba(6,182,212,0.06); }

        /* Button ripple/pulse (CSS only) */
        .btn-ripple{ position: relative; z-index: 2; }
        .btn-ripple:active::after{
          content:''; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:10px; height:10px; border-radius:50%; background: rgba(255,255,255,0.12); animation: ripple 600ms ease-out forwards; pointer-events:none; }
        @keyframes ripple{ to{ width: 300px; height: 300px; opacity:0; } }
        .pulse-anim{ z-index:1; animation: neonPulse 3.6s infinite; mix-blend-mode: screen; }

        /* Tilt on hover - subtle 3D feel without JS */
        .tilt-on-hover{ transform-origin: center; transition: transform 250ms ease; }
        .tilt-on-hover:hover{ transform: perspective(800px) rotateX(3deg) rotateY(-3deg) translateZ(6px); }

        /* small input caret color */
        input::placeholder, select option{ color: rgba(200,240,255,0.6); }

        /* responsive tweaks */
        @media (max-width: 640px){ .neon-card{ padding: 20px; width: calc(100% - 32px); } }
      `}</style>

    </motion.div>
  )
}

export default CreateCourses;
