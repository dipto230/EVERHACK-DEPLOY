import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Profile() {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();

  const courseData = [
    { month: "Jan", count: 1 },
    { month: "Feb", count: 2 },
    { month: "Mar", count: 2 },
    { month: "Apr", count: 3 },
    { month: "May", count: 4 },
  ];

  return (
    <div className='min-h-screen bg-[#050505] px-4 py-12 flex items-center justify-center'>
      <div className='relative max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-10 rounded-3xl backdrop-blur-xl'
           style={{ boxShadow: "0 0 25px rgba(0,255,255,0.35), 0 0 50px rgba(0,255,255,0.15)", border: "1px solid rgba(0,255,255,0.2)" }}>

        <FaArrowLeftLong
          className='absolute top-6 left-6 w-[25px] h-[25px] cursor-pointer transition'
          style={{ color: "#0ff", filter: "drop-shadow(0 0 4px #0ff)" }}
          onClick={() => navigate("/")}
        />

        <div className="flex flex-col items-center text-center text-white"> 
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className='w-32 h-32 rounded-full object-cover border-4'
              style={{ borderColor: "#0ff", boxShadow: "0 0 15px #0ff" }}
              alt=""
            />
          ) : (
            <div className='w-32 h-32 rounded-full flex items-center justify-center text-[36px] text-black bg-[#0ff]'
                 style={{ boxShadow: "0 0 15px #0ff" }}>
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          <h2 className='text-3xl font-extrabold mt-4 tracking-wide'
              style={{ color: "#0ff", textShadow: "0 0 8px #0ff" }}>
            {userData.name}
          </h2>

          <p className='text-sm text-gray-300'>{userData.role}</p>

          <div className='mt-6 space-y-4 w-full px-2 text-gray-200'>
            <div className='text-sm flex items-start gap-2'>
              <span className='font-semibold text-[#0ff] drop-shadow-md'>Bio:</span>
              <span>{userData.description}</span>
            </div>
            <div className='text-sm flex items-start gap-2'>
              <span className='font-semibold text-[#0ff] drop-shadow-md'>Email:</span>
              <span>{userData.email}</span>
            </div>
            <div className='text-sm flex items-start gap-2'>
              <span className='font-semibold text-[#0ff] drop-shadow-md'>Enrolled Courses:</span>
              <span>{userData.enrolledCourses.length}</span>
            </div>
          </div>

          <div className='mt-6'>
            <button
              className='px-6 py-2 rounded-lg text-black font-semibold transition'
              style={{
                background: "#0ff",
                boxShadow: "0 0 10px #0ff, 0 0 20px #0ff",
              }}
              onClick={() => navigate("/editprofile")}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className='p-6 rounded-2xl backdrop-blur-xl'
             style={{ border: "1px solid rgba(0,255,255,0.2)", boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}>
          <h3 className='text-xl font-semibold mb-4 text-[#0ff]'
              style={{ textShadow: "0 0 6px #0ff" }}>Activity Overview</h3>

          <div className='w-full h-64'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={courseData}>
                <Line type="monotone" dataKey="count" stroke="#0ff" strokeWidth={3}
                      dot={{ stroke: "#0ff", strokeWidth: 3, r: 5 }} />
                <CartesianGrid stroke="rgba(0,255,255,0.2)" strokeDasharray="5 5" />
                <XAxis dataKey="month" stroke="#0ff" />
                <YAxis stroke="#0ff" />
                <Tooltip contentStyle={{ background: "#001", border: "1px solid #0ff" }} itemStyle={{ color: "#0ff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;