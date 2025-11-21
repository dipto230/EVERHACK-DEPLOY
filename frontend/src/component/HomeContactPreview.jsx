import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { databases, DATABASE_ID, COLLECTION_ID } from "../appwrite";
import Nav from "../component/Nav";

// SMALL QUESTION CARD
const QuestionCard = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 bg-[#0d1a33]/60 border border-cyan-400/10 
                 rounded-xl shadow-md w-full"
    >
      <p className="text-gray-300 text-sm flex items-center gap-2">
        <span className="text-cyan-400 text-lg">•</span> {text}
      </p>
    </motion.div>
  );
};

// UPDATED — CLEAN, PREMIUM CONTACT PREVIEW CARD WITH QUESTION CARDS
const HomeContactPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-10 bg-[#0b1224]/70 backdrop-blur-xl 
                 rounded-2xl border border-cyan-400/20 
                 shadow-[0_0_25px_rgba(0,255,255,0.05)] text-center"
    >
      <h2 className="text-3xl font-bold text-white mb-2">
        Have <span className="text-cyan-400">Questions?</span>
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        We're here to help. Reach out anytime.
      </p>

      {/* QUESTION CARDS */}
      <div className="space-y-3 mb-6">
        <QuestionCard text="How can I join?" />
        <QuestionCard text="Are events free to attend?" />
        <QuestionCard text="Can I collaborate or volunteer?" />
      </div>

      <Link to="/contact">
        <button
          className="px-6 py-2.5 rounded-xl text-black text-sm font-semibold 
                     bg-gradient-to-r from-cyan-400 to-emerald-400
                     shadow-[0_0_12px_rgba(0,255,255,0.3)]
                     hover:scale-105 transition-all"
        >
          Contact Us
        </button>
      </Link>
    </motion.div>
  );
};

// FAQ CARD (unchanged)
const FAQCard = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => setOpen(!open)}
      className="cursor-pointer p-6 bg-[#0b1224]/80 border border-gray-700 rounded-2xl shadow-xl"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cyan-400">{question}</h3>
        <span className="text-gray-400 text-2xl">{open ? "−" : "+"}</span>
      </div>
      {open && <p className="text-gray-300 mt-3">{answer}</p>}
    </motion.div>
  );
};

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, "unique()", form);
      alert("Message sent successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020617] text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(0,255,255,0.15), transparent 60%), url('/grid.svg')",
          backgroundSize: "cover",
        }}
      />

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full"></div>

      <div className="absolute top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* HEADER */}
      <div className="pt-40 pb-10 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-cyan-400 mb-3 tracking-wide"
        >
          Let’s Connect
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold mb-4"
        >
          Get In <span className="text-cyan-400">Touch</span>
        </motion.h1>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          We'd love to hear from you.
        </p>
      </div>

      {/* FORM + CONTACT PREVIEW SIDE BY SIDE */}
      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        
        {/* LEFT - FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="p-10 bg-[#0b1224]/90 border border-gray-700 rounded-3xl shadow-xl backdrop-blur-2xl"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <input
              type="text"
              name="fullName"
              required
              placeholder="Full Name *"
              className="p-4 rounded-xl bg-[#0d1a33] border border-gray-700 text-white"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email *"
              className="p-4 rounded-xl bg-[#0d1a33] border border-gray-700 text-white"
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="p-4 rounded-xl bg-[#0d1a33] border border-gray-700 text-white"
              onChange={handleChange}
            />
            <select
              name="subject"
              required
              className="p-4 rounded-xl bg-[#0d1a33] border border-gray-700 text-white"
              onChange={handleChange}
            >
              <option value="">Select a subject *</option>
              <option>General Inquiry</option>
              <option>Collaboration</option>
              <option>Event Query</option>
              <option>Technical Support</option>
            </select>

            <textarea
              name="message"
              required
              placeholder="Message *"
              className="p-4 h-40 rounded-xl bg-[#0d1a33] border border-gray-700 text-white"
              onChange={handleChange}
            ></textarea>

            <button
              disabled={loading}
              className="py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold hover:scale-105 transition-all"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* RIGHT — NOW SHOWS QUESTION CARDS */}
        <HomeContactPreview />
      </div>

      <div className="h-32"></div>
    </div>
  );
};

export default ContactPage;
