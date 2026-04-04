package com.example.Portfolio.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.Portfolio.model.Project;
import com.example.Portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final Cloudinary cloudinary; // 🔥 IMPORTANT

    public ProjectService(ProjectRepository projectRepository, Cloudinary cloudinary) {
        this.projectRepository = projectRepository;
        this.cloudinary = cloudinary;
    }

    // 🔥 CREATE WITH IMAGE
    public String createProjectWithImage(
            MultipartFile file,
            String title,
            String description,
            String demo,
            String github,
            String techStack
    ) {
        try {
            // 🔥 Upload image to Cloudinary
            Map uploadResult = cloudinary.uploader()
                    .upload(file.getBytes(), ObjectUtils.emptyMap());

            String imageUrl = uploadResult.get("url").toString();

            // 💾 Save to DB
            Project project = new Project();
            project.setTitle(title);
            project.setDescription(description);
            project.setDemo(demo);
            project.setGithub(github);
            project.setImage(imageUrl);
            project.setTechStack(techStack);

            projectRepository.save(project);

            return "Project Created Successfully with Image!";
        } catch (Exception e) {
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }

    // ✅ GET ALL
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // ✅ UPDATE
    public Project updateProject(Long id, Project updatedProject) {

        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        existing.setTitle(updatedProject.getTitle());
        existing.setDescription(updatedProject.getDescription());
        existing.setDemo(updatedProject.getDemo());
        existing.setGithub(updatedProject.getGithub());
        existing.setImage(updatedProject.getImage());
        existing.setTechStack(updatedProject.getTechStack());

        return projectRepository.save(existing);
    }

    // ✅ DELETE
    public String deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found");
        }

        projectRepository.deleteById(id);
        return "Project Deleted Successfully!";
    }
}