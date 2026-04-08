export type BudgetLevel = 'low' | 'medium' | 'high';
export type TravelStyle = 'relaxed' | 'cultural' | 'efficient' | 'foodie' | 'atmosphere';
export type StaminaLevel = 'light' | 'medium' | 'high';

export type UserPreference = {
  destination: string;
  duration: number;
  budgetLevel: BudgetLevel;
  interests: string[];
  travelStyle: TravelStyle;
  staminaLevel: StaminaLevel;
  transportPreferences: string[];
  companionCount: string;
  startDate?: string;
  departureCity?: string;
  acceptHotspot?: boolean;
  preferHiddenRoute?: boolean;
};

export type RecommendationItem = {
  id: string;
  name: string;
  type: 'attraction' | 'food' | 'culture';
  category: string;
  shortDescription: string;
  reason: string;
  estimatedDuration: string;
  estimatedCost: string;
  tags: string[];
  popularity: 'hot' | 'hidden';
  selected: boolean;
};

export type ItineraryItem = {
  id: string;
  timeSlot: string;
  name: string;
  type: 'attraction' | 'food' | 'culture' | 'transport';
  description: string;
  reason: string;
  estimatedDuration: string;
  estimatedCost: string;
  transportTip?: string;
  replaceable?: boolean;
};

export type ItineraryDay = {
  dayNumber: number;
  title: string;
  story: string;
  items: ItineraryItem[];
};

export type ItineraryPlan = {
  id: string;
  destination: string;
  duration: number;
  budgetLevel: BudgetLevel;
  createdAt: string;
  preference: UserPreference;
  selectedItems: RecommendationItem[];
  days: ItineraryDay[];
};
