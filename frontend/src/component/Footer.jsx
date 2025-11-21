import { motion } from "framer-motion";
import { Mail, Globe, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const socialIcons = [
  { icon: <Twitter className="w-5 h-5" />, href: "#" },
  { icon: <Linkedin className="w-5 h-5" />, href: "#" },
  { icon: <Instagram className="w-5 h-5" />, href: "#" },
  { icon: <Github className="w-5 h-5" />, href: "#" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#020617] text-gray-300 pt-16 pb-10 px-6 md:px-20">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND & ABOUT */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="text-orange-400 text-3xl">⚡</span>
            <span className="text-2xl font-semibold text-white">EverHack</span>
          </motion.div>

          <p className="mt-4 leading-relaxed text-[15px] opacity-90">
            Empowering the next generation of ethical hackers, developers, and digital leaders.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {socialIcons.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                whileHover={{ scale: 1.15 }}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-md 
                transition border border-white/10"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-[15px]">
            {["Home", "About", "Events", "Team"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 6 }}
                className="cursor-pointer hover:text-white transition"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* COMMUNITY */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
          <ul className="space-y-3 text-[15px]">
            {["WhatsApp Group", "Workshops", "Webinars", "Contact Us"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 6 }}
                className="cursor-pointer hover:text-white transition"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>

          <div className="flex items-center gap-3 mb-4">
            <Mail size={18} className="text-blue-400" />
            <a href="mailto:official@everhack.in" className="hover:text-white transition">
              official@everhack.in
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Globe size={18} className="text-green-400" />
            <a href="https://everhack.in" target="_blank" className="hover:text-white transition">
              www.everhack.in
            </a>
          </div>
        </div>
      </div>

      {/* LINE */}
      <div className="w-full h-px bg-white/10 mt-14"></div>

      {/* COPYRIGHT */}
      <div className="text-center mt-6 text-sm opacity-80">
        © 2025 EverHack. All rights reserved. Built with ❤️ by the community.
      </div>

    </footer>
  );
};

export default Footer;
