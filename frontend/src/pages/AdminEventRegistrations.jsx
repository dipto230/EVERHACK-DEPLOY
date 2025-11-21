// src/pages/AdminEventRegistrations.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function AdminEventRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const snap = await getDocs(collection(db, "event_registrations"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRegistrations(data);
      setLoading(false);
    };
    fetch();
  }, []);

  // ----------------------------
  // XML EXPORT FUNCTION
  // ----------------------------
  const convertToXML = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<registrations>\n`;

    registrations.forEach((reg) => {
      let ts =
        reg.createdAt && reg.createdAt.toDate
          ? reg.createdAt.toDate().toISOString()
          : reg.createdAt || "";

      xml += `  <registration>\n`;
      xml += `    <id>${reg.id}</id>\n`;
      xml += `    <name>${escapeXml(reg.name)}</name>\n`;
      xml += `    <email>${escapeXml(reg.email)}</email>\n`;
      xml += `    <phone>${escapeXml(reg.phone || "")}</phone>\n`;
      xml += `    <eventId>${reg.eventId}</eventId>\n`;
      xml += `    <eventTitle>${escapeXml(reg.eventTitle)}</eventTitle>\n`;
      xml += `    <createdAt>${ts}</createdAt>\n`;
      xml += `  </registration>\n`;
    });

    xml += `</registrations>`;
    return xml;
  };

  // Escape XML unsafe characters
  const escapeXml = (unsafe) => {
    if (!unsafe) return "";
    return String(unsafe)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const exportXML = () => {
    const xmlData = convertToXML();
    const blob = new Blob([xmlData], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "event_registrations.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ----------------------------
  // CSV EXPORT FUNCTION
  // ----------------------------
  const exportCSV = () => {
    let csv = "ID,Name,Email,Phone,Event Title,Created At\n";

    registrations.forEach((reg) => {
      let ts =
        reg.createdAt && reg.createdAt.toDate
          ? reg.createdAt.toDate().toISOString()
          : reg.createdAt || "";

      csv += `"${reg.id}","${reg.name}","${reg.email}","${reg.phone || ""}","${reg.eventTitle}","${ts}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "event_registrations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-10 bg-[#020617] min-h-screen text-white mt-20">
      <h1 className="text-4xl font-bold mb-6">Event Registrations</h1>

      <div className="mb-6 flex gap-4">
        <button
          onClick={exportXML}
          className="px-6 py-3 bg-cyan-500 text-black rounded-xl"
        >
          Download XML
        </button>

        <button
          onClick={exportCSV}
          className="px-6 py-3 bg-yellow-400 text-black rounded-xl"
        >
          Download CSV
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0c1122]">
              <tr>
                <th className="p-3 border-b border-gray-700">Name</th>
                <th className="p-3 border-b border-gray-700">Email</th>
                <th className="p-3 border-b border-gray-700">Phone</th>
                <th className="p-3 border-b border-gray-700">Event</th>
                <th className="p-3 border-b border-gray-700">Created At</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id} className="border-b border-gray-700">
                  <td className="p-3">{reg.name}</td>
                  <td className="p-3">{reg.email}</td>
                  <td className="p-3">{reg.phone}</td>
                  <td className="p-3">{reg.eventTitle}</td>
                  <td className="p-3">
                    {reg.createdAt && reg.createdAt.toDate
                      ? reg.createdAt.toDate().toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminEventRegistrations;
