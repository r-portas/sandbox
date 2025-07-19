import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const name = faker.person.fullName();
  const avatar = faker.image.avatar();
  const bio = faker.lorem.paragraph();
  const location = faker.location.city();
  const email = faker.internet.email();
  const skills = Array.from({ length: 5 }, () => faker.word.noun());
  const projects = Array.from({ length: 3 }, () => ({
    name: faker.lorem.words({ min: 2, max: 4 }),
    description: faker.lorem.sentence(),
    url: faker.internet.url(),
  }));

  return (
    <main className="flex flex-col items-center py-16">
      <Card className="w-full max-w-xl mb-8">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold">{name}</CardTitle>
          <div className="text-muted-foreground">{location}</div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center">{bio}</p>
          <div className="flex flex-col items-center gap-2">
            <div className="font-semibold">Skills:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill, idx) => (
                <Button key={idx} variant="outline" size="sm">
                  {skill}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button variant="default" size="sm" asChild>
              <a href={`mailto:${email}`}>Contact Me</a>
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {projects.map((project, idx) => (
                <Card key={idx} className="border-none shadow-none bg-muted/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {project.name}
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
