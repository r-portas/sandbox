import { faker } from "@faker-js/faker";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TimelineEntry = {
  date: string;
  title: string;
  content: string;
};

const timelineData: TimelineEntry[] = Array.from({ length: 6 }).map(() => ({
  date: faker.date.past({ years: 70 }).getFullYear().toString(),
  title: faker.lorem.words({ min: 3, max: 6 }),
  content: faker.lorem.paragraphs({ min: 1, max: 2 }, "\n"),
}));

export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-32">
      <h1 className="text-foreground mb-10 text-center text-3xl font-bold tracking-tighter sm:text-6xl">
        The History of Artificial Intelligence
      </h1>
      <div className="relative mx-auto max-w-4xl">
        <Separator
          orientation="vertical"
          className="bg-muted absolute left-2 top-4"
        />
        {timelineData.map((entry, index) => (
          <div key={index} className="relative mb-10 pl-8">
            <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
            <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
              {entry.title}
            </h4>

            <h5 className="text-md -left-34 text-muted-foreground top-3 rounded-xl tracking-tight xl:absolute">
              {entry.date}
            </h5>

            <p
              className="prose dark:prose-invert text-foreground my-5"
              dangerouslySetInnerHTML={{ __html: entry.content }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
