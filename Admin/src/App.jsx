// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import CreateProject from "./pages/CreateProject";
// import ProjectList from "./pages/ProjectList";
// import { Toaster } from "sonner";
// import UpdateProject from "./pages/UpdateProject";

// function App() {
//   return (
//     <>
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           style: {
//             background: "#ffffff",
//             color: "green",
//             border: "1px solid #e5e7eb",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//             fontSize: "14px",
//           },
//         }}
//       />
//       <BrowserRouter>
//         <Sidebar />
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<CreateProject />} />
//           <Route path="/projects" element={<ProjectList />} />
//           <Route path="/update-project/:id" element={<UpdateProject />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import CreateProject from "./pages/CreateProject";
import ProjectList from "./pages/ProjectList";
import UpdateProject from "./pages/UpdateProject";

import { Toaster } from "sonner";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "green",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            fontSize: "14px",
          },
        }}
      />

      <BrowserRouter>
        <Sidebar open={open} setOpen={setOpen} />

        <Navbar open={open} setOpen={setOpen} />

        <main className="pt-16 md:ml-64">
          <Routes>
            <Route path="/" element={<CreateProject />} />

            <Route
              path="/projects"
              element={<ProjectList />}
            />

            <Route
              path="/update-project/:id"
              element={<UpdateProject />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;