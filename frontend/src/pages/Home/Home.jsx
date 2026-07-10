
// import React, { Suspense, useMemo } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Preload } from "@react-three/drei";
// import * as THREE from "three";
// import { motion } from "framer-motion";
// import parama from "../../assets/chineselogo.png";
// import {
//   FaGithub,
//   FaLinkedin,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// // Social links
// const socialLinks = [
//   { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/paranthaman2?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BvdPxiK8tTo6Nwr%2FTZoqqvg%3D%3D" },
//   { icon: <FaGithub />, url: "https://github.com/parama848" },
  
// ];

// // Animation variants
// const popupVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: (i) => ({
//     opacity: 1,
//     scale: 1,
//     transition: { delay: i * 0.1, duration: 0.5, type: "spring" },
//   }),
// };

// // Spiral Galaxy Effect
// function SpiralGalaxy() {
//   const points = useMemo(() => {
//     const numPoints = 3000;
//     const radius = 8;
//     const branches = 4;
//     const positions = [];

//     for (let i = 0; i < numPoints; i++) {
//       const r = Math.random() * radius;
//       const branch = (i % branches) * ((2 * Math.PI) / branches);
//       const spin = r * 1.5;

//       const x =
//         Math.cos(branch + spin) * r + THREE.MathUtils.randFloatSpread(0.3);
//       const y = THREE.MathUtils.randFloatSpread(2);
//       const z =
//         Math.sin(branch + spin) * r + THREE.MathUtils.randFloatSpread(0.3);

//       positions.push(x, y, z);
//     }

//     return new Float32Array(positions);
//   }, []);

//   const ref = React.useRef();

//   useFrame(() => {
//     if (ref.current) ref.current.rotation.y += 0.001;
//   });

//   return (
//     <Points ref={ref} positions={points} stride={3} frustumCulled>
//       <PointMaterial size={0.03} color="#00ffee" sizeAttenuation transparent />
//     </Points>
//   );
// }

// // Main Component
// export default function Home() {
//   return (
//     <div className=" relative min-h-screen bg-black overflow-hidden text-white">
//       {/* Canvas Background */}
//       <Canvas camera={{ position: [0, 0, 8] }} className="!fixed inset-0 z-0">
//         <Suspense fallback={null}>
//           <SpiralGalaxy />
//         </Suspense>
//         <Preload all />
//       </Canvas>

//       {/* Social Icons */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         className="absolute left-4 sm:left-8 top-[400px] lg:top-[280px] -translate-y-1/2 flex flex-col space-y-4 z-20 text-xl"
//       >
//         {socialLinks.map(({ icon, url }, i) => (
//           <motion.a
//             key={i}
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             variants={popupVariants}
//             custom={i}
//             className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:scale-125 transition"
//           >
//             {icon}
//           </motion.a>
//         ))}
//       </motion.div>

//       {/* Top/Bottom Links */}
//       <Link to="/projects">
//         <p className="absolute left-5 sm:left-7 lg:bottom-14 bottom-20 text-md rotate-[360deg] origin-left pl-4 z-20">
//           Projects
//         </p>
//       </Link>

//       <a href="https://drive.google.com/file/d/1PBNDT5Y44AsVt__WZjFw5xSC_n2hOHMe/view?usp=sharing">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={popupVariants}
//           custom={2}
//           className="absolute top-6 left-6 sm:left-10 text-md z-20 cursor-pointer"
//         >
//           Resume
//         </motion.div>
//       </a>

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={popupVariants}
//         custom={2}
//         className="absolute top-6 right-6 sm:right-10 text-sm z-20 cursor-pointer"
//       >
//         Say hi..
//       </motion.div>

//       <Link to={"/feats"}>
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={popupVariants}
//           custom={3}
//           className="feats hover:text-shadow shadow-white transition-all duration-300 absolute right-5 sm:right-7 lg:bottom-14  bottom-20 text-md rotate-[90deg] origin-right pr-4 z-20"
//         >
//           Feats
//         </motion.div>
//       </Link>

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={popupVariants}
//         custom={4}
//         className="absolute bottom-6 w-full flex justify-center gap-10 sm:gap-20 z-20 text-md"
//       >
//         <Link to="/about">
//           <p>About</p>
//         </Link>
//         <Link to="/skills">
//           <p>My Skills</p>
//         </Link>
//       </motion.div>

//       {/* Avatar Section with Glowing Rotating Rainbow Ring */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={popupVariants}
//         custom={5}
//         className="relative z-10 flex items-center justify-center h-screen"
//       >
//      <Link to="/intro" className="flex flex-col items-center relative group glow-wrapper">
//   {/* Glowing, Rotating Rainbow Ring */}
//   <div className="glow-effect"></div>

//   {/* Avatar with subtle border */}
//   <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-[2px] bg-black z-10 glow-ring">
//     <div className="w-full h-full rounded-full overflow-hidden bg-black">
//       <img
//         src={parama}
//         alt="Avatar"
//         className="w-full h-full object-cover rounded-full"
//       />
//     </div>
//   </div>

//   <span className=" pl-10 lg:pl-14 text-sm  text-white hover:shadow-2xl shadow-white animate-pulse z-10">
//     Click Me
//   </span>
// </Link>




//       </motion.div>
//     </div>
//   );
// }


import React, { Suspense, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import parama from "../../assets/chineselogo.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com"; // ✅ added
import { Toaster, toast } from "sonner";

// Social links
const socialLinks = [
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/paranthaman2?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BvdPxiK8tTo6Nwr%2FTZoqqvg%3D%3D",
  },
  {
    icon: <FaGithub />,
    url: "https://github.com/parama848",
  },
];

// Animation variants
const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, type: "spring" },
  }),
};

// Spiral Galaxy
function SpiralGalaxy() {
  const points = useMemo(() => {
    const numPoints = 3000;
    const radius = 8;
    const branches = 4;
    const positions = [];

    for (let i = 0; i < numPoints; i++) {
      const r = Math.random() * radius;
      const branch = (i % branches) * ((2 * Math.PI) / branches);
      const spin = r * 1.5;

      const x =
        Math.cos(branch + spin) * r + THREE.MathUtils.randFloatSpread(0.3);
      const y = THREE.MathUtils.randFloatSpread(2);
      const z =
        Math.sin(branch + spin) * r + THREE.MathUtils.randFloatSpread(0.3);

      positions.push(x, y, z);
    }

    return new Float32Array(positions);
  }, []);

  const ref = React.useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.001;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled>
      <PointMaterial size={0.03} color="#00ffee" sizeAttenuation transparent />
    </Points>
  );
}

// MAIN COMPONENT
export default function Home() {
  const [loading, setLoading] = useState(false); // ✅ added

  // ✅ EMAIL FUNCTION
  const sendEmail = () => {
  setLoading(true);

  const promise = emailjs.send(
    "service_0b33zni",
    "template_2z7wx5a",
    {
      name: "Portfolio Visitor",
      email: "no-reply@portfolio.com",
      message: "Someone clicked 'Say Hi'",
    },
    "zygfK_X82z3OGq2-0"
  );

  toast.promise(promise, {
    loading: "Sending message...",
    success: "Message sent successfully!!",
    error: "Failed to send message ❌",
  });

  promise.finally(() => setLoading(false));
};


  return (
    <div className=" relative min-h-screen bg-black overflow-hidden text-white">
      {/* Canvas Background */}
      <Canvas camera={{ position: [0, 0, 8] }} className="!fixed inset-0 z-0">
        <Suspense fallback={null}>
          <SpiralGalaxy />
        </Suspense>
        <Preload all />
      </Canvas>

      {/* Social Icons */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="absolute left-4 sm:left-8 top-[400px] lg:top-[280px] -translate-y-1/2 flex flex-col space-y-4 z-20 text-xl"
      >
        {socialLinks.map(({ icon, url }, i) => (
          <motion.a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variants={popupVariants}
            custom={i}
            className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:scale-125 transition"
          >
            {icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Top/Bottom Links */}
      <Link to="/projects">
        <p className="absolute left-5 sm:left-7 lg:bottom-14 bottom-20 text-md rotate-[360deg] origin-left pl-4 z-20">
          Projects
        </p>
      </Link>

      <a href="https://drive.google.com/file/d/1bYF7l5qRaUXPrzeEVWhE72xIawJAlFnQ/view?usp=sharing">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popupVariants}
          custom={2}
          className="absolute top-6 left-6 sm:left-10 text-md z-20 cursor-pointer"
        >
          Resume
        </motion.div>
      </a>

      {/* ✅ ONLY THIS PART CHANGED */}
      <motion.div
        onClick={sendEmail}
        initial="hidden"
        animate="visible"
        variants={popupVariants}
        custom={2}
        className="absolute top-6 right-6 sm:right-10 text-sm z-20 cursor-pointer"
      >
        {loading ? "Sending..." : "Say hi.."}
      </motion.div>

      <Link to={"/feats"}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popupVariants}
          custom={3}
          className="feats hover:text-shadow shadow-white transition-all duration-300 absolute right-5 sm:right-7 lg:bottom-14  bottom-20 text-md rotate-[90deg] origin-right pr-4 z-20"
        >
          Feats
        </motion.div>
      </Link>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={popupVariants}
        custom={4}
        className="absolute bottom-6 w-full flex justify-center gap-10 sm:gap-20 z-20 text-md"
      >
        <Link to="/about">
          <p>About</p>
        </Link>
        <Link to="/skills">
          <p>My Skills</p>
        </Link>
      </motion.div>

      {/* Avatar Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={popupVariants}
        custom={5}
        className="relative z-10 flex items-center justify-center h-screen"
      >
        <Link to="/intro" className="flex flex-col items-center relative group glow-wrapper">
          <div className="glow-effect"></div>

          <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-[2px] bg-black z-10 glow-ring">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img
                src={parama}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <span className="pl-10 lg:pl-14 text-sm text-white animate-pulse z-10">
            Click Me
          </span>
        </Link>
      </motion.div>
    </div>
  );
}