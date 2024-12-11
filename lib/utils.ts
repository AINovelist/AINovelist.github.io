import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const livingPlaces = ["City", "Suburb", "Countryside", "Coastal Area", "Mountain Region"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDetails(content: string | undefined) {
  if (!content) {
    return [];
  }

  const regex = /# \s*([^\-]+)-(\d+)-in-([^\-]+)-\d+/g;
  const matches = [...content.matchAll(regex)];

  return matches.map((match) => {
    const name = match[1];
    const age = match[2];
    const livingPlace = match[3];
    console.log(match);
    // const [name, age] = nameAndAge.split('-');
    return {
      name,
      age: parseInt(age),
      livingPlace,
    };
  });
}

export function extractDateFromContent(content: string | undefined): string | null {
  if (!content) {
    return null;
  }
  const dateRegex = /Created on: (\d{4}-\d{2}-\d{2})/;
  const match = content.match(dateRegex);
  return match ? match[1] : null;
}