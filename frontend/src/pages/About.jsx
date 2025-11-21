import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Users, Star, Terminal, Zap } from "lucide-react";
import Footer from "../component/Footer";

/* --- ANIMATION VARIANTS --- */
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const timelineAnim = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030615] text-white">

      {/* ============================================================
          ADVANCED 3-LAYER CYBER BACKGROUND SYSTEM
      ============================================================ */}

      {/* LAYER 1 — Animated Nebula Gradient */}
      <motion.div
        className="absolute inset-0 opacity-60"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(0,255,255,0.25), transparent 60%), radial-gradient(circle at 80% 70%, rgba(0,100,255,0.25), transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* LAYER 2 — Animated Floating Particles */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/JulianCataldo/particles-bg/main/example/public/particles.png')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          filter: "blur(0.7px)",
        }}
      />

      {/* LAYER 3 — Animated Grid Lines */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "80px 80px", "0px 0px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(transparent 97%, rgba(0,255,255,0.2)), linear-gradient(90deg, transparent 97%, rgba(0,255,255,0.2))",
          backgroundSize: "80px 80px",
        }}
      />

      {/* LAYER 4 — Random Floating Glow Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 200,
            height: 200,
            background: i % 2 === 0 ? "rgba(0,255,255,0.15)" : "rgba(0,100,255,0.15)",
            top: `${20 + i * 12}%`,
            left: `${10 + i * 12}%`,
          }}
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 18 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* GRAIN LAYER */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15" />

      {/* ============================================================
                        MAIN PAGE CONTENT
      ============================================================ */}

      {/* Header Section */}
      <section className="relative flex flex-col items-center justify-center text-center pt-32 px-6 z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-3"
        >
          <Sparkles className="text-cyan-300" size={38} />
          <h1 className="text-6xl font-extrabold tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              EverHack
            </span>
          </h1>
          <p className="max-w-3xl text-lg text-gray-300 mt-3">
            India’s most advanced cybersecurity community — shaping the next generation
            of ethical hackers, researchers & defenders.
          </p>
        </motion.div>
      </section>

      {/* Mission / Vision */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 gap-10 px-6 lg:px-24 py-20 z-10">
        {[
          {
            icon: <Shield size={45} />,
            title: "Our Mission",
            text: "Empowering India with world-class cybersecurity education through practical, accessible, and structured learning experiences.",
          },
          {
            icon: <Zap size={45} />,
            title: "Our Vision",
            text: "To build India's most innovative and collaborative cybersecurity ecosystem.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="relative rounded-2xl p-10 bg-white/10 backdrop-blur-2xl border border-cyan-400/20 shadow-[0_0_50px_rgba(0,255,255,0.18)] hover:shadow-[0_0_70px_rgba(0,255,255,0.6)] transition-all"
          >
            <div className="mb-5 text-cyan-300">{item.icon}</div>
            <h2 className="text-3xl font-bold mb-3">{item.title}</h2>
            <p className="text-gray-300 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* What We Do */}
      <section className="py-24 px-6 lg:px-24 z-10 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-3">What We Do</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Delivering next-gen cyber education through immersive learning channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Terminal size={38} />,
              title: "Workshops & Webinars",
              text: "Hands-on penetration testing, red teaming, malware labs & cyber drills.",
            },
            {
              icon: <Star size={38} />,
              title: "Capture The Flag",
              text: "Weekly CTF challenges designed for skill-building & competition.",
            },
            {
              icon: <Users size={38} />,
              title: "Community Support",
              text: "A thriving 500+ member ecosystem supporting career & skill growth.",
            },
          ].map((box, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="p-10 rounded-2xl bg-white/10 backdrop-blur-2xl border border-blue-400/20 shadow-[0_0_35px_rgba(0,150,255,0.25)] hover:shadow-[0_0_55px_rgba(0,150,255,0.55)] transition-all"
            >
              <div className="text-blue-300 mb-4">{box.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{box.title}</h3>
              <p className="text-gray-300">{box.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24 px-6 lg:px-24 z-10">
        <h2 className="text-5xl font-extrabold text-center mb-3">Our Journey</h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
          From humble beginnings to a nationwide cyber movement.
        </p>

        <div className="relative border-l-2 border-cyan-400/40 ml-6 md:ml-20">
          {[
            {
              title: "Foundation",
              date: "October 2025",
              text: "Started with one mission — to build India’s strongest cybersecurity learning community.",
            },
            {
              title: "First Workshop",
              date: "October 2025",
              text: "Our first web pentesting workshop attracted learners from all over India.",
            },
            {
              title: "Community Growth",
              date: "Present",
              text: "Now a thriving ecosystem with 500+ active members and dozens of successful events.",
            },
            {
              title: "Future Plans",
              date: "Upcoming",
              text: "Advanced red-team training, global partnerships & national cyber initiatives.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              variants={timelineAnim}
              initial="hidden"
              whileInView="show"
              className="relative mb-12 ml-6"
            >
              <div className="absolute -left-4 top-2 h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(0,255,255,1)]" />
              <div className="p-7 rounded-xl bg-white/10 backdrop-blur-2xl border border-cyan-400/20 shadow-[0_0_40px_rgba(0,255,255,0.15)]">
                <h3 className="text-2xl font-bold text-cyan-300">{step.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{step.date}</p>
                <p className="text-gray-300">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 lg:px-24 grid grid-cols-1 md:grid-cols-4 gap-10 text-center z-10 relative">
        {[
          { number: "500+", label: "Community Members" },
          { number: "50+", label: "Workshops Completed" },
          { number: "20+", label: "Events Hosted" },
          { number: "40+", label: "Team Members" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="p-10 rounded-2xl bg-white/10 backdrop-blur-2xl border border-blue-400/20 shadow-[0_0_30px_rgba(0,150,255,0.3)]"
          >
            <h3 className="text-5xl font-extrabold text-cyan-400">{stat.number}</h3>
            <p className="text-gray-300 mt-3 uppercase tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 lg:px-24 relative z-10">
        <h2 className="text-5xl font-extrabold text-center mb-3">Our Core Values</h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
          The principles that define everything we do.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: "🎓", title: "Education First", text: "Accessible cybersecurity education for everyone." },
            { icon: "🤝", title: "Community Driven", text: "Collaboration, peer-learning & real growth." },
            { icon: "⚡", title: "Hands-On Learning", text: "Practical experience at the core of our teaching." },
            { icon: "🛡️", title: "Ethical Standards", text: "Responsible disclosure & ethical hacking." },
            { icon: "🚀", title: "Innovation", text: "Staying ahead of evolving cyber threats." },
            { icon: "🌟", title: "Excellence", text: "Quality & dedication in every initiative." },
          ].map((value, i) => (
            <div
              key={i}
              className="p-10 rounded-2xl bg-white/10 backdrop-blur-2xl border border-blue-400/20 shadow-[0_0_40px_rgba(0,150,255,0.3)] hover:shadow-[0_0_60px_rgba(0,150,255,0.55)] transition-all"
            >
              <div className="text-4xl mb-3">{value.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-cyan-300">{value.title}</h3>
              <p className="text-gray-300">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* Footer Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyan-500/30 to-transparent blur-[100px]" />
      <Footer/>
    </div>
  );
}
