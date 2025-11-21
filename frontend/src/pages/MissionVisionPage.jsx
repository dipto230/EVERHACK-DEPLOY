import React from "react";
import { motion } from "framer-motion";

function MissionVisionPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#050914] text-white px-6">

      {/* Embedded CSS */}
      <style>{`
        .neon-line {
          height: 2px;
          width: 100%;
          background: linear-gradient(to right, transparent, #00FFD1, transparent);
          margin: 30px 0;
          opacity: 0.5;
        }

        .blog-glow {
          position: relative;
        }

        .blog-glow::before {
          content: "";
          position: absolute;
          top: -4px;
          left: 0;
          width: 120px;
          height: 5px;
          background: #00FFD1;
          box-shadow: 0 0 18px #00FFD1;
          border-radius: 20px;
        }
      `}</style>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-[#00FFD1] mb-20"
      >
        Mission & Vision
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-20">

        {/* ===================== BLOG POST 1 ===================== */}
        <BlogPost
          tag="Mission"
          title="🔥 Our Mission"
          content={`Our mission is to empower the next generation of digital creators, ethical
hackers, developers, and future tech leaders.

We create real-world challenges, community-driven learning, and hands-on
innovation spaces that help students grow beyond boundaries.

We aim to ignite curiosity, spark creativity, and build fearless problem-solvers 
ready to shape the future.`}
        />

        {/* ===================== BLOG POST 2 ===================== */}
        <BlogPost
          tag="Vision"
          title="🚀 Our Vision"
          content={`To build one of the world’s most engaging tech communities — where every
curious mind gets access to mentorship, knowledge, and inspiration.

We want innovation to be accessible to everyone, turning ideas into reality
through collaboration, creativity, and technology.`}
        />

        {/* ===================== BLOG POST 3 ===================== */}
        <BlogPost
          tag="Core Values"
          title="💎 Core Values"
          content={`• Innovation First — always push boundaries.  
• Integrity & Ethics — especially in hacking.  
• Collaboration over Competition.  
• A lifelong learning mindset.  
• Empowering people through knowledge.`}
        />

        {/* ===================== BLOG POST 4 ===================== */}
        <BlogPost
          tag="Purpose"
          title="⚡ What Drives Us"
          content={`We believe anyone can become a creator, hacker, or leader when given the
right guidance, community, and tools.

Our purpose is to build that environment — a home for thinkers, builders,
doers, and innovators shaping tomorrow.`}
        />

      </div>
    </div>
  );
}

/* ====================== BLOG POST COMPONENT ====================== */

const BlogPost = ({ tag, title, content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="blog-glow"
    >
      <span className="text-[#00FFD1] uppercase tracking-widest text-sm opacity-80">
        {tag}
      </span>

      <h2 className="text-3xl md:text-4xl text-[#00FFD1] font-bold mt-3 mb-5">
        {title}
      </h2>

      <p className="text-lg leading-8 text-gray-300 whitespace-pre-line">
        {content}
      </p>

      {/* Neon blog separator */}
      <div className="neon-line"></div>
    </motion.div>
  );
};

export default MissionVisionPage;
