import { Typography } from "@/components/ui/typography";
import { allProjects } from "content-collections";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) {
    return notFound();
  }

  return (
    <main>
      <Typography variant="h1">{project.title}</Typography>
      <Typography variant="muted">
        Last updated {project.lastModified}
      </Typography>

      <div dangerouslySetInnerHTML={{ __html: project.html }} />
    </main>
  );
}
