import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import img from "../../assets/empty.jpg"
import { FaEdit } from "react-icons/fa"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../../App'
import { setCreatorCourseData } from '../../redux/courseSlice'

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const{userData} = useSelector(state=>state.user)
  const { creatorCourseData } = useSelector(state => state.course);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreator", { withCredentials: true })
        console.log(result.data)
        dispatch(setCreatorCourseData(result.data))
        
      } catch (error) {
        console.log(error)
        
      }
    }
    creatorCourses()
    
  },[userData])

  return (
    <motion.div 
      className="flex min-h-screen relative overflow-hidden bg-[#020617] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle moving gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(0,255,255,0.1),_transparent_40%),_radial-gradient(circle_at_80%_80%,_rgba(0,100,255,0.1),_transparent_40%)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full min-h-screen p-4 sm:p-6 relative z-10">

        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center sm:justify-between items-start sm:items-center mb-6 gap-4 sm:gap-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaArrowLeftLong 
                className="w-[22px] h-[22px] cursor-pointer text-cyan-400 drop-shadow-[0_0_10px_#00ffff]" 
                onClick={() => navigate("/dashboard")} 
              />
            </motion.div>
            <h1 className="text-3xl font-bold tracking-wide text-cyan-400 drop-shadow-[0_0_15px_#00ffff]">
              All Created Courses
            </h1>
          </div>
          <motion.button 
            className="bg-transparent border border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition duration-300 shadow-[0_0_10px_#00ffff] mt-3 sm:mt-0 sm:ml-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/createcourse")}
          >
            Create Courses
          </motion.button>
        </motion.div>

        {/* Table for large screens */}
        <motion.div 
          className="hidden md:block backdrop-blur-md bg-[#0a1124]/60 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.1)] p-4 overflow-x-auto border border-cyan-500/40"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.table 
            className="min-w-full text-sm"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <thead className="border-b border-cyan-400/50">
              <tr className="bg-gradient-to-r from-cyan-700/30 via-transparent to-cyan-700/30">
                {["Courses", "Price", "Status", "Action"].map((head, i) => (
                  <th 
                    key={i}
                    className="text-left py-3 px-4 text-cyan-300 font-semibold text-glow"
                    style={{
                      textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
                    }}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {creatorCourseData?.length > 0 ? (
                creatorCourseData.map((course, index) => (
                  <motion.tr 
                    key={index}
                    className="border-b border-cyan-900/40 hover:bg-cyan-800/10 transition duration-300 cursor-pointer"
                    whileHover={{ scale: 1.01, boxShadow: "0 0 15px rgba(0,255,255,0.3)" }}
                  >
                    <td className="py-3 px-4 flex items-center gap-4 text-gray-200">
                      <motion.img 
                        src={course.thumbnail || img}
                        alt=""
                        className="w-25 h-14 object-cover rounded-md shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <span className="font-medium text-cyan-200">
                        {course.title}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-gray-400">
                      {course.price || "NA"}
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs bg-cyan-900/50 text-cyan-300 shadow-[0_0_8px_#00ffff]">
                       {course.isPublished ? "Published" : "Draft"}

                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <motion.div 
                        whileHover={{ rotate: 10, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 250 }}
                        onClick={() => navigate(`/editcourse/${course._id}`)}
                      >
                        <FaEdit className="text-cyan-400 hover:text-cyan-300 cursor-pointer drop-shadow-[0_0_8px_#00ffff]"/>
                      </motion.div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-cyan-400 italic">
                    No courses created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </motion.table>

          <motion.p 
            className="text-center text-sm text-cyan-400 mt-6 italic drop-shadow-[0_0_10px_#00ffff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            A List Of Your Recent Courses
          </motion.p>
        </motion.div>

        {/* Small screen cards */}
        <motion.div 
          className="md:hidden space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {creatorCourseData?.length > 0 ? (
            creatorCourseData.map((course, index) => (
              <motion.div 
                key={index}
                className="bg-[#0a1124]/60 backdrop-blur-md rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.1)] p-4 flex flex-col gap-3 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] border border-cyan-500/40"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4 items-center">
                  <motion.img
                    src={course.thumbnail || img}
                    className="w-16 h-16 rounded-md object-cover shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                    alt=""
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="flex-1">
                    <h2 className="font-medium text-sm text-cyan-200">{course.title}</h2>
                    <p className="text-gray-400 text-xs mt-1">
                      {course.price || "NA"}
                    </p>
                  </div>
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    onClick={() => navigate(`/editcourse/${course._id}`)}
                  >
                    <FaEdit className="text-cyan-400 hover:text-cyan-300 cursor-pointer drop-shadow-[0_0_8px_#00ffff]"/>
                  </motion.div>
                </div>

                <span className="w-fit px-3 py-1 text-xs rounded-full bg-cyan-900/50 text-cyan-300 shadow-[0_0_8px_#00ffff]">
                  {course.isPublished ? "Published" : "Draft"}

                </span>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-sm text-cyan-400 mt-4 italic drop-shadow-[0_0_10px_#00ffff]">
              No courses created yet.
            </p>
          )}

          <p className="text-center text-sm text-cyan-400 mt-4 italic drop-shadow-[0_0_10px_#00ffff]">
            A List Of Your Recent Courses
          </p>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default Courses
