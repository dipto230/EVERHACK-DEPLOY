import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

function CardPage() {
    const navigate = useNavigate()
    const { courseData } = useSelector(state => state.course)

    const [popularCourse, setPopularCourse] = useState([])
    useEffect(() => {
        setPopularCourse(courseData.slice(0, 6));
    }, [courseData])

    // Title glow animation
    const titleGlow = {
        animate: {
            textShadow: [
                "0 0 8px rgba(0,255,255,0.4)",
                "0 0 18px rgba(0,255,255,0.8)",
                "0 0 8px rgba(0,255,255,0.4)"
            ],
            color: ["#ffffff", "#a8ffff", "#ffffff"],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    const parentVariant = {
        animate: {
            transition: {
                staggerChildren: 1.2,
                repeat: Infinity
            }
        }
    }

    const cardVariant = {
        animate: {
            x: [-60, 0, 60, 0],
            scale: [0.85, 1, 0.9, 1],
            rotateY: [15, 0, -15, 0],
            opacity: [0.7, 1, 0.8, 1],
            transition: {
                duration: 3.5,
                ease: "easeInOut",
                repeat: Infinity
            }
        }
    }

    return (
        <div className="relative flex items-center justify-center flex-col bg-[#020617] w-full">

            {/* ⭐ Title + Animated Glowing Button */}
            <div className="flex items-center gap-5 mt-[30px]">

                <motion.h1
                    variants={titleGlow}
                    animate="animate"
                    className="md:text-[45px] text-[30px] font-semibold text-white"
                >
                    Our Popular Courses
                </motion.h1>

                {/* ⭐ Animated Glowing Button */}
                <motion.button
                    onClick={() => navigate('/allcourses')}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0 0 18px rgba(0,255,255,0.8)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        boxShadow: [
                            "0 0 6px rgba(0,255,255,0.3)",
                            "0 0 14px rgba(0,255,255,0.7)",
                            "0 0 6px rgba(0,255,255,0.3)"
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="px-4 py-2 text-white bg-cyan-600 rounded-lg"
                >
                    View All
                </motion.button>

            </div>

            {/* ⭐ Courses Row */}
            <div className="w-full overflow-hidden py-10 flex justify-center">

                <motion.div
                    className="flex flex-nowrap gap-[50px]"
                    variants={parentVariant}
                    animate="animate"
                >
                    {popularCourse.map((course, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariant}
                            style={{ perspective: "1000px" }}
                        >
                            <Card
                                thumbnail={course.thumbnail}
                                title={course.title}
                                category={course.category}
                                price={course.price}
                                id={course._id}
                            />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    )
}

export default CardPage
