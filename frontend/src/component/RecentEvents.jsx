import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";

const events = [
  {
    id: 1,
    type: "WORKSHOP",
    title: "Advanced Python for Cybersecurity",
    status: "Upcoming",
    desc: "Master Python scripting for security automation, exploit development, and network analysis.",
    date: "15 Nov 2025",
    duration: "2 hours",
    mentor: "TBA",
  },
  {
    id: 2,
    type: "WEBINAR",
    title: "Bug Bounty Hunting: From Zero to Hero",
    status: "Upcoming",
    desc: "Learn bug bounty hunting from experienced hunters. Discover vulnerabilities, write effective reports.",
    date: "22 Nov 2025",
    duration: "90 minutes",
    mentor: "TBA",
  },
  {
    id: 3,
    type: "WEBINAR",
    title: "Introduction to Ethical Hacking",
    status: "Upcoming",
    desc: "Perfect for beginners! Learn the fundamentals of ethical hacking and start your journey.",
    date: "30 Nov 2025",
    duration: "60 minutes",
    mentor: "TBA",
  },
];

function RecentEvents() {
  return (
    <section className="w-full py-20 bg-[#01030b] text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title with Glow Effect */}
        <h2 className="text-4xl font-bold text-center text-cyan-400 drop-shadow-[0_0_15px_#00fff2] relative">
          Recent Events
          {/* Glowing underline */}
          <span className="absolute left-1/2 -bottom-2 w-32 h-[3px] bg-cyan-400 rounded-full 
            -translate-x-1/2 shadow-[0_0_12px_#00fff2] animate-pulse" />
        </h2>

        <p className="text-center text-gray-300 mt-4">
          Check out our latest workshops and webinars
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative bg-[#0c1122] rounded-2xl border border-gray-700 transition-all duration-300 
              shadow-lg overflow-hidden group hover:shadow-[0_0_25px_#00f2ff80] hover:border-cyan-400 hover:-translate-y-2"
            >
              {/* Animated Glow Border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 
                bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 pointer-events-none"></div>

              {/* Top gradient section with motion glow */}
              <div className="h-40 bg-gradient-to-br from-cyan-600/30 via-blue-600/20 to-purple-700/20 
                rounded-t-2xl group-hover:shadow-[0_0_40px_#00eaff40] transition-all duration-500" />

              <div className="p-6 relative z-10">
                
                {/* Badges */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-4 py-1 rounded-full text-sm font-semibold bg-cyan-500/20 text-cyan-400">
                    {event.type}
                  </span>
                  <span className="px-4 py-1 rounded-full text-sm font-semibold bg-orange-500/20 text-orange-300">
                    {event.status}
                  </span>
                </div>

                {/* Title with glow */}
                <h3 className="text-xl font-bold text-cyan-300 drop-shadow-[0_0_8px_#00f7ff] group-hover:text-cyan-400 transition">
                  {event.title}
                </h3>

                <p className="text-gray-400 mt-3">{event.desc}</p>

                {/* Divider */}
                <div className="w-full h-px bg-gray-700 my-4"></div>

                {/* Event Details */}
                <div className="flex flex-col gap-3 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-cyan-300" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock className="text-cyan-300" />
                    <span>{event.duration}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaUser className="text-cyan-300" />
                    <span>{event.mentor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/events"
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition shadow-[0_0_15px_#00eaff80]"
          >
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecentEvents;
