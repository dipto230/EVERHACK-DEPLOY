import React, { useRef, useState, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import img from "../assets/empty.jpg"
import axios from 'axios'
import { serverUrl } from './../App';
import { toast } from 'react-toastify'

function EditCourse() {
  const navigate = useNavigate()
  const { courseId } = useParams()

  const thumb = useRef()

  const [isPublished, setIsPublished] = useState(false)
  const [selectCourse, setSelectCourse] = useState(null)

  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState("")
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const getCourseById = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, { withCredentials: true })
      setSelectCourse(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "")
      setSubTitle(selectCourse.subTitle || "")
      setDescription(selectCourse.description || "")
      setCategory(selectCourse.category || "")
      setLevel(selectCourse.level || "")
      setPrice(selectCourse.price || "")
      setFrontendImage(selectCourse.thumbnail || img)
      setIsPublished(selectCourse?.isPublished)
    }
  }, [selectCourse])

  useEffect(() => {
    getCourseById()
  }, [])

  const handleEditCourse = async () => {
    setLoading(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("subTitle", subTitle)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("level", level)
    formData.append("price", price)
    formData.append("thumbnail", backendImage)
    formData.append("isPublished", isPublished ? "true" : "false")


    try {
      const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`, formData, { withCredentials: true })
      console.log(result.data)
      setLoading(false)
      toast.success("Course Updated")
      navigate("/courses")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response?.data?.message || "Error updating course")
    }
  }

  const handleRemoveCourse = async () => {
    setLoading1(true)
    try {
      const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`, { withCredentials: true })
      console.log(result.data)
      setLoading1(false)
      toast.success("Course Removed")
      navigate("/courses")
    } catch (error) {
      console.log(error)
      setLoading1(false)
      toast.error(error.response.data.message)
    }

  }



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='w-full min-h-screen p-6 mt-0 rounded-lg shadow-md relative overflow-hidden'
    >
      {/* ================================
          FULL-SCREEN ULTRA-ENHANCED BACKGROUND
          (pointer-events-none so UI remains interactive)
          ================================ */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Deep space gradient base */}
        <div className="absolute inset-0 bg-[#020414] bg-gradient-to-br from-[#050a28] via-[#020312] to-black" />

        {/* Parallax glow layer 1 */}
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(0,150,255,0.2), transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,0,200,0.2), transparent 65%)",
          }}
          animate={{
            x: [-40, 40, -20, 0],
            y: [-10, 30, -5, 0],
            opacity: [0.8, 1, 0.7],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Parallax glow layer 2 */}
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(80,0,255,0.12), transparent 55%), radial-gradient(circle at 30% 90%, rgba(0,220,255,0.13), transparent 55%)",
          }}
          animate={{
            x: [40, -40, 20, 0],
            y: [60, -40, 10, 0],
            opacity: [0.5, 0.8, 0.6],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated neon cyber grid (high detail) */}
        <motion.div
          className="absolute inset-0 opacity-[0.33]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "55px 55px"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Holographic distortion layer */}
        <motion.div
          className="absolute inset-0 backdrop-blur-[2px] mix-blend-overlay"
          animate={{
            opacity: [0.08, 0.22, 0.12],
            skewX: ["0deg", "0.8deg", "-0.8deg", "0deg"],
            scale: [1, 1.02, 0.995, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating neon plasma blobs (left/top) */}
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/25 blur-[160px]"
          style={{ top: "-120px", left: "-150px" }}
          animate={{
            x: [0, 90, -60, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating neon plasma blobs (right/bottom) */}
        <motion.div
          className="absolute w-[480px] h-[480px] rounded-full bg-fuchsia-500/25 blur-[180px]"
          style={{ bottom: "-160px", right: "-130px" }}
          animate={{
            x: [0, -110, 70, 0],
            y: [0, 90, -50, 0],
            scale: [1, 1.18, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Light sweep beam */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[260px] bg-gradient-to-b from-purple-500/25 to-transparent"
          animate={{ opacity: [0.08, 0.32, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Ambient fog motion */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.06),transparent_70%)] blur-3xl"
          animate={{ opacity: [0.03, 0.18, 0.08] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Particle field (subtle) */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[3px] h-[3px] bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.12, 0.9, 0.12],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
      {/* ================================
          END FULL-SCREEN BACKGROUND
          ================================ */}

      <div className='relative z-10 text-white'>
        <div className='flex items-center justify-between w-full mb-6 relative'>

          {/* working arrow */}
          <motion.div whileHover={{ scale: 1.2 }} className='cursor-pointer'>
            <FaArrowLeftLong
              className='w-[28px] h-[28px] text-white hover:text-[#4ed0ff] transition'
              onClick={() => navigate(-1)}
            />
          </motion.div>

          {/* upgraded glowing title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className='text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_6px_18px_rgba(80,100,255,0.18)]'
            style={{
              WebkitTextStroke: "0.3px rgba(255,255,255,0.02)",
            }}
          >
            Add Detailed Information Regarding the Course
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.07 }}
            onClick={() => navigate(`/lecture/${courseId}`)}
            className='bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-md border border-white/20 shadow-lg'
          >
            Go to Lecture Page
          </motion.button>
        </div>

        {/* container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='bg-[#ffffff15] backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-2xl'
        >
          <h2 className='text-lg font-bold mb-4 text-[#a9cfff] drop-shadow-sm'>Basic Course Information</h2>

          {/* publish/unpublish buttons */}
          <div className='space-x-2 space-y-2 mb-4'>
            {isPublished ? (
              <button
                className='bg-green-200/20 text-green-400 px-4 py-2 rounded-md border border-green-400/40 shadow'
                onClick={() => setIsPublished(false)}
              >
                Click to UnPublish
              </button>
            ) : (
              <button
                className='bg-red-200/20 text-red-400 px-4 py-2 rounded-md border border-red-400/40 shadow'
                onClick={() => setIsPublished(true)}
              >
                Click to Publish
              </button>
            )}

           <button
  className='bg-red-600 text-white px-4 py-2 rounded-md shadow-lg'
  onClick={handleRemoveCourse}
>
  Remove Course
</button>

          </div>

          <form className='space-y-6' onSubmit={(e)=>e.preventDefault()}>
            <div>
              <label className='block text-sm font-medium text-gray-200 mb-1'>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full border px-4 py-3 rounded-md bg-white/10 text-white placeholder-gray-300'
                placeholder='Course Title'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-200 mb-1'>SubTitle</label>
              <input
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                className='w-full border px-4 py-3 rounded-md bg-white/10 text-white placeholder-gray-300'
                placeholder='Course Subtitle'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-200 mb-1'>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full border px-4 py-3 rounded-md h-28 resize-none bg-white/10 text-white placeholder-gray-300'
                placeholder='Course Description'
              />
            </div>

            <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
              <div className='flex-1'>
                <label className='block text-sm font-medium text-gray-200 mb-1'>Course Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-full border px-4 py-3 rounded-md bg-white/10 text-white'
                >
                  <option value="">Select Category</option>
                  <option>App Development</option>
                  <option>AI/ML</option>
                  <option>AI Tools</option>
                  <option>Data Science</option>
                  <option>Data Analytics</option>
                  <option>Ethical Hacking</option>
                  <option>UI UX Designing</option>
                  <option>Web Development</option>
                  <option>Others</option>
                </select>
              </div>

              <div className='flex-1'>
                <label className='block text-sm font-medium text-gray-200 mb-1'>Course Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className='w-full border px-4 py-3 rounded-md bg-white/10 text-white'
                >
                  <option value="">Select Level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className='flex-1'>
                <label className='block text-sm font-medium text-gray-200 mb-1'>Course Price (INR)</label>
                <input
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className='w-full border px-4 py-3 rounded-md bg-white/10 text-white placeholder-gray-300'
                  placeholder='INR'
                />
              </div>
            </div>

            {/* thumbnail */}
            <div>
              <label className='block text-sm font-medium text-gray-200 mb-1'>Course Thumbnail</label>
              <input type='file' hidden ref={thumb} accept='image/*' onChange={handleThumbnail} />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} className='relative w-[300px] h-[170px] rounded-lg overflow-hidden shadow-xl cursor-pointer'>
              <img src={frontendImage || img} className='w-full h-full object-cover border rounded-lg' onClick={() => thumb.current.click()} />
            </motion.div>

            <div className='flex items-center justify-start gap-4'>
              <motion.button whileHover={{ scale: 1.05 }} className='bg-red-400/20 hover:bg-red-400/30 text-white border border-red-300/30 px-4 py-2 rounded-md' onClick={() => navigate(-1)}>Cancel</motion.button>

              <motion.button whileHover={{ scale: 1.07 }} onClick={handleEditCourse} disabled={loading} className='bg-black/90 text-white px-7 py-2 rounded-md hover:bg-black/70 shadow-lg'>
                {loading ? "Saving..." : "Save"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default EditCourse;
