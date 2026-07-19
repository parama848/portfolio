import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import { motion } from "framer-motion";
import { FaGithub, FaReact, FaNodeJs } from "react-icons/fa";
import { SiExpress, SiMongodb, SiTailwindcss } from "react-icons/si";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import API from "../../services/api";

import left_arrow from "../../assets/left_arrow.png";
import "./Projects.css";

/**
 * DeveloperWorld
 * Icons previously roamed the full viewport height, which meant they'd
 * periodically drift behind the card row (cards render above the canvas
 * in a fixed z-index layer, so anything passing through that band gets
 * hidden). Fixed by giving each icon a "zone" — either the open strip
 * above the cards or the open strip below them — and only letting it
 * wiggle vertically within that zone (small ampY around a fixed baseY),
 * while still roaming freely left-to-right across the full width (large
 * ampX). This keeps every icon inside visible empty space at all times.
 */
const techStack = [
  {
    Icon: FaReact,
    color: "#61dafb",
    zone: "top",
    freqX: 0.18,
    freqY: 0.5,
    ampX: 10,
    ampY: 1.4,
    phase: 0,
    z: -3,
  },
  {
    Icon: SiTailwindcss,
    color: "#38bdf8",
    zone: "top",
    freqX: 0.14,
    freqY: 0.42,
    ampX: 9.5,
    ampY: 1.2,
    phase: 2.1,
    z: -4,
  },
  {
    Icon: FaNodeJs,
    color: "#68a063",
    zone: "bottom",
    freqX: 0.22,
    freqY: 0.46,
    ampX: 9.5,
    ampY: 1.3,
    phase: 4.2,
    z: -2.5,
  },
  {
    Icon: SiExpress,
    color: "#ffffff",
    zone: "bottom",
    freqX: 0.17,
    freqY: 0.55,
    ampX: 10.5,
    ampY: 1.5,
    phase: 1.3,
    z: -3.5,
  },
  {
    Icon: SiMongodb,
    color: "#47a248",
    zone: "top",
    freqX: 0.2,
    freqY: 0.48,
    ampX: 9.8,
    ampY: 1.3,
    phase: 3.4,
    z: -3,
  },
];

const ZONE_BASE_Y = { top: 6.8, bottom: -6.8 };

const RoamingIcon = ({
  Icon,
  color,
  zone,
  freqX,
  freqY,
  ampX,
  ampY,
  phase,
  z,
}) => {
  const group = useRef();
  const baseY = ZONE_BASE_Y[zone];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + phase;
    if (group.current) {
      group.current.position.x = Math.sin(t * freqX) * ampX;
      group.current.position.y = baseY + Math.sin(t * freqY) * ampY;
      group.current.position.z = z + Math.sin(t * 0.1) * 1.2;
    }
  });

  return (
    <group ref={group}>
      <Html center distanceFactor={4.5} transform={false}>
        <Icon
          size={130}
          color={color}
          style={{
            filter: `drop-shadow(0 0 24px ${color}90)`,
            pointerEvents: "none",
          }}
        />
      </Html>
    </group>
  );
};

const DeveloperWorld = () => {
  return (
    <group>
      {techStack.map((item, index) => (
        <RoamingIcon key={index} {...item} />
      ))}
    </group>
  );
};

const parseTechnologies = (technologies) => {
  try {
    if (typeof technologies === "string") {
      return JSON.parse(technologies);
    }

    if (
      Array.isArray(technologies) &&
      technologies.length === 1 &&
      typeof technologies[0] === "string" &&
      technologies[0].startsWith("[")
    ) {
      return JSON.parse(technologies[0]);
    }

    return technologies || [];
  } catch (err) {
    console.error("Error parsing technologies:", err);
    return [];
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/api/projects");
      const projectData = Array.isArray(res.data)
        ? res.data
        : res.data.projects || [];
      setProjects(projectData);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} />
        <pointLight position={[0, 5, 5]} intensity={1.2} />

        <DeveloperWorld />

        <Preload all />
      </Canvas>

      {/* Content */}
      <div
        className="projects-content"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Link to="/">
          <img src={left_arrow} alt="Back" className="back-btn" />
        </Link>

        <div className="cards-container hide-scrollbar">
          {loading && <p className="projects-status">Loading projects...</p>}

          {!loading && error && <p className="projects-status error">{error}</p>}

          {!loading && !error && projects.length === 0 && (
            <p className="projects-status">No projects found.</p>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="cards-wrapper">
              {projects.map((project, index) => {
                const technologies = parseTechnologies(project.technologies);
                const isActive = activeCard === project._id;

                return (
                  <div
                    key={project._id}
                    className="flip-card"
                    onClick={() => setActiveCard(isActive ? null : project._id)}
                  >
                    <div className={`flip-inner ${isActive ? "active" : ""}`}>
                      {/* Front */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="flip-front"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-image"
                          onMouseEnter={() => {
                            if (window.innerWidth > 768) {
                              setActiveCard(project._id);
                            }
                          }}
                        />

                        <h2 className="project-title">{project.title}</h2>

                        <div className="tech-stack">
                          {technologies.map((tech, i) => (
                            <span key={`${project._id}-tech-${i}`} className="tech-badge">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="project-buttons">
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noreferrer"
                            className="live-btn"
                          >
                            Live Demo
                          </a>

                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="code-btn"
                          >
                            <FaGithub />
                            <span>Code</span>
                          </a>
                        </div>
                      </motion.div>

                      {/* Back */}
                      <div
                        className="flip-back"
                        onMouseLeave={() => {
                          if (window.innerWidth > 768) {
                            setActiveCard(null);
                          }
                        }}
                      >
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="scroll-indicator">
            <ChevronLeft size={28} className="animate-bounce" />
            <p>Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;