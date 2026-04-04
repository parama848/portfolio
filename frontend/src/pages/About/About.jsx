import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import left_arrow from "../../assets/left_arrow.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import about_img from "../../assets/about_img.png";

const socialLinks = [
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/paranthaman2?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BvdPxiK8tTo6Nwr%2FTZoqqvg%3D%3D",
  },
  { icon: FaGithub, url: "https://github.com/parama848" },
];

const About = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-mono px-4 sm:px-6 md:px-10">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-purple-900 via-black to-gray-900 animate-gradient bg-[length:400%_400%]" />

      {/* Back Button */}
      <div className="flex justify-center mt-5 mb-5 z-10 relative">
        <Link to={"/"}>
          <img
            src={left_arrow}
            className="cursor-pointer border-2 border-white rounded-full"
            alt="Back"
          />
        </Link>
      </div>

      {/* Background Ghost Text */}
      <h1 className="absolute top-10 left-4 md:left-[10%] text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] text-white opacity-10 font-bold z-0">
        ABOUT
      </h1>

      {/* Main Content Area */}
      <div className="z-10 relative flex justify-center">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-10 min-h-[70vh]">
          {/* Text Box */}
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.3,
            }}
            className="border border-white/30 bg-white/10 backdrop-blur-lg p-6 md:w-[55%] w-full rounded-lg shadow-lg"
          >
           <p className="text-base sm:text-lg italic leading-loose text-gray-200">
  I am interested in full-stack development because I enjoy building complete
  applications and understanding how different parts work together. From
  creating user-friendly interfaces to implementing backend logic, I like
  working on solutions that are both functional and easy to use.

  <br /><br />

  I have gained hands-on experience through projects, where I learned how to
  design, develop, and improve applications step by step. I focus on writing
  clean and maintainable code and continuously try to improve by learning from
  practice, feedback, and mistakes.

  <br /><br />

  I am motivated to keep learning new technologies and building practical
  solutions that solve real-world problems. I also value teamwork, clear
  communication, and adaptability as important parts of becoming a better
  developer.
</p>
          </motion.div>

          {/* Avatar Image */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              x: { type: "spring", stiffness: 50, damping: 20 },
              opacity: { duration: 0.6, delay: 0.2 },
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="md:w-[35%] w-full flex justify-center"
          >
            <img
              src={about_img}
              alt="avatar"
              className="w-full max-w-[300px] rounded-lg shadow-2xl hover:shadow-purple-500/40 transition-shadow duration-300"
            />
          </motion.div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mt-7 mb-10 z-10 relative ">
        <p className="border-2 rotate-90 "></p>
        {socialLinks.map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="text-white border-2 rounded-full px-1 hover:border-purple-500 py-1 text-xl hover:text-purple-400  transition-colors duration-300"
          >
            <item.icon />
          </motion.a>
        ))}
        <p className="border-2 rotate-90 "></p>
      </div>

      {/* Tailwind animation keyframe */}
      <style>
        {`
          @keyframes gradientBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            animation: gradientBackground 20s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default About;
