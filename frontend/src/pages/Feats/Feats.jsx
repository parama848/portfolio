import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import feat1 from '../../assets/feat1.png';
import feat2 from '../../assets/feat2.png';
import left_arrow from '../../assets/arrow_left_black.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import feat3 from '../../assets/leetcode.png';
import feat4 from '../../assets/hackerrank.png';

// 🌀 3D BLOB BACKGROUND
const AbstractBlob = () => {
  const mesh = useRef();

  useFrame(({ clock }) => {
    mesh.current.rotation.x = Math.sin(clock.elapsedTime / 2) * 0.5;
    mesh.current.rotation.y = Math.cos(clock.elapsedTime / 2) * 0.5;
  });

  return (
    <mesh ref={mesh} scale={[3.5, 3.5, 3.5]} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 3]} />
      <meshStandardMaterial
        color={'#a78bfa'}
        wireframe
        metalness={0.3}
        roughness={0.1}
      />
    </mesh>
  );
};

// ✨ CARD ANIMATION VARIANTS
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.3,
      type: 'spring',
      stiffness: 100,
      damping: 14,
    },
  }),
};

// 📦 JSON CARD DATA
const featsData = [
   {
    id: 1,
    title: 'Leetcode',
    desc: '#leetcode',
    img: feat3,
    link:
      'https://leetcode.com/u/8Rbw3bondA/',
  },
  {
    id: 2,
    title: 'SkillRack',
    desc: '#skillrack #regional competitive coding',
    img: feat1,
    link:
      'https://www.skillrack.com/faces/resume.xhtml?id=439256&key=385886938c4d79faed7db1cb40f746e8fac8fd65',
  },
  {
    id: 3,
    title: 'Hackerrank',
    desc: '#Hackarank',
    img: feat4,
    link:
      'https://www.hackerrank.com/profile/parama8148497159',
  },
  {
    id: 4,
    title: 'Imneo',
    desc: '#Imneo',
    img: feat2,
    link:
      'https://rmk685.examly.io/dashboard',
  },
 
];

const Feats = () => {
  return (
    <>
      {/* BACKGROUND CANVAS */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black">
        <Canvas camera={{ position: [0, 0, 6], fov: 70 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[0, 3, 5]} intensity={1} />
          <AbstractBlob />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* FOREGROUND */}
      <div className="relative z-20 min-h-screen overflow-y-auto px-4 pt-24 md:px-20 pb-10">
        {/* BACK ARROW */}
        <div className="absolute top-5 left-5">
          <Link to="/">
            <img
              className="rounded-full border-2 bg-white border-white w-10 h-10 p-1"
              src={left_arrow}
              alt="Back"
            />
          </Link>
        </div>

        {/* FEATS GRID */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-10 items-center">
          {featsData.map((feat, i) => (
            <motion.div
              key={feat.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{
                rotateY: 8,
                rotateX: 2,
                scale: 1.05,
                boxShadow: '0px 15px 30px rgba(255,255,255,0.2)',
                transition: { type: 'spring', stiffness: 120, damping: 12 },
              }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-[45%] lg:w-[40%] backdrop-blur-lg bg-white/10 border-white border-[1.5px] 
                         rounded-tl-3xl rounded-br-3xl text-white shadow-xl p-4 transition-all duration-300"
            >
              <a href={feat.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={feat.img}
                  alt="feat-img"
                  className="rounded-tl-[35px] rounded-br-[35px] object-cover w-full h-[220px] p-2"
                />
              </a>
              <h4 className="mt-2 font-bold text-lg">{feat.title}</h4>
              <hr className="my-2 border-gray-400" />
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feats;

