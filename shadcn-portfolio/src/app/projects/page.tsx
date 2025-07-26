import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with payment integration and admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://yourproject.com",
    image: "/project1.jpg",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates and team features.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com/yourusername/taskapp",
    liveUrl: "https://yourtaskapp.com",
    image: "/project2.jpg",
  },
  {
    title: "Weather Dashboard",
    description:
      "Beautiful weather dashboard with location-based forecasts and interactive maps.",
    technologies: ["Vue.js", "TypeScript", "Weather API", "Mapbox"],
    githubUrl: "https://github.com/yourusername/weather",
    liveUrl: "https://yourweather.com",
    image: "/project3.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <section id="projects" className="container py-24 px-2 mx-auto">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for
            creating digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                {/* Add project image here */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Project Screenshot
                </div>
              </div>

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
