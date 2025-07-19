import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Home() {
  const name = faker.person.fullName();
  const avatar = faker.image.avatar();
  const bio = faker.lorem.paragraph();
  const location = faker.location.city();
  const email = faker.internet.email();
  const githubUsername = faker.internet.username();
  const jobTitle = faker.person.jobTitle();
  const skills = Array.from({ length: 8 }, () => faker.hacker.noun());
  const projects = Array.from({ length: 4 }, () => ({
    name: faker.lorem.words({ min: 2, max: 4 }),
    description: faker.lorem.sentence(),
    url: faker.internet.url(),
    tech: Array.from({ length: 3 }, () => faker.hacker.abbreviation()),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <Avatar className="h-32 w-32 border-4 border-primary/20">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-2xl">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              {jobTitle}
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>

          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {bio}
          </p>

          <div className="flex gap-4">
            <Button size="lg" asChild>
              <a href={`mailto:${email}`} className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {projects.map((project, idx) => (
              <Card
                key={idx}
                className="group hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIdx) => (
                      <Badge
                        key={techIdx}
                        variant="outline"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
