// import React, { useRef, useMemo, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Sphere, Preload } from "@react-three/drei";
// import { motion } from "framer-motion";
// import { FaGithub } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import * as THREE from "three";
// import { ChevronLeft } from "lucide-react";

// import API from "../../services/api";

// import left_arrow from "../../assets/left_arrow.png";
// import "./Projects.css";

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
//         color: new THREE.Color(
//           `hsl(${Math.random() * 360}, 100%, 70%)`
//         ),
//       });
//     }

//     return data;
//   }, []);

//   useFrame(({ clock }) => {
//     if (group.current) {
//       group.current.rotation.y =
//         clock.getElapsedTime() * 0.05;
//     }
//   });

//   return (
//     <group ref={group}>
//       {orbs.map((orb, index) => (
//         <Sphere
//           key={index}
//           args={[1, 32, 32]}
//           position={orb.position}
//           scale={orb.scale}
//         >
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
//   const [projects, setProjects] = useState([]);
//   const [activeCard, setActiveCard] =
//     useState(null);

//   const fetchProjects = async () => {
//     try {
//       const res = await API.get("/api/projects");

//       const projectData = Array.isArray(
//         res.data
//       )
//         ? res.data
//         : res.data.projects || [];

//       setProjects(projectData);
//     } catch (err) {
//       console.error(
//         "Error fetching projects:",
//         err
//       );
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   return (
//     <section className="relative min-h-screen bg-black text-white px-6 py-4 overflow-hidden">
//       {/* Background */}
//       <Canvas
//         camera={{
//           position: [0, 0, 15],
//           fov: 60,
//         }}
//         className="fixed inset-0 z-0"
//       >
//         <ambientLight intensity={1.2} />

//         <pointLight
//           position={[0, 0, 10]}
//           intensity={2}
//         />

//         <FloatingOrbs />

//         <Preload all />
//       </Canvas>

//       {/* Content */}
//       <div className="relative z-10 pt-10">
//         <Link to="/">
//           <img
//             src={left_arrow}
//             alt="Back"
//             className="rounded-full border-[3px] w-8 h-8 border-white mx-auto"
//           />
//         </Link>

//         <div className="w-full overflow-x-auto hide-scrollbar pt-16">
//           <div className="flex gap-10 w-max px-6">
//             {projects.map((project, index) => {
//               const technologies =
//                 typeof project.technologies ===
//                 "string"
//                   ? JSON.parse(
//                       project.technologies
//                     )
//                   : Array.isArray(
//                         project.technologies
//                       ) &&
//                     project.technologies
//                       .length === 1 &&
//                     typeof project
//                       .technologies[0] ===
//                       "string" &&
//                     project.technologies[0].startsWith(
//                       "["
//                     )
//                   ? JSON.parse(
//                       project.technologies[0]
//                     )
//                   : project.technologies ||
//                     [];

//               const isActive =
//                 activeCard === project._id;

//               return (
//                 <div
//                   key={project._id}
//                   className="flip-card w-[320px] h-[500px] flex-shrink-0"
//                 >
//                   <div
//                     className={`flip-inner ${
//                       isActive
//                         ? "active"
//                         : ""
//                     }`}
//                   >
//                     {/* FRONT */}
//                     <motion.div
//                       initial={{
//                         opacity: 0,
//                         y: 30,
//                       }}
//                       animate={{
//                         opacity: 1,
//                         y: 0,
//                       }}
//                       transition={{
//                         delay: index * 0.15,
//                       }}
//                       className="flip-front bg-black/70 backdrop-blur-md border border-white rounded-tl-3xl rounded-br-3xl p-5 flex flex-col"
//                     >
//                       {/* IMAGE */}
//                       <img
//                         src={project.image}
//                         alt={project.title}
//                         className="w-full h-56 object-cover rounded-tl-2xl rounded-br-2xl cursor-pointer"
//                         onMouseEnter={() =>
//                           setActiveCard(
//                             project._id
//                           )
//                         }
//                       />

//                       {/* TITLE */}
//                       <h2 className="mt-5 text-2xl font-bold">
//                         {project.title}
//                       </h2>

//                       {/* TECH STACK */}
//                       <div className="mt-4 flex flex-wrap gap-2">
//                         {technologies.map(
//                           (tech, i) => (
//                             <span
//                               key={i}
//                               className="bg-white/10 border border-white/20 px-3 py-1 rounded-xl text-sm"
//                             >
//                               {tech}
//                             </span>
//                           )
//                         )}
//                       </div>

//                       {/* BUTTONS */}
//                       <div className="mt-auto flex gap-3 pt-6">
//                         <a
//                           href={
//                             project.liveDemo
//                           }
//                           target="_blank"
//                           rel="noreferrer"
//                           className="flex-1 bg-white text-black text-center py-3 rounded-xl font-medium"
//                         >
//                           Live Demo
//                         </a>

//                         <a
//                           href={project.github}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="flex-1 border border-white py-3 rounded-xl flex items-center justify-center gap-2"
//                         >
//                           <FaGithub />
//                           Code
//                         </a>
//                       </div>
//                     </motion.div>

//                     {/* BACK */}
//                     <div
//                       className="flip-back" 
//                       onMouseLeave={() =>
//                         setActiveCard(null)
//                       }
//                     >
//                       <h2 className="text-2xl font-bold mb-5">
//                         {project.title}
//                       </h2>

//                       <p className="text-gray-300 leading-7">
//                         {project.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="flex items-center justify-center gap-2 mt-8 text-gray-400 animate-pulse">
//   <ChevronLeft size={28} className="animate-bounce" />

//   <p className="text-sm uppercase tracking-[3px]">
//     Scroll to explore
//   </p>
// </div>
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
import { ChevronLeft } from "lucide-react";

import API from "../../services/api";

import left_arrow from "../../assets/left_arrow.png";
import "./Projects.css";

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
        color: new THREE.Color(
          `hsl(${Math.random() * 360}, 100%, 70%)`
        ),
      });
    }

    return data;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y =
        clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={group}>
      {orbs.map((orb, index) => (
        <Sphere
          key={index}
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
      const res = await API.get("/api/projects");

      const projectData = Array.isArray(res.data)
        ? res.data
        : res.data.projects || [];

      setProjects(projectData);
    } catch (err) {
      console.error(
        "Error fetching projects:",
        err
      );
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="projects-section">
      {/* Background */}

      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 60,
        }}
        className="fixed inset-0 z-0"
      >
        <ambientLight intensity={1.2} />

        <pointLight
          position={[0, 0, 10]}
          intensity={2}
        />

        <FloatingOrbs />

        <Preload all />
      </Canvas>

      {/* Content */}

      <div className="projects-content">
        <Link to="/">
          <img
            src={left_arrow}
            alt="Back"
            className="back-btn"
          />
        </Link>

        <div className="cards-container hide-scrollbar">
          <div className="cards-wrapper">
            {projects.map((project, index) => {
              const technologies =
                typeof project.technologies ===
                "string"
                  ? JSON.parse(
                      project.technologies
                    )
                  : Array.isArray(
                        project.technologies
                      ) &&
                    project.technologies
                      .length === 1 &&
                    typeof project
                      .technologies[0] ===
                      "string" &&
                    project.technologies[0].startsWith(
                      "["
                    )
                  ? JSON.parse(
                      project.technologies[0]
                    )
                  : project.technologies ||
                    [];

              const isActive =
                activeCard === project._id;

              return (
                <div
                  key={project._id}
                  className="flip-card"
                  onClick={() =>
                    setActiveCard(
                      isActive
                        ? null
                        : project._id
                    )
                  }
                >
                  <div
                    className={`flip-inner ${
                      isActive
                        ? "active"
                        : ""
                    }`}
                  >
                    {/* Front */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.15,
                      }}
                      className="flip-front"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-image"
                        onMouseEnter={() => {
                          if (
                            window.innerWidth >
                            768
                          ) {
                            setActiveCard(
                              project._id
                            );
                          }
                        }}
                      />

                      <h2 className="project-title">
                        {project.title}
                      </h2>

                      <div className="tech-stack">
                        {technologies.map(
                          (tech, i) => (
                            <span
                              key={i}
                              className="tech-badge"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>

                      <div className="project-buttons">
                        <a
                          href={
                            project.liveDemo
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="live-btn"
                        >
                          Live Demo
                        </a>

                        <a
                          href={
                            project.github
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="code-btn"
                        >
                          <FaGithub />

                          <span>
                            Code
                          </span>
                        </a>
                      </div>
                    </motion.div>

                    {/* Back */}

                    <div
                      className="flip-back"
                      onMouseLeave={() => {
                        if (
                          window.innerWidth >
                          768
                        ) {
                          setActiveCard(
                            null
                          );
                        }
                      }}
                    >
                      <h2>
                        {project.title}
                      </h2>

                      <p>
                        {
                          project.description
                        }
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="scroll-indicator">
            <ChevronLeft
              size={28}
              className="animate-bounce"
            />

            <p>Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;