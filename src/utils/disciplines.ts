import type { Discipline } from '../types/database';

export interface DisciplineInfo {
  id: Discipline;
  name: string;
  path: string;
  description: string;
}

export const disciplines: DisciplineInfo[] = [
  {
    id: 'climate_science',
    name: 'Climate Science',
    path: '/climate-science',
    description: 'Scientific study of climate and climate change',
  },
  {
    id: 'medicine',
    name: 'Medicine',
    path: '/medicine',
    description: 'Medical science and healthcare research',
  },
  {
    id: 'cosmology',
    name: 'Cosmology',
    path: '/cosmology',
    description: 'Study of the origin and evolution of the universe',
  },
  {
    id: 'biology',
    name: 'Biology',
    path: '/biology',
    description: 'Study of living organisms and life processes',
  },
  {
    id: 'physics',
    name: 'Physics',
    path: '/physics',
    description: 'Study of matter, energy, and fundamental forces',
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    path: '/mathematics',
    description: 'Study of numbers, quantities, and structures',
  },
  {
    id: 'geology',
    name: 'Geology',
    path: '/geology',
    description: 'Study of Earth and its physical structure',
  },
];

export function getDisciplineById(id: Discipline): DisciplineInfo | undefined {
  return disciplines.find((d) => d.id === id);
}

export function getDisciplineByPath(path: string): DisciplineInfo | undefined {
  return disciplines.find((d) => d.path === path);
}
