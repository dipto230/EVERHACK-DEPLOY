import React from "react";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";

function Card({ thumbnail, title, category, price, id }) {
  return (
    <motion.div
      // ⭐ Left-to-right glow animation
      initial={{ x: -10, boxShadow: "0 0 10px rgba(0,255,255,0.2)" }}
      animate={{
        x: [-10, 10, -10],
        boxShadow: [
          "0 0 10px rgba(0,255,255,0.2)",
          "0 0 25px rgba(0,255,255,0.5)",
          "0 0 10px rgba(0,255,255,0.2)"
        ],
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 0 25px rgba(0, 255, 255, 0.4)",
      }}
      transition={{
        // main floating animation
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",

        // hover transition
        scale: { duration: 0.3 },
        boxShadow: { duration: 0.3 },
      }}
      className="
        max-w-sm w-full 
        bg-[#0a0f1f]/60 
        backdrop-blur-xl
        rounded-2xl 
        overflow-hidden 
        border border-cyan-500/20 
        hover:border-cyan-400/40 
        transition-all duration-300 
        relative
      "
    >
      {/* Top Glow Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 pointer-events-none" />

      <img
        src={thumbnail}
        alt=""
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      <div className="p-5 space-y-3 relative z-10">
        <h2 className="text-lg font-semibold text-white tracking-wide">
          {title}
        </h2>

        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs uppercase tracking-wide">
          {category}
        </span>

        <div className="flex justify-between text-sm text-gray-300 mt-4">
          <span className="font-semibold text-cyan-300 text-base">
            {price}
          </span>

          <span className="flex items-center gap-1 text-yellow-400">
            <FaStar className="text-yellow-400" /> 5
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
