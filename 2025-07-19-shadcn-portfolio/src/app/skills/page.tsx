import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Globe, Smartphone } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Globe className="h-6 w-6" />,
    description: "Building responsive and interactive user interfaces",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    icon: <Code className="h-6 w-6" />,
    description: "Creating robust server-side applications and APIs",
    skills: ["Node.js", "Python", "Express", "Fastify", "REST APIs", "GraphQL"],
  },
  {
    title: "Database",
    icon: <Database className="h-6 w-6" />,
    description: "Designing and managing data storage solutions",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Prisma",
      "Supabase",
      "Firebase",
    ],
  },
  {
    title: "Mobile",
    icon: <Smartphone className="h-6 w-6" />,
    description: "Developing cross-platform mobile applications",
    skills: ["React Native", "Expo", "Flutter", "iOS", "Android", "PWA"],
  },
];

export default function SkillsPage() {
  return (
    <section id="skills" className="container py-24 mx-auto">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {category.icon}
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
