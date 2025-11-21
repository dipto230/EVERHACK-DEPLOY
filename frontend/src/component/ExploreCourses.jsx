import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaShieldAlt, FaRobot, FaNetworkWired } from "react-icons/fa";

function ExploreCourses() {
  const courses = [
    {
      title: "Web Development",
      icon: <FaCode className="text-cyan-400 text-4xl" />,
      desc: "Master front-end and back-end technologies to build stunning web experiences.",
    },
    {
      title: "Ethical Hacking",
      icon: <FaShieldAlt className="text-emerald-400 text-4xl" />,
      desc: "Learn the art of ethical hacking, penetration testing, and system defense.",
    },
    {
      title: "AI & Machine Learning",
      icon: <FaRobot className="text-cyan-400 text-4xl" />,
      desc: "Explore AI algorithms, deep learning, and automation for the future.",
    },
    {
      title: "Cybersecurity Fundamentals",
      icon: <FaNetworkWired className="text-emerald-400 text-4xl" />,
      desc: "Understand the principles of network security and modern cyber defense.",
    },
  ];

  // Container for staggered entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  // Each card’s entrance + hover animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -8,
      scale: 1.05,
      rotateY: 2,
      boxShadow: "0 0 30px rgba(0,255,255,0.25)",
      transition: { type: "spring", stiffness: 300, damping: 12 },
    },
  };

  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-[#020617] via-[#010b1f] to-[#01040e] text-white overflow-hidden">

      {/* Floating glowing orbs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-emerald-400/10 blur-3xl rounded-full animate-pulse" />

      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#01040e]/80 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 px-6">

        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-5 lg:w-[40%]"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-white">Explore</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Our Courses
            </span>
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-md">
            Dive into the future of cybersecurity, AI, and coding with advanced,
            hands-on learning experiences built for creators and innovators.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold hover:scale-105 hover:shadow-[0_0_25px_#00ffff] transition-all">
              Browse Now
            </button>
            <button className="px-8 py-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right: Animated Course Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 grid sm:grid-cols-2 gap-6 justify-center"
        >
          {courses.map((course, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group relative p-6 rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-md shadow-lg shadow-cyan-500/5 transition-all duration-300"
            >
              {/* Neon shimmer overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-cyan-400/10 via-transparent to-emerald-400/10 blur-xl transition-all" />

              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 border border-cyan-400/20">
                  {course.icon}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-all">
                  {course.title}
                </h3>
              </div>
              <p className="text-sm text-gray-400">{course.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default ExploreCourses;
