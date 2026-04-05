// import React, { useRef, useMemo, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Sphere, Preload } from "@react-three/drei";
// import { motion } from "framer-motion";
// import { FaGithub } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import * as THREE from "three";
// import API from "../../services/api"; // ✅ import API

// import left_arrow from "../../assets/left_arrow.png";
// import "./Projects.css";

// // Floating animation (unchanged)
// const FloatingOrbs = () => {
//   const group = useRef();

//   const orbs = useMemo(() => {
//     const data = [];
//     for (let i = 0; i < 30; i++) {
//       data.push({
//         position: [
//           THREE.MathUtils.randFloatSpread(15),
//           THREE.MathUtils.randFloatSpread(10),
//           THREE.MathUtils.randFloatSpread(15),
//         ],
//         scale: Math.random() * 0.5 + 0.2,
//         color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 70%)`),
//       });
//     }
//     return data;
//   }, []);

//   useFrame(({ clock }) => {
//     if (group.current) {
//       group.current.rotation.y = clock.getElapsedTime() * 0.05;
//     }
//   });

//   return (
//     <group ref={group}>
//       {orbs.map((orb, idx) => (
//         <Sphere key={idx} args={[1, 32, 32]} position={orb.position} scale={orb.scale}>
//           <meshStandardMaterial
//             color={orb.color}
//             emissive={orb.color}
//             emissiveIntensity={1.2}
//             toneMapped={false}
//           />
//         </Sphere>
//       ))}
//     </group>
//   );
// };

// const Projects = () => {
//   const [projects, setProjects] = useState([]); // ✅ dynamic data
//   const [activeCard, setActiveCard] = useState(null);

//   // ✅ Fetch from backend
//   const fetchProjects = async () => {
//     try {
//       const res = await API.get("/all-projects");
//       setProjects(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   return (
//     <section className="relative min-h-screen bg-black text-white px-6 py-4 overflow-hidden">
//       {/* Background */}
//       <Canvas camera={{ position: [0, 0, 15], fov: 60 }} className="!fixed inset-0 z-0">
//         <ambientLight intensity={1.2} />
//         <pointLight position={[0, 0, 10]} intensity={2} />
//         <FloatingOrbs />
//         <Preload all />
//       </Canvas>

//       {/* Content */}
//       <div className="relative z-10 pt-10">
//         <Link to={"/"}>
//           <img
//             src={left_arrow}
//             alt="Back"
//             className="rounded-full border-[3px] w-8 h-8 border-white mx-auto"
//           />
//         </Link>

//         <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pt-52 sm:pt-16">
//           <div className="flex gap-14 w-max px-6">
//             {projects.map((project, index) => (
//               <div
//                 key={project.id}
//                 className={`flip-card w-[300px] sm:w-[320px] h-[315px] flex-shrink-0 snap-start ${
//                   activeCard === index ? "active" : ""
//                 }`}
//                 onClick={() =>
//                   setActiveCard(activeCard === index ? null : index)
//                 }
//               >
//                 <div className="flip-inner w-full h-full">
//                   {/* FRONT */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.2 }}
//                     className="flip-front bg-black/70 backdrop-blur border border-white rounded-tl-3xl rounded-br-3xl p-4"
//                   >
//                     {/* ✅ IMAGE FROM BACKEND */}
//                     <img
//                       src={project.image}
//                       alt={project.title}
//                       className="w-full h-48 object-cover rounded-tl-2xl rounded-br-2xl"
//                     />

//                     {/* ✅ TAGS from techStack */}
//                     <div className="mt-3 flex flex-wrap gap-2 text-sm">
//                       <span>{project.techStack}</span>
//                     </div>

//                     <hr className="mt-2 border-gray-500" />

//                     {/* BUTTONS */}
//                     <div className="mt-3 flex justify-between gap-2">
//                       <a
//                         href={project.demo}
//                         onClick={(e) => e.stopPropagation()}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-white text-black px-4 py-2 rounded-tl-xl rounded-br-xl text-sm"
//                       >
//                         Live Demo
//                       </a>

//                       <a
//                         href={project.github}
//                         onClick={(e) => e.stopPropagation()}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="border border-white px-4 py-2 rounded-tl-xl rounded-br-xl flex items-center gap-2 text-sm"
//                       >
//                         <FaGithub /> Code
//                       </a>
//                     </div>
//                   </motion.div>

//                   {/* BACK */}
//                   <div className="flip-back">
//                     <h3 className="text-xl font-bold mb-2">{project.title}</h3>
//                     <p className="text-sm">{project.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Preload } from "@react-three/drei";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as THREE from "three";
import API from "../../services/api";

import left_arrow from "../../assets/left_arrow.png";
import "./Projects.css";

// 🌌 Floating animation
const FloatingOrbs = () => {
  const group = useRef();

  const orbs = useMemo(() => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        position: [
          THREE.MathUtils.randFloatSpread(15),
          THREE.MathUtils.randFloatSpread(10),
          THREE.MathUtils.randFloatSpread(15),
        ],
        scale: Math.random() * 0.5 + 0.2,
        color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 70%)`),
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={group}>
      {orbs.map((orb, idx) => (
        <Sphere
          key={idx}
          args={[1, 32, 32]}
          position={orb.position}
          scale={orb.scale}
        >
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/all-projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white px-6 py-4 overflow-hidden">
      {/* 🌌 Background */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        className="!fixed inset-0 z-0"
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[0, 0, 10]} intensity={2} />
        <FloatingOrbs />
        <Preload all />
      </Canvas>

      {/* 📦 Content */}
      <div className="relative z-10 pt-10">
        {/* 🔙 Back Button */}
        <Link to={"/"}>
          <img
            src={left_arrow}
            alt="Back"
            className="rounded-full border-[3px] w-8 h-8 border-white mx-auto"
          />
        </Link>

        {/* 📊 Projects List */}
        <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pt-52 sm:pt-16">
          <div className="flex gap-14 w-max px-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flip-card w-[300px] sm:w-[320px] h-[340px] flex-shrink-0 snap-start ${
                  activeCard === index ? "active" : ""
                }`}
                onClick={() =>
                  setActiveCard(activeCard === index ? null : index)
                }
              >
                <div className="flip-inner w-full h-full">
                  {/* 🔥 FRONT */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flip-front bg-black/70 backdrop-blur border border-white rounded-tl-3xl rounded-br-3xl p-4"
                  >
                    {/* 🖼 Image + Title Overlay */}
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-tl-2xl rounded-br-2xl"
                      />

                      {/* ✅ Title */}
                    </div>
                    <div className="mt-2">
                      {/* 🏷 Title */}
                      <h3 className="text-lg font-semibold text-white leading-tight">
                        {project.title}
                      </h3>

                      {/* Tech Stack */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.techStack?.split(",").map((tech, i) => (
                          <span
                            key={i}
                            className="bg-white/10 text-gray-300 px-2 py-1 rounded-md text-xs tracking-wide"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <hr className="mt-3 border-gray-500" />

                    {/* 🔘 Buttons */}
                    <div className="mt-2 flex justify-between gap-2">
                      <a
                        href={project.demo}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black px-4 py-2 rounded-tl-xl rounded-br-xl text-sm"
                      >
                        Live Demo
                      </a>

                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white px-4 py-2 rounded-tl-xl rounded-br-xl flex items-center gap-2 text-sm"
                      >
                        <FaGithub /> Code
                      </a>
                    </div>
                  </motion.div>

                  {/* 🔁 BACK */}
                  <div className="flip-back p-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-300">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
