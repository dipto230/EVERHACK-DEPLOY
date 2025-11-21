import React from "react";
import { motion } from "framer-motion";

function MissionVisionPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#050914] text-white px-6">

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-[#00FFD1] mb-14"
      >
        Mission & Vision
      </motion.h1>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* =========== MISSION =========== */}
        <Card
          title="🔥 Our Mission"
          description={`Our mission is to empower the next generation of digital creators, 
ethical hackers, developers, and future tech leaders.

We provide community-driven learning, real-world challenges, and hands-on 
innovation platforms that help students grow beyond boundaries.

Our goal is to ignite curiosity, spark creativity, and build unstoppable 
problem-solvers ready for the future.`}
        />

        {/* =========== VISION =========== */}
        <Card
          title="🚀 Our Vision"
          description={`To build one of the world's most engaging and impactful tech 
communities — where every curious mind finds mentorship, knowledge, 
purpose, and inspiration.

We aim to make innovation accessible to all, turning ideas into reality 
using collaboration, technology, and creativity.`}
        />

        {/* =========== CORE VALUES =========== */}
        <Card
          title="💎 Core Values"
          description={`• Innovation First — we push boundaries.  
• Integrity & Ethics — especially in hacking.  
• Collaboration over Competition.  
• Lifelong Learning Mindset.  
• Empowerment through Knowledge.`}
        />

        {/* =========== WHAT DRIVES US =========== */}
        <Card
          title="⚡ What Drives Us"
          description={`A powerful belief that anyone can become a creator, hacker, builder 
or leader when given the right tools, guidance, and community.

We exist to create that space — a hub of thinkers, doers, builders, 
and innovators working together to shape the future.`}
        />

      </div>
    </div>
  );
}

/* ====================== Reusable Card Component ====================== */

const Card = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-[#0a0f1e] border border-[#00FFD1]/40 
      rounded-2xl p-8 shadow-lg hover:shadow-[0_0_25px_#00FFD1] transition-shadow 
      h-[380px] flex flex-col"
    >
      {/* Radar Glow Animation */}
      <div className="absolute inset-0">
        <div className="radar-animation w-full h-full opacity-30"></div>
      </div>

      {/* Content */}
      <h2 className="text-3xl text-[#00FFD1] font-semibold mb-4 relative z-10">
        {title}
      </h2>

      <p className="text-gray-300 leading-7 text-lg whitespace-pre-line relative z-10 overflow-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default MissionVisionPage;
