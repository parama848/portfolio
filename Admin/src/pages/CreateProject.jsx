import { useState } from "react";
import API from "../services/api";
import { toast } from "sonner";

const CreateProject = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    demo: "",
    github: "",
    techStack: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image ❌");
      return;
    }

    const formData = new FormData();
    formData.append("title", project.title);
    formData.append("description", project.description);
    formData.append("demo", project.demo);
    formData.append("github", project.github);
    formData.append("techStack", project.techStack);
    formData.append("file", image);

    try {
      setLoading(true);

      await API.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Project created successfully!!");

      // reset
      setProject({
        title: "",
        description: "",
        demo: "",
        github: "",
        techStack: "",
      });
      setImage(null);

    } catch (error) {
      console.error(error);
      toast.error("Failed to create project ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-64 p-6">
      <div className="max-w-lg bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={project.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="demo"
            placeholder="Demo URL"
            value={project.demo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            value={project.github}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack"
            value={project.techStack}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;