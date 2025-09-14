import resume from "@/resume";
import { Typography } from "@/components/ui/typography";

export default function LandingPage() {
  return (
    <main className="max-w-3xl mx-auto">
      <div className="my-8">
        <h1 className="text-4xl p-1">{resume.basics.name}</h1>
        <h2 className="text-2xl p-1 text-muted-foreground">
          {resume.basics.summary}
        </h2>
      </div>
    </main>
  );
}
