// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import { toast } from "sonner";

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedCard, setExpandedCard] = useState(null);

//   const navigate = useNavigate();

//   const fetchProjects = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get("/api/projects");

//       const projectData = Array.isArray(res.data)
//         ? res.data
//         : res.data.projects || [];

//       setProjects(projectData);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch projects ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this project?",
//     );

//     if (!confirmDelete) return;

//     try {
//       await API.delete(`/api/project/delete/${id}`);

//       toast.success("Project deleted successfully ✅");

//       setProjects((prev) => prev.filter((project) => project._id !== id));
//     } catch (error) {
//       console.error(error);
//       toast.error("Delete failed ❌");
//     }
//   };

//   return (
//     <div className="ml-64 min-h-screen p-8 bg-gray-100">
//       <h1 className="text-4xl font-bold mb-8">Project List</h1>

//       {loading ? (
//         <div className="flex justify-center items-center h-[60vh]">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : projects.length === 0 ? (
//         <div className="text-center text-gray-500 text-xl mt-20">
//           No projects found 🚀
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//           {projects.map((project) => {
//             const description = project.description || "";

//             const isExpanded = expandedCard === project._id;

//             return (
//               <div
//                 key={project._id}
//                 className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
//               >
//                 {/* Project Image */}
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-56 object-cover"
//                 />

//                 <div className="p-5">
//                   {/* Title */}
//                   <h2 className="text-2xl font-bold mb-3 line-clamp-1">
//                     {project.title}
//                   </h2>

//                   {/* Description */}
//                   <p className="text-gray-600 leading-7">
//                     {isExpanded
//                       ? description
//                       : description.slice(0, 120) +
//                         (description.length > 120 ? "..." : "")}
//                   </p>

//                   {description.length > 120 && (
//                     <button
//                       onClick={() =>
//                         setExpandedCard(isExpanded ? null : project._id)
//                       }
//                       className="text-blue-600 font-medium mt-2 hover:underline"
//                     >
//                       {isExpanded ? "Show Less" : "Show More"}
//                     </button>
//                   )}


//                   {/* Technologies */}
//                   <div className="flex flex-wrap gap-2 mt-5 mb-5">
//                     {(typeof project.technologies === "string"
//                       ? JSON.parse(project.technologies)
//                       : project.technologies || []
//                     ).map((tech, index) => (
//                       <span
//                         key={index}
//                         className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Links */}
//                   <div className="flex gap-4 mb-5">
//                     {project.github && (
//                       <a
//                         href={project.github}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 font-medium hover:underline"
//                       >
//                         GitHub
//                       </a>
//                     )}

//                     {project.liveDemo && (
//                       <a
//                         href={project.liveDemo}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-green-600 font-medium hover:underline"
//                       >
//                         Demo
//                       </a>
//                     )}
//                   </div>

//                   {/* Buttons */}
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => navigate(`/update-project/${project._id}`)}
//                       className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
//                     >
//                       Update
//                     </button>

//                     <button
//                       onClick={() => handleDelete(project._id)}
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "sonner";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await API.get("/api/projects");

      const projectData = Array.isArray(res.data)
        ? res.data
        : res.data.projects || [];

      setProjects(projectData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch projects ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/project/delete/${id}`);

      toast.success("Project deleted successfully ✅");

      setProjects((prev) =>
        prev.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error(error);
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Project List
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all your projects here.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500 text-xl">
          No projects found 🚀
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-lg">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left">
                  Image
                </th>

                <th className="px-6 py-4 text-left">
                  Project
                </th>

                <th className="px-6 py-4 text-left">
                  Technologies
                </th>

                <th className="px-6 py-4 text-left">
                  Links
                </th>

                <th className="px-6 py-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => {
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

                return (
                  <tr
                    key={project._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Image */}
                    <td className="px-6 py-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-32 h-20 object-cover rounded-xl shadow"
                      />
                    </td>

                    {/* Project Details */}
                    <td className="px-6 py-4 max-w-sm">
                      <h2 className="font-bold text-lg text-gray-900">
                        {project.title}
                      </h2>

                      <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                        {project.description}
                      </p>
                    </td>

                    {/* Technologies */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-3 max-w-xs">
  {technologies.map((tech, index) => (
    <span
      key={index}
      className="
        px-5 py-2
        rounded-2xl
        text-white
        text-sm
        font-medium
        bg-gradient-to-b
        from-zinc-800
        to-zinc-950
        border
        border-zinc-700
        shadow-lg
      "
    >
      {tech}
    </span>
  ))}
</div>
                    </td>

                    {/* Links */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            GitHub
                          </a>
                        )}

                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-600 hover:underline"
                          >
                            Demo
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col md:flex-row gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/update-project/${project._id}`
                            )
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                        >
                          Update
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              project._id
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectList;