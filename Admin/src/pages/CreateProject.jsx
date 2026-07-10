import { useState } from "react";
import API from "../services/api";
import { toast } from "sonner";

const CreateProject = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    github: "",
    liveDemo: "",
    technologies: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image ❌");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", project.title);
      formData.append(
        "description",
        project.description
      );
      formData.append("github", project.github);
      formData.append(
        "liveDemo",
        project.liveDemo
      );

      // Convert technologies into array
      project.technologies
        .split(",")
        .map((tech) => tech.trim())
        .forEach((tech) => {
          formData.append(
            "technologies",
            tech
          );
        });

      formData.append("image", image);

      await API.post(
        "/api/create-project",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Project created successfully ✅"
      );

      setProject({
        title: "",
        description: "",
        github: "",
        liveDemo: "",
        technologies: "",
      });

      setImage(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create project ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-2">
          Create Project
        </h1>

        <p className="text-gray-500 mb-8">
          Add a new portfolio project.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Project Title
            </label>

            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              placeholder="E-Commerce Website"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your project..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Technologies
            </label>

            <input
              type="text"
              name="technologies"
              value={project.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                GitHub URL
              </label>

              <input
                type="url"
                name="github"
                value={project.github}
                onChange={handleChange}
                placeholder="https://github.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Live Demo URL
              </label>

              <input
                type="url"
                name="liveDemo"
                value={project.liveDemo}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target.files[0]
                )
              }
              className="w-full border border-gray-300 rounded-xl p-3"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading
              ? "Creating..."
              : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;