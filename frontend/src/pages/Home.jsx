import React from 'react'
import { motion } from 'framer-motion'
import Nav from '../component/Nav'
import ExploreCourses from '../component/ExploreCourses'
import CardPage from '../component/CardPage'
import RecentEvents from '../component/RecentEvents'
import WhatWeDoPreview from '../component/WhatWeDoPreview'
import HomeMissionVision from '../component/HomeMissionVision'
import HomeContactPreview from '../component/HomeContactPreview'
import JoinEverHack from '../component/JoinEverHack'
import Footer from '../component/Footer'

const Home = () => {
  return (
    <div className="w-full overflow-hidden bg-[#020617] relative text-white">

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero Section */}
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center relative">
        
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-transparent blur-[120px] animate-pulse" />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold mb-6"
        >
          <span className="text-white">Welcome to </span>
          <motion.span
            animate={{
              textShadow: [
                "0 0 10px #00ffff",
                "0 0 20px #00ffcc",
                "0 0 10px #00ffff"
              ]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]"
          >
            EverHack
          </motion.span>
        </motion.h1>

        {/* Glowing paragraph on hover */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          whileHover={{
            textShadow: [
              "0 0 10px #00ffff",
              "0 0 20px #00ffcc",
              "0 0 30px #00ffff"
            ],
            color: "#e0ffff",
            transition: { duration: 0.4 }
          }}
          className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed mb-10 cursor-pointer"
        >
          A next-generation tech and cybersecurity community built for learners,
          innovators, and creators who believe in pushing the boundaries of technology.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex gap-6"
        >
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold hover:scale-105 hover:shadow-[0_0_20px_#00ffff] transition-all">
            Join the Community
          </button>
          <button className="px-8 py-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_#00ffff] transition-all">
            Learn More
          </button>
        </motion.div>

        {/* Floating Glows */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
      </div>
      <ExploreCourses />
      <CardPage />
      <RecentEvents />
      <WhatWeDoPreview />
      <HomeMissionVision />
      <HomeContactPreview />
      <JoinEverHack />
      <Footer/>
    </div>
  )
}

export default Home
