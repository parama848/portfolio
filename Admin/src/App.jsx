import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CreateProject from "./pages/CreateProject";
import ProjectList from "./pages/ProjectList";
import { Toaster } from "sonner";

function App() {
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
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path="/" element={<CreateProject />} />
          <Route path="/projects" element={<ProjectList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
