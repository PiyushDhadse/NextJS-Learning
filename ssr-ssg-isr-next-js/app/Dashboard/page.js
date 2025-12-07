// app/dashboard/page.js
"use client"; // This makes it a Client Component (CSR)

import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Client-only library

export default function DashboardPage() {
  // Client-side state (CSR-only)
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  // Client-side effects (runs only in browser)
  useEffect(() => {
    console.log("Running in browser!");

    // Fetch data from API
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
        setLoading(false);
      });
    const handleResize = () => {
      console.log("Window size:", window.innerWidth);
    };
    // Add event listener (browser-only)
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Client-side event handler
  const handleClick = () => {
    alert("Clicked from client!");
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Loading dashboard...</h1>
        <div className="mt-4 h-2 w-48 bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">User Dashboard (CSR)</h1>

      {/* Interactive elements */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg border shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <p>
            <strong>Name:</strong> {userData?.name || "Loading..."}
          </p>
          <p>
            <strong>Email:</strong> {userData?.email || "Loading..."}
          </p>
          <p>
            <strong>Last Login:</strong> {new Date().toLocaleString()}
          </p>
        </motion.div>

        <div className="p-6 rounded-lg border shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <button
                onClick={handleClick}
                className={`px-4 py-2 rounded-full transition-colors ${
                  darkMode
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {darkMode ? "Disable" : "Enable"}
              </button>
            </div>

            <button
              onClick={() => alert("This runs in browser!")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show Browser Alert
            </button>
          </div>
        </div>

        {/* Real-time data display */}
        <div className="p-6 rounded-lg border shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Live Data</h2>
          <LiveTimeDisplay /> {/* Nested client component */}
        </div>
      </div>
    </div>
  );
}

// Nested client component
function LiveTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second (browser-only)
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-lg">
        Current Time:{" "}
        <span className="font-mono font-bold">
          {currentTime.toLocaleTimeString()}
        </span>
      </p>
      <p className="text-sm text-gray-500">
        This updates every second using client-side JavaScript
      </p>
    </div>
  );
}
