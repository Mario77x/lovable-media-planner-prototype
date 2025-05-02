
import { GermanRegion } from '@/types';

// Define region boundaries for Germany's states
export const REGION_COORDINATES: Record<GermanRegion, [number, number]> = {
  'baden-wurttemberg': [9.1, 48.5],
  'bavaria': [11.5, 48.7],
  'berlin': [13.4, 52.5],
  'brandenburg': [13.4, 52.0],
  'bremen': [8.8, 53.1],
  'hamburg': [10.0, 53.6],
  'hesse': [8.7, 50.6],
  'lower saxony': [9.0, 52.6],
  'mecklenburg-vorpommern': [12.5, 53.9],
  'north rhine-westphalia': [7.5, 51.5],
  'rhineland-palatinate': [7.3, 49.8],
  'saarland': [7.0, 49.4],
  'saxony': [13.7, 51.1],
  'saxony-anhalt': [11.9, 51.9],
  'schleswig-holstein': [9.8, 54.2],
  'thuringia': [11.0, 50.9]
};

export const MAP_DEFAULT_CENTER: [number, number] = [10.4515, 51.1657]; // Germany's center
export const MAP_DEFAULT_ZOOM = 5;
