/**
 * Types representing the JSON Resume schema (https://jsonresume.org/schema/)
 */

/**
 * Represents a resume
 */
export interface Resume {
  basics: {
    name: string;
    label: string;
    summary: string;
    location: {
      city: string;
      countryCode: string;
    };
  };
  work: {
    name: string;
    position: string;
    url: string;
    startDate: Date;
    endDate?: Date;
    summary: string;
    highlights: string[];
  }[];
}
