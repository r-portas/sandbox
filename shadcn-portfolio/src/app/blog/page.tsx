import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faker } from "@faker-js/faker";

export default function Blog() {
  // Generate fake data
  const title = faker.lorem.sentence();
  const description = faker.lorem.paragraph();
  const authorName = faker.person.fullName();
  const authorImage = faker.image.avatar();
  const pubDate = faker.date.past();
  const image = faker.image.urlPicsumPhotos({ width: 800, height: 400 });
  // Format date
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="max-w-3xl text-pretty text-5xl font-semibold md:text-6xl">
            {title}
          </h1>
          <h3 className="text-muted-foreground max-w-3xl text-lg md:text-xl">
            {description}
          </h3>
          <div className="flex items-center gap-3 text-sm md:text-base">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={authorImage} />
              <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>
              <a href="#" className="font-semibold">
                {authorName}
              </a>
              <span className="ml-1">on {formatDate(pubDate)}</span>
            </span>
          </div>
          <Image
            src={image}
            alt="Blog cover"
            className="mb-8 mt-4 aspect-video w-full rounded-lg border object-cover"
            width={800}
            height={400}
          />
        </div>
      </div>
      <div className="container">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold">{faker.lorem.sentence()}</h2>
          <p className="text-muted-foreground mt-2 text-lg">
            {faker.lorem.paragraph()}
          </p>
          <h2>{faker.lorem.words({ min: 2, max: 5 })}</h2>
          <p>{faker.lorem.paragraph()}</p>
          <h2>{faker.lorem.words({ min: 2, max: 5 })}</h2>
          <p>{faker.lorem.paragraph()}</p>
          <div>
            <table>
              <thead>
                <tr>
                  <th>{faker.word.noun()}</th>
                  <th>{faker.word.noun()}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{faker.word.adjective()}</td>
                  <td>{faker.word.adjective()}</td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <td>{faker.word.adjective()}</td>
                  <td>{faker.word.adjective()}</td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <td>{faker.word.adjective()}</td>
                  <td>{faker.word.adjective()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>{faker.lorem.paragraph()}</p>
          <h2>{faker.lorem.words({ min: 2, max: 5 })}</h2>
          <Image
            src={faker.image.urlPicsumPhotos({ width: 800, height: 400 })}
            alt="Blog section"
            className="my-8 aspect-video w-full rounded-md object-cover"
            width={800}
            height={400}
          />
          <p>
            {faker.lorem.sentence()}{" "}
            <a href="#">{faker.lorem.words({ min: 2, max: 4 })}</a>:{" "}
            {faker.lorem.sentence()}
          </p>
          <blockquote>&ldquo;{faker.lorem.sentence()}&rdquo;</blockquote>
          <p>{faker.lorem.paragraph()}</p>
          <ul>
            <li>{faker.lorem.words({ min: 3, max: 6 })}</li>
            <li>{faker.lorem.words({ min: 3, max: 6 })}</li>
            <li>{faker.lorem.words({ min: 3, max: 6 })}</li>
          </ul>
          <p>{faker.lorem.paragraph()}</p>
        </div>
      </div>
    </section>
  );
}
