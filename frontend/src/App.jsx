import React from "react";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skills";
import Intro from "./pages/Intro/Intro";
import Projects from "./pages/Projects/Project";
import Feats from "./pages/Feats/Feats";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>

    <Toaster position="top-right" richColors expand closeButton />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/feats" element={<Feats />} />
    </Routes>
    </>
      
  );
};

export default App;
