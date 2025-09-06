import { Link } from "@/components/ui/link";
import { List, ListItem } from "@/components/ui/list";
import { Typography } from "@/components/ui/typography";
import { allProjects } from "content-collections";

export default function ProjectsPage() {
  return (
    <main>
      <Typography variant="h1">Projects</Typography>

      <List>
        {allProjects.map((project) => (
          <ListItem key={project.slug}>
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          </ListItem>
        ))}
      </List>
    </main>
  );
}
