import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const { userData } = useSelector((state) => state.user ?? {});
  const navigate = useNavigate();

  const earningData = [
    { month: "Jan", earning: 200 },
    { month: "Feb", earning: 450 },
    { month: "Mar", earning: 300 },
    { month: "Apr", earning: 700 },
    { month: "May", earning: 650 },
    { month: "Jun", earning: 900 },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden mt-10">

      {/* CYBERPUNK ANIMATED BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0ff7,#000)] opacity-40"></div>
      <div className="cyber-grid"></div>

      <div className="relative w-full px-6 py-20 space-y-10">

        {/* Profile Card */}
        <div className="max-w-5xl mx-auto bg-[#0a0f1f]/70 backdrop-blur-xl border border-cyan-400/40 neon-border rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          
          <img
            src={userData?.photoUrl || userData?.name.slice(0, 1).toUpperCase()}
            className="w-28 h-28 rounded-full object-cover border-4 border-cyan-300 shadow-md neon-img"
            alt="educator"
          />

          <div className="text-center md:text-left space-y-1">
            <h1 className="text-3xl font-extrabold text-cyan-300 neon-text">
              Welcome, {userData?.name || "Educator"}
            </h1>

            <h1 className="text-xl font-semibold text-purple-300">
              Total Earning: 0
            </h1>

            <p className="text-gray-300 text-sm">
              {userData?.description ||
                "Start Creating Courses for Your Students"}
            </p>

            <button
              onClick={() => navigate("/courses")}
              className="px-6 py-3 bg-cyan-600/40 border border-cyan-400 text-white rounded-lg neon-button hover:bg-cyan-500/60 font-semibold tracking-wide"
            >
              Create Courses
            </button>
          </div>
        </div>

        {/* Earnings Graph */}
        <div className="max-w-5xl mx-auto bg-[#050812]/80 rounded-xl border border-purple-500/40 neon-card p-6">
          <h2 className="text-xl font-bold text-purple-300 mb-4 neon-text">
            Monthly Earnings
          </h2>

          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={earningData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6d28d9" />
                <XAxis dataKey="month" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0a0f1f",
                    border: "1px solid #6d28d9",
                  }}
                  labelStyle={{ color: "white" }}
                />
                <Line
                  type="monotone"
                  dataKey="earning"
                  stroke="#00eaff"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#00eaff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* EXTRA CYBERPUNK CSS */}
      <style>{`
        /* Neon Text */
        .neon-text {
          text-shadow: 0 0 12px #00eaff, 0 0 25px #00eaff;
        }

        /* Neon Border */
        .neon-border {
          box-shadow: 
            0 0 12px #00eaff,
            0 0 30px #00eaff,
            inset 0 0 15px #00eaff40;
        }

        /* Neon Card Glow */
        .neon-card {
          box-shadow:
            0 0 25px #6d28d9,
            0 0 45px #6d28d9,
            inset 0 0 20px #6d28d980;
        }

        /* Image Glow */
        .neon-img {
          box-shadow: 0 0 20px #00eaff, 0 0 40px #00eaff80;
        }

        /* Button Glow */
        .neon-button {
          box-shadow: 0 0 12px #00eaff;
          transition: 0.3s;
        }
        .neon-button:hover {
          box-shadow: 
            0 0 20px #00eaff,
            0 0 45px #00eaff;
        }

        /* Cyberpunk GRID Background Effect */
        .cyber-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(0, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 12s linear infinite;
          opacity: 0.35;
        }

        @keyframes gridMove {
          from { transform: translateY(0px); }
          to { transform: translateY(-200px); }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
