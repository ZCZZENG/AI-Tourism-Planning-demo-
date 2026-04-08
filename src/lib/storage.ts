import type { ItineraryPlan } from '@/types';

const STORAGE_KEY = 'lingxi-demo-itineraries';

export function getSavedPlans(): ItineraryPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as ItineraryPlan[]) : [];
    return parsed.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  } catch {
    return [];
  }
}

export function savePlan(plan: ItineraryPlan): void {
  const existing = getSavedPlans();
  const deduped = existing.filter((item) => item.id !== plan.id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([plan, ...deduped]));
}

export function deletePlan(id: string): void {
  const existing = getSavedPlans().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}
