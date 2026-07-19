import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "sonner";

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    liveDemo: "",
    image: null,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/api/project/${id}`);

        const project = res.data.project || res.data;

        setFormData({
          title: project.title || "",
          description: project.description || "",
          technologies: Array.isArray(project.technologies)
            ? project.technologies.join(", ")
            : project.technologies || "",
          github: project.github || "",
          liveDemo: project.liveDemo || "",
          image: null,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load project ❌");
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedData = new FormData();

      updatedData.append("title", formData.title);
      updatedData.append(
        "description",
        formData.description
      );

      formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .forEach((tech) => {
          updatedData.append(
            "technologies",
            tech
          );
        });

      updatedData.append(
        "github",
        formData.github
      );

      updatedData.append(
        "liveDemo",
        formData.liveDemo
      );

      if (formData.image) {
        updatedData.append(
          "image",
          formData.image
        );
      }

      await API.patch(
        `/api/project/update/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Project updated successfully ✅"
      );

      navigate("/projects");
    } catch (error) {
      console.error(error);
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="ml-64 min-h-screen bg-gray-100 flex items-center justify-center p-10">
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-4xl font-bold mb-8">
        Update Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />

        {/* Description */}
        <textarea
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Technologies */}
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="React, Node, MongoDB"
          className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* GitHub URL */}
        <input
          type="text"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Live Demo URL */}
        <input
          type="text"
          name="liveDemo"
          value={formData.liveDemo}
          onChange={handleChange}
          placeholder="Live Demo URL"
          className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Upload New Image
          </label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="flex-1 py-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            {loading
              ? "Updating..."
              : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default UpdateProject;