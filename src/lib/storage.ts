import type { Itinerary } from '@/types';

const STORAGE_KEY = 'lingxi-itineraries';

export function saveItinerary(itinerary: Itinerary): void {
  try {
    const existing = getSavedItineraries();
    const updated = [itinerary, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save itinerary:', error);
  }
}

export function getSavedItineraries(): Itinerary[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get itineraries:', error);
    return [];
  }
}

export function deleteItinerary(id: string): void {
  try {
    const existing = getSavedItineraries();
    const updated = existing.filter(it => it.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to delete itinerary:', error);
  }
}

export function getItineraryById(id: string): Itinerary | null {
  try {
    const existing = getSavedItineraries();
    return existing.find(it => it.id === id) || null;
  } catch (error) {
    console.error('Failed to get itinerary:', error);
    return null;
  }
}

export function clearAllItineraries(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear itineraries:', error);
  }
}
