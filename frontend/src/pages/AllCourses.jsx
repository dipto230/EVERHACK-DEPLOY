import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ai from "../assets/SearchAi - Copy.png";
import { useSelector } from "react-redux";
import Card from "../component/Card";
import { motion } from "framer-motion";

export default function AllCourses() {
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);

  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let copy = courseData?.slice();
    if (category.length > 0) {
      copy = copy.filter((c) => category.includes(c.category));
    }
    setFilterCourses(copy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030615] text-white flex">

      {/* ⭐ Show Button when Sidebar is Hidden */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-[130px] left-4 z-30 bg-cyan-500/30 border border-cyan-300 text-cyan-200 px-4 py-2 rounded-lg shadow-lg backdrop-blur-xl hover:bg-cyan-500/40 transition"
        >
          Show Filters
        </button>
      )}

      {/* Background Effects */}
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

      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/JulianCataldo/particles-bg/main/example/public/particles.png')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          filter: "blur(0.7px)",
        }}
      />

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

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15" />

      {/* SIDEBAR */}
      <motion.aside
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="w-[260px] h-screen overflow-y-auto bg-black/60 backdrop-blur-xl fixed top-[75px] left-0 p-6 border-r border-cyan-400/20 shadow-[0_0_40px_rgba(0,255,255,0.3)] z-20 flex flex-col justify-between"
      >
        
        <div>
          <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-cyan-300 drop-shadow-[0_0_8px_cyan] mb-6">
            <FaArrowLeftLong
              className="text-white cursor-pointer hover:text-cyan-300 transition"
              onClick={() => navigate("/")}
            />
            Filter By Category
          </h2>

          <form className="space-y-4 text-sm bg-white/10 backdrop-blur-xl border border-cyan-400/20 p-[20px] rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.2)]">
            <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.8)] transition">
              Search With AI <img src={ai} className="w-[30px] h-[30px] rounded-full" />
            </button>

            {[
              "App Development",
              "Web Development",
              "UI/UX DESIGN",
              "AI/ML",
              "Data Science",
              "Data Analytics",
              "Ethical Hacking",
              "AI Tools",
              "Others",
            ].map((cat, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer hover:text-cyan-300 transition">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  className="accent-cyan-400 w-4 h-4 rounded-md"
                />
                {cat}
              </label>
            ))}
          </form>
        </div>

        {/* ⭐ Button at Bottom of Sidebar */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="w-full mt-6 bg-cyan-500/30 border border-cyan-300 text-cyan-200 px-4 py-3 rounded-lg shadow-lg hover:bg-cyan-500/40 transition"
        >
          Hide Filters
        </button>

      </motion.aside>

      {/* MAIN CONTENT */}
      <main className='w-full py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px] relative z-10'>
        <h1 className="text-5xl font-extrabold w-full text-center text-cyan-300 drop-shadow-[0_0_15px_cyan] mb-10">
          All Courses
        </h1>

        {filterCourses?.map((course, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #00ffff, 0 0 50px #00ffff" }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-cyan-400/20 p-2 backdrop-blur-xl shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]"
          >
            <Card
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
            />
          </motion.div>
        ))}
      </main>
    </div>
  );
}
