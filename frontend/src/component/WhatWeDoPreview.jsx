import React from "react";
import { FaPuzzlePiece, FaBrain } from "react-icons/fa";
import { GiTargetShot } from "react-icons/gi";
import { BsChatDotsFill } from "react-icons/bs";

export default function WhatWeDoPreview() {
  const items = [
    {
      title: "Workshops",
      icon: <FaPuzzlePiece className="text-5xl mx-auto text-[#00FFD1]" />,
      desc: "Hands-on learning sessions covering cybersecurity, coding, and tech innovation."
    },
    {
      title: "Hackathons",
      icon: <GiTargetShot className="text-5xl mx-auto text-[#ff4ecd]" />,
      desc: "Compete, collaborate, and solve real-world problems in exciting hackathon events."
    },
    {
      title: "Community",
      icon: <BsChatDotsFill className="text-5xl mx-auto text-[#a7e3ff]" />,
      desc: "Join a tech-driven community for discussions, insights, and knowledge sharing."
    },
    {
      title: "Skills",
      icon: <FaBrain className="text-5xl mx-auto text-[#ff9ae1]" />,
      desc: "Grow your skills through mentorship, peer learning, and practical challenges."
    }
  ];

  return (
    <div className="pt-[80px] pb-[120px] bg-[#050a19] text-white">
      
      {/* Heading */}
      <h2 className="text-center text-4xl font-bold">
        <span className="text-[#00FFD1]">What</span> We Do
      </h2>
      <p className="text-center text-gray-300 mt-3 max-w-2xl mx-auto">
        Unlock opportunities to learn, compete, and grow in a vibrant tech community.
      </p>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        
        {items.map((item, index) => (
          <div
            key={index}
            className="
              w-[290px] text-center bg-[#0a0f1e] rounded-xl p-6 
              border border-[#00FFD1]/30 shadow-[0_0_10px_#00FFD122]
              transition-all duration-300 cursor-pointer 
              hover:shadow-[0_0_25px_#00FFD188] hover:-translate-y-2 
              hover:border-[#00FFD1]
            "
          >
            {item.icon}
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
