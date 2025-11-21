import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

const JoinEverHack = () => {
  return (
    <section className="w-full py-24 bg-[#0A0F1F] flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          max-w-4xl w-full bg-[#111827]/50 backdrop-blur-xl border border-white/10 
          rounded-3xl p-12 shadow-[0px_0px_50px_rgba(0,255,255,0.1)]
          text-center
        "
      >
        {/* Top Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-1 text-sm text-cyan-400 border border-cyan-400/40 rounded-full">
            🚀 Join the Movement
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Ready to Join <span className="text-cyan-400">EverHack?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed mb-10"
        >
          Become part of a growing force of tech lovers, hackers, and innovators.
          Start building your journey with us — the future begins now.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="https://chat.whatsapp.com/FHnCLBhVYaV8JKj8JPuuys"
            target="_blank"
            className="
              px-10 py-4 rounded-full bg-cyan-400 text-black font-semibold 
              text-lg flex items-center justify-center gap-3 mx-auto w-fit
              shadow-[0_0_25px_rgba(0,255,255,0.4)]
              hover:bg-cyan-300 transition-all duration-300
              hover:shadow-[0_0_45px_rgba(0,255,255,0.6)]
            "
          >
            Join WhatsApp Community <MessageCircle size={22} />
          </Link>
        </motion.div>

        {/* Decorative Bottom Glow */}
        <div className="mt-10 mx-auto w-40 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full opacity-40"></div>
      </motion.div>
    </section>
  );
};

export default JoinEverHack;
