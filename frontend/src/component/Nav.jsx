import React, { useState } from 'react'
import icon from '../assets/icon.svg'
import { IoPersonCircle } from 'react-icons/io5'
import { FiMenu, FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'

function Nav() {
  const [showPopup, setShowPopup] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Handle Logout
  const handleLogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      toast.success("Logout Successful")
      setShowMenu(false)
      setMobileOpen(false)
    } catch (error) {
      console.error("Logout error:", error)
      const message = error.response?.data?.message || "Logout failed. Please try again."
      toast.error(message)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'What We Do', path: '/what-we-do' },
    { name: 'Mission & Vision', path: '/mission-vision' },
    { name: 'Events', path: '/events' },
  ]

  return (
    <div>
      {/* Navbar */}
      <div className='w-full h-[70px] fixed top-0 px-6 py-3 flex items-center justify-between 
        bg-[#0a0f1e]/90 backdrop-blur-md shadow-md shadow-[#00ffd180] z-20'>

        {/* Left: Logo */}
        <div className='flex items-center'>
          <img
            src={icon}
            alt="icon"
            className='w-[60px] rounded-[5px] border-2 border-[#00FFD1] cursor-pointer hover:scale-105 transition-transform duration-300'
            onClick={() => navigate('/')}
          />
        </div>

        {/* Desktop Links */}
        <div className='hidden lg:flex items-center justify-center gap-8 text-white text-[18px] font-light'>
          {navLinks.map((link, index) => (
            <span
              key={index}
              onClick={() => navigate(link.path)}
              className='cursor-pointer px-[10px] py-[5px] rounded-[8px] transition-all duration-300 
              hover:text-[#00FFD1] hover:underline hover:underline-offset-4'
            >
              {link.name}
            </span>
          ))}

          {!userData && (
            <span
              onClick={() => setShowPopup(true)}
              className='cursor-pointer px-[14px] py-[8px] rounded-[10px] bg-[#00FFD1] text-black font-medium
                hover:bg-transparent hover:text-[#00FFD1] hover:border hover:border-[#00FFD1] transition-all duration-300'>
              Join Us
            </span>
          )}
        </div>

        {/* Right Section (Profile + Dashboard + Logout) */}
        <div className='relative flex items-center gap-4'>
          {/* Hamburger for mobile */}
          <div className='lg:hidden'>
            {mobileOpen ? (
              <FiX
                className='w-8 h-8 text-[#00FFD1] cursor-pointer'
                onClick={() => setMobileOpen(false)}
              />
            ) : (
              <FiMenu
                className='w-8 h-8 text-[#00FFD1] cursor-pointer'
                onClick={() => setMobileOpen(true)}
              />
            )}
          </div>

          {/* Profile / Logout on Desktop */}
          {userData && (
            <div className='hidden lg:flex items-center gap-4'>
              {/* Profile Icon */}
              <div
                className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer'
                onClick={() => setShowMenu(prev => !prev)}
              >
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className='absolute top-[70px] right-0 flex flex-col items-start gap-2 bg-white border border-[#00FFD1] rounded-lg shadow-lg p-3 z-20'>
                  <span
                    onClick={() => { navigate('/profile'); setShowMenu(false) }}
                    className='w-full px-4 py-2 text-black rounded-md hover:bg-[#00FFD1] hover:text-black cursor-pointer transition-all duration-200'
                    
                  >
                    My Profile
                  </span>
                  <span
                    onClick={() => { navigate('/courses'); setShowMenu(false) }}
                    className='w-full px-4 py-2 text-black rounded-md hover:bg-[#00FFD1] hover:text-black cursor-pointer transition-all duration-200'
                  
                  >
                    My Courses
                  </span>
                </div>
              )}

              {userData?.role === "educator" && (
                <div
                  className='px-[20px] py-[10px] border-2 border-[#00FFD1] text-[#00FFD1] rounded-[10px] 
                  text-[18px] font-light cursor-pointer hover:bg-[#00FFD1] hover:text-black transition-all duration-300'
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </div>
              )}

              <button
                onClick={handleLogOut}
                className='px-[18px] py-[8px] rounded-[10px] border-2 border-[#00FFD1] text-[#00FFD1] 
                text-[16px] font-medium hover:bg-[#00FFD1] hover:text-black transition-all duration-300'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className='fixed top-[70px] left-0 w-full bg-[#0a0f1e]/95 text-white flex flex-col items-center gap-6 py-6 z-10 border-t border-[#00FFD1]'>
          {navLinks.map((link, index) => (
            <span
              key={index}
              onClick={() => {
                navigate(link.path)
                setMobileOpen(false)
              }}
              className='text-lg cursor-pointer hover:text-[#00FFD1] transition-all duration-300'
            >
              {link.name}
            </span>
          ))}

          {!userData && (
            <button
              onClick={() => {
                setShowPopup(true)
                setMobileOpen(false)
              }}
              className='px-6 py-3 bg-[#00FFD1] text-black rounded-lg font-medium hover:bg-transparent hover:text-[#00FFD1] border-2 border-[#00FFD1] transition-all duration-300'
            >
              Join Us
            </button>
          )}

          {userData && (
            <>
              {userData?.role === "educator" && (
                <button
                  onClick={() => {
                    navigate('/dashboard')
                    setMobileOpen(false)
                  }}
                  className='px-6 py-3 border-2 border-[#00FFD1] text-[#00FFD1] rounded-lg font-medium hover:bg-[#00FFD1] hover:text-black transition-all duration-300'
                >
                  Dashboard
                </button>
              )}

              <button
                onClick={() => {
                  navigate('/profile')
                  setMobileOpen(false)
                }}
                className='px-6 py-3 border-2 border-[#00FFD1] text-[#00FFD1] rounded-lg font-medium hover:bg-[#00FFD1] hover:text-black transition-all duration-300'
              >
                My Profile
              </button>

              <button
                onClick={() => {
                  navigate('/courses')
                  setMobileOpen(false)
                }}
                className='px-6 py-3 border-2 border-[#00FFD1] text-[#00FFD1] rounded-lg font-medium hover:bg-[#00FFD1] hover:text-black transition-all duration-300'
              >
                My Courses
              </button>

              <button
                onClick={handleLogOut}
                className='px-6 py-3 bg-[#00FFD1] text-black rounded-lg font-medium hover:bg-transparent hover:text-[#00FFD1] border-2 border-[#00FFD1] transition-all duration-300'
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Popup Modal (for Login) */}
      {showPopup && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-30'>
          <div className='bg-[#0a0f1e] border border-[#00FFD1] rounded-2xl p-8 w-[90%] max-w-[400px] text-center text-white shadow-[0_0_20px_#00FFD1]'>
            <h2 className='text-2xl font-semibold mb-6 text-[#00FFD1]'>Join EverHack</h2>
            <p className='text-gray-300 mb-6'>Choose an option below to continue:</p>

            <button
              className='px-6 py-3 border-2 border-[#00FFD1] text-[#00FFD1] rounded-lg font-medium 
                hover:bg-[#00FFD1] hover:text-black transition-all duration-300'
              onClick={() => {
                setShowPopup(false)
                navigate("/login")
              }}
            >
              Login
            </button>

            <button
              onClick={() => setShowPopup(false)}
              className='mt-6 text-gray-400 hover:text-[#00FFD1] transition-colors'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Nav