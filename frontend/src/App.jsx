import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
export const serverUrl = "http://localhost:8000"
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser.js'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Dashboard from './pages/Educator/Dashboard.jsx'
import Courses from './pages/Educator/Courses.jsx'
import CreateCourses from './pages/Educator/CreateCourses.jsx'
import getCreatorCourse from './customHooks/getCreatorCourse.js'
import getPublishedCourse from './customHooks/getPublishedCourse.js'

import EditCourse from './pages/EditCourse.jsx'
import About from './pages/About.jsx'
import Nav from './component/Nav.jsx'
import AllCourses from './pages/AllCourses.jsx'
import EventsPage from './pages/Events.jsx'
import AdminEventRegistrations from './pages/AdminEventRegistrations.jsx'
import WhatWeDoFull from './pages/WhatWeDoFull.jsx'
import MissionVisionPage from './pages/MissionVisionPage.jsx'
import ContactPage from './pages/ContactPage.jsx'



const App = () => {
  getCurrentUser()
  getCreatorCourse()
  getPublishedCourse()
  
  const { userData } = useSelector(state=>state.user);
  return (
    <>
      <ToastContainer />
      <Nav/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={!userData ? <SignUp /> :<Navigate to={"/"}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
        <Route path='/forget' element={!userData ? <ForgetPassword /> : <Navigate to={"/"} />} />
         <Route
  path="/editprofile"
  element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        />
            <Route path='/dashboard' element={
          userData?.role?.toLowerCase() === "educator"
            ? <Dashboard />
            : <Navigate to="/signup" />
        }/>

        <Route path='/courses' element={
          userData?.role?.toLowerCase() === "educator"
            ? <Courses />
            : <Navigate to="/signup" />
        } />
        
          <Route path='/createcourse' element={
          userData?.role?.toLowerCase() === "educator"
            ? <CreateCourses />
            : <Navigate to="/signup" />
        } />
        
        <Route
  path="/editcourse/:courseId"
  element={
    userData?.role === "educator"
      ? <EditCourse />
      : <Navigate to="/signup" />
  }
        />

        <Route path="/about" element={<About />} />
        <Route path='/allcourses' element={userData ? <AllCourses /> : <Navigate to={"/signup"} />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin/events-registrations" element={<AdminEventRegistrations />} />
        <Route path="/what-we-do" element={<WhatWeDoFull />} />
        <Route path="/mission-vision" element={<MissionVisionPage />} />
        <Route path="/contact" element={<ContactPage />} />



        

        
        
        </Routes>
    </>
  )
}

export default App