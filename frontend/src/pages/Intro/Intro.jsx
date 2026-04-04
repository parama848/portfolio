import React, { useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import parama from "../../assets/parama.png";
import "./stars.css";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

const AnimatedStars = () => {
  useFrame(({ clock, camera }) => {
    camera.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
  });
  return (
    <Stars
      radius={100}
      depth={60}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={2}
    />
  );
};

export default function Intro() {
  const [showContent, setShowContent] = useState(false);

  const socialLinks = [
    { icon: <FaLinkedin />, url: "https://github.com/parama848" },
    { icon: <FaGithub />, url: "https://github.com/parama848" },
  ];

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, type: "spring" },
    }),
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1300); // after border grows
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden font-sans bg-black">
        {/* Star Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
              <AnimatedStars />
            </Suspense>
          </Canvas>
        </div>

        {/* Social Icons - Responsive Layout */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="absolute z-20 text-xl
             flex flex-col md:left-10 md:top-80 md:-translate-y-1/2
             bottom-4 w-full justify-center items-center md:items-start md:w-auto md:flex-col"
        >
          <div className="flex flex-row md:flex-col gap-4">
            {socialLinks.map(({ icon, url }, i) => (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variants={popupVariants}
                custom={i}
                className="w-9 h-9 flex items-center justify-center bg-white text-black rounded-full transition"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <p
          className="absolute border-2 border-white bg-white 
   w-full h-0.5 lg:h-full bottom-20 md:w-0.5 md:h-60 md:left-[55px] md:bottom-10"
        ></p>

        {/* Animated Border Box */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "80%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="relative z-10 mx-auto mt-16 border-[5px] bg-white  border-black flex flex-col md:flex-row min-h-[400px] max-w-6xl overflow-hidden"
        >
          {showContent && (
            <>
              {/* Left Side Content */}
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full  md:w-1/2 text-black flex flex-col justify-center items-start p-10"
              >
                <h1 className="type text-xl lg:text-2xl   sm:text-2xl md:text-3xl font-bold mb-2">
                  Hi,
                </h1>
                <h2 className="typing lg:text-3xl  text-2xl sm:text-3xl md:text-3xl font-semibold mb-4">
                  PARANTHAMAN R
                </h2>

                <p className="text-xs lg:text-mg  md:text-lg text-gray-800 leading-relaxed w-full ">
                  IIIrd Year,{" "}
                  <strong className="font-semibold text-black">
                    BE-Computer Science Student{" "}
                  </strong>{" "}
                  At RMK Engineering College.
                </p>

                <p>
                  I am passionate in <strong>FullStack development</strong>{" "}
                </p>
              </motion.div>

              {/* Right Side Avatar */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-1/2 bg-black  border-2 border-white flex items-center justify-center py-10 px-6"
              >
                <div className="glow-wrapper flex items-center justify-center">
                  {/* Circle Container */}
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white">
                    {/* Image */}
                    <img
                      src={parama}
                      alt="parama"
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full pointer-events-none glow-effect"></div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-4 border-2 rounded-full  left-1/2 -translate-x-1/2 z-30"
        >
          <IoArrowBack className="text-white bg-black p-1 w-8 h-8 rounded-full border hover:shadow-lg" />
        </Link>
      </div>
    </>
  );
}
