import type { Resume } from "./types/resume";

const resume: Resume = {
  basics: {
    name: "James T. Kirk",
    label: "Starfleet Captain",
    summary:
      "Seasoned starship captain with experience leading exploratory and diplomatic missions across the galaxy. Skilled in command decision-making, crew leadership, and crisis management.",
    location: {
      city: "San Francisco",
      countryCode: "US",
    },
  },
  work: [
    {
      name: "USS Enterprise (NCC-1701-C)",
      position: "Captain",
      url: "https://startrek.com/",
      startDate: new Date("2271-01-01"),
      endDate: undefined,
      summary:
        "Commanded the USS Enterprise on deep-space exploratory missions, protecting Federation interests and establishing first contact with numerous species.",
      highlights: [
        "Led successful rescue and diplomatic missions under hostile conditions",
        "Negotiated peace terms with multiple alien civilizations",
        "Implemented rapid tactical adjustments during unexpected combat encounters",
      ],
    },
    {
      name: "Starfleet Academy",
      position: "Instructor (Visiting)",
      url: "https://startrek.com/",
      startDate: new Date("2285-09-01"),
      endDate: new Date("2286-06-30"),
      summary:
        "Provided leadership seminars and tactical training to cadets, sharing real-world command experience and decision-making frameworks.",
      highlights: [
        "Developed scenario-based leadership exercises",
        "Mentored cadets who went on to serve on frontier assignments",
      ],
    },
  ],
};

export default resume;
