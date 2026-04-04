package com.example.Portfolio.controller;

import com.example.Portfolio.model.Project;
import com.example.Portfolio.service.ProjectService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // 🔥 CREATE (Image + Data)
    @PostMapping(value = "/create", consumes = "multipart/form-data")
    public String createProject(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("demo") String demo,
            @RequestParam("github") String github,
            @RequestParam("techStack") String techStack
    ) {
        return projectService.createProjectWithImage(
                file, title, description, demo, github, techStack
        );
    }

    // ✅ GET ALL
    @GetMapping("/all-projects")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    // ✅ UPDATE
    @PutMapping("/update/{id}")
    public Project updateProject(@PathVariable Long id,
                                 @RequestBody Project project) {
        return projectService.updateProject(id, project);
    }

    // ✅ DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteProject(@PathVariable Long id) {
        return projectService.deleteProject(id);
    }
}

