import resume from "@/resume";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm uppercase tracking-wide text-gray-700 mb-1">
      {children}
    </h3>
  );
}

function formatDate(d?: Date) {
  if (!d) return "Present";
  if (d instanceof Date)
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  return String(d);
}

export default function ResumePage() {
  const { basics, work } = resume;

  return (
    <body>
      <main className="print:font-sans text-black bg-white p-6 w-full max-w-3xl mx-auto">
        <header className="mb-4 border-b pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{basics.name}</h1>
              <div className="text-sm text-gray-700">{basics.label}</div>
            </div>
            <div className="text-sm text-right">
              <div>
                {basics.location.city}, {basics.location.countryCode}
              </div>
            </div>
          </div>
        </header>

        <section className="mb-4">
          <SectionTitle>Summary</SectionTitle>
          <div className="text-sm text-gray-800">{basics.summary}</div>
        </section>
        {work.length > 0 && (
          <section className="mb-4">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-3">
              {work.map((workEntry, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{workEntry.position}</div>
                      <div className="text-sm text-gray-700">
                        {workEntry.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">
                      {formatDate(workEntry.startDate)} —{" "}
                      {workEntry.endDate
                        ? formatDate(workEntry.endDate)
                        : "Present"}
                    </div>
                  </div>
                  {workEntry.summary && (
                    <div className="text-sm text-gray-800 mt-1">
                      {workEntry.summary}
                    </div>
                  )}
                  {workEntry.highlights && (
                    <ul className="list-disc ml-5 text-sm text-gray-800 mt-1">
                      {workEntry.highlights.map(
                        (highlight: string, idx: number) => (
                          <li key={idx}>{highlight}</li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </body>
  );
}
