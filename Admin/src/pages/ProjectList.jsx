import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "sonner";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loader state

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("/all-projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/delete/${id}`);
      toast.success("Deleted successfully");
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/update/${editProject.id}`, editProject);
      toast.success("Updated successfully!!");
      setEditProject(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  return (
    <div className="ml-64 p-6">
      <h2 className="text-2xl font-bold mb-4">Project List</h2>

      {/* 🔥 LOADER */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* UPDATE FORM */}
          {editProject && (
            <div className="bg-white p-4 mb-6 rounded shadow">
              <h3 className="font-bold mb-2">Update Project</h3>

              <input
                type="text"
                value={editProject.title}
                onChange={(e) =>
                  setEditProject({ ...editProject, title: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />

              <input
                type="text"
                value={editProject.description}
                onChange={(e) =>
                  setEditProject({
                    ...editProject,
                    description: e.target.value,
                  })
                }
                className="border p-2 w-full mb-2"
              />

              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          )}

          {/* PROJECT LIST */}
          <div className="grid grid-cols-3 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-white p-4 rounded shadow">
                <img
                  src={proj.image}
                  alt="project"
                  className="h-40 w-full object-cover mb-2"
                />

                <h3 className="font-bold">{proj.title}</h3>
                <p className="text-sm text-gray-600">
                  {proj.description}
                </p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => setEditProject(proj)}
                    className="bg-yellow-500 px-3 py-1 rounded text-white"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="bg-red-600 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectList;