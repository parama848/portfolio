import React, { useEffect } from "react";
import { FaServer, FaPaintBrush } from "react-icons/fa";
import left_arrow from "../../assets/left_arrow.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Skills = () => {
  useEffect(() => {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters =
      "FULLSTACKDEVELOPER0987654321''{}";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      });
    }

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Matrix Background */}
      <canvas
        id="matrixCanvas"
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Back Button */}
      <div className="relative z-10 ml-[45%] pt-6 pl-6">
        <Link to="/">
          <img
            className="rounded-full border-2 border-white mb-3"
            src={left_arrow}
            alt="Back"
            width={40}
          />
        </Link>
      </div>

      {/* Skills Cards */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-10 items-stretch justify-center max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Frontend */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 10px #00FF00",
          }}
          className="bg-black/80 border border-white px-10 py-10 rounded-tl-3xl rounded-br-3xl shadow-md w-full lg:w-1/2 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaPaintBrush className="text-xl text-white" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Frontend Development
            </h2>
          </div>

          <p className="text-sm sm:text-base mb-4">
            Experienced in building responsive, user-friendly, and scalable web
            interfaces with strong focus on usability, performance, and clean UI
            design.
          </p>

          <h3 className="font-semibold text-base sm:text-lg">Core Skills</h3>
          <p className="text-xs sm:text-sm my-2">
            HTML5, CSS3, JavaScript (ES6+), React.js, Redux,
            Tailwind CSS
          </p>

          <h3 className="font-semibold text-base sm:text-lg mt-4">Tools</h3>
          <ul className="list-disc list-inside text-xs sm:text-sm">
            <li>VS Code</li>
            <li>Git & GitHub</li>
            <li>Postman (API testing)</li>
          </ul>
        </motion.div>

        {/* Backend */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 10px #00FF00",
          }}
          className="bg-black/80 border border-white px-10 py-10 rounded-tl-3xl rounded-br-3xl shadow-md w-full lg:w-1/2 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaServer className="text-xl text-white" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Backend Development
            </h2>
          </div>

          <p className="text-sm sm:text-base mb-4">
            Skilled in developing secure and scalable backend systems with
            RESTful APIs, authentication, database management, and role-based
            access control.
          </p>

          <h3 className="font-semibold text-base sm:text-lg">Core Skills</h3>
          <p className="text-xs sm:text-sm my-2">
            Java, JavaScript, Node.js, Express.js,
            Spring Boot, Spring Security, JWT,
            MongoDB, MySQL, REST APIs
          </p>

          <h3 className="font-semibold text-base sm:text-lg mt-4">Tools</h3>
          <ul className="list-disc list-inside text-xs sm:text-sm">
            <li>Postman</li>
            <li>Eclipse & IntelliJ IDEA</li>
            <li>Git & GitHub</li>
            
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
