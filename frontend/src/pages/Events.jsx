// src/pages/EventsPage.jsx
import React, { useState } from "react";
import { eventsData } from "../data/eventsData";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function EventsPage() {
  const [filter, setFilter] = useState("All");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const filteredEvents = eventsData.filter((event) => {
    if (filter === "All") return true;
    if (filter === "Upcoming" && event.status === "Upcoming") return true;
    if (filter === "Completed" && event.status === "Completed") return true;
    if (filter === "Workshops" && event.category === "WORKSHOP") return true;
    if (filter === "Webinars" && event.category === "WEBINAR") return true;
    return false;
  });

  const tabs = ["All", "Upcoming", "Completed", "Workshops", "Webinars"];

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();

    if (!name || !email) {
      alert("Please enter name and email.");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      // store server timestamp for consistent ordering
      createdAt: serverTimestamp()
    };

    try {
      setSubmitting(true);
      await addDoc(collection(db, "event_registrations"), payload);
      setSubmitting(false);
      setShowModal(false);
      setSelectedEvent(null);
      alert("Registration submitted — thank you!");
      e.target.reset();
    } catch (err) {
      console.error("Firestore save error:", err);
      setSubmitting(false);
      alert("Failed to submit. Try again.");
    }
  };

  return (
    <section className="relative w-full py-24 bg-[#020617] text-white overflow-hidden">
      {/* ... your animated blobs and title ... (keep as earlier) ... */}
      <div className="relative max-w-7xl mx-auto px-6 mt-10">
        {/* Title / tabs (unchanged) */}
        <h2 className="text-center font-extrabold text-5xl md:text-6xl tracking-wide leading-tight">
          <span className="text-white">Events</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">{" "} & Workshops</span>
        </h2>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-xl border transition font-semibold
                ${filter === tab ? "bg-cyan-500 text-black shadow-lg" : "bg-transparent border-gray-700 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#0c1122] p-6 rounded-2xl border border-gray-800 shadow-xl hover:border-cyan-400 transition relative overflow-hidden group"
            >
              {/* content: badges, title, desc, info, tags (same as before) */}
              <div className="flex justify-between mb-4">
                <span className="px-4 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/20">
                  {event.category}
                </span>
                <span className="px-4 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300 border border-orange-300/20">
                  {event.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-cyan-300 transition">
                {event.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">{event.desc}</p>

              <div className="w-full h-px bg-gray-700 my-4"></div>

              <div className="flex flex-col gap-3 text-gray-300 text-sm">
                <div className="flex items-center gap-2"><FaCalendarAlt className="text-gray-400" /> {event.date}</div>
                <div className="flex items-center gap-2"><FaClock className="text-gray-400" /> {event.duration}</div>
                <div className="flex items-center gap-2"><FaUser className="text-gray-400" /> {event.mentor}</div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {event.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 text-xs rounded-full bg-[#11172e] border border-gray-700 text-gray-300">{tag}</span>
                ))}
              </div>

              <button
                onClick={() => handleRegisterClick(event)}
                className="w-full mt-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition shadow-md"
              >
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0c1122] p-8 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-lg relative">
            <button onClick={() => { setShowModal(false); setSelectedEvent(null); }} className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl">✕</button>
            <h2 className="text-2xl font-bold mb-2">Register for {selectedEvent.title}</h2>
            <p className="text-sm text-gray-300 mb-4">{selectedEvent.date} • {selectedEvent.duration}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input name="name" type="text" required placeholder="Your name" className="px-4 py-3 rounded-xl bg-[#11172e] text-white border border-gray-700 outline-none" />
              <input name="email" type="email" required placeholder="Your email" className="px-4 py-3 rounded-xl bg-[#11172e] text-white border border-gray-700 outline-none" />
              <input name="phone" type="text" placeholder="Phone (optional)" className="px-4 py-3 rounded-xl bg-[#11172e] text-white border border-gray-700 outline-none" />
              <input type="hidden" name="eventId" value={selectedEvent.id} />

              <button type="submit" disabled={submitting} className="w-full py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition">
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventsPage;
