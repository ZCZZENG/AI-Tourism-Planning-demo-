import type { ItineraryDay, ItineraryItem, ItineraryPlan, RecommendationItem, UserPreference } from '@/types';

const catalog: Record<string, Omit<RecommendationItem, 'selected'>[]> = {
  重庆: [
    { id: 'cq-a1', name: '洪崖洞', type: 'attraction', category: '山城地标', shortDescription: '吊脚楼夜景与江边灯火。', reason: '适合夜生活与打卡拍照偏好。', estimatedDuration: '2小时', estimatedCost: '¥0-50', tags: ['夜景', '拍照'], popularity: 'hot' },
    { id: 'cq-a2', name: '磁器口古镇', type: 'attraction', category: '历史街区', shortDescription: '老街与巴渝烟火气。', reason: '文化深度与城市漫步都很匹配。', estimatedDuration: '2-3小时', estimatedCost: '¥0', tags: ['历史文化'], popularity: 'hot' },
    { id: 'cq-a3', name: '山城步道', type: 'attraction', category: '城市漫步', shortDescription: '上上下下感受立体重庆。', reason: '高匹配城市漫步和氛围感体验。', estimatedDuration: '2小时', estimatedCost: '¥0', tags: ['城市漫步'], popularity: 'hidden' },
    { id: 'cq-a4', name: '李子坝观景平台', type: 'attraction', category: '网红打卡', shortDescription: '看轻轨穿楼奇观。', reason: '高效打卡路线的高优先项。', estimatedDuration: '1小时', estimatedCost: '¥0', tags: ['拍照'], popularity: 'hot' },
    { id: 'cq-a5', name: '南山一棵树', type: 'attraction', category: '自然风景', shortDescription: '俯瞰两江夜色。', reason: '夜生活与自然风景偏好兼容。', estimatedDuration: '1.5小时', estimatedCost: '¥30', tags: ['夜景', '自然风景'], popularity: 'hot' },
    { id: 'cq-a6', name: '鹅岭二厂', type: 'attraction', category: '文创园区', shortDescription: '老厂房改造的艺术空间。', reason: '适合艺术展览/小众体验用户。', estimatedDuration: '2小时', estimatedCost: '¥0-40', tags: ['艺术展览', '小众体验'], popularity: 'hidden' },
    { id: 'cq-f1', name: '重庆小面', type: 'food', category: '本地早餐', shortDescription: '麻辣鲜香，开场即入戏。', reason: '预算友好且地道。', estimatedDuration: '45分钟', estimatedCost: '¥15-30', tags: ['美食'], popularity: 'hot' },
    { id: 'cq-f2', name: '洞子火锅', type: 'food', category: '川渝火锅', shortDescription: '山城代表性餐饮体验。', reason: '美食优先和氛围感风格都推荐。', estimatedDuration: '1.5小时', estimatedCost: '¥90-160', tags: ['美食', '夜生活'], popularity: 'hot' },
    { id: 'cq-f3', name: '江湖菜馆', type: 'food', category: '地方菜', shortDescription: '麻辣鲜香的重口体验。', reason: '适合团体和高效补能。', estimatedDuration: '1小时', estimatedCost: '¥70-120', tags: ['美食'], popularity: 'hidden' },
    { id: 'cq-f4', name: '山城老茶馆', type: 'food', category: '茶点', shortDescription: '坐下来感受在地节奏。', reason: '轻松悠闲路线必备。', estimatedDuration: '1小时', estimatedCost: '¥30-60', tags: ['氛围感体验'], popularity: 'hidden' },
    { id: 'cq-c1', name: '川剧变脸体验', type: 'culture', category: '非遗演出', shortDescription: '近距离看川剧绝活。', reason: '文化深度用户的高价值项目。', estimatedDuration: '1小时', estimatedCost: '¥80-180', tags: ['历史文化'], popularity: 'hot' },
    { id: 'cq-c2', name: '十八梯老街讲解', type: 'culture', category: '城市故事', shortDescription: '听重庆地形与码头文化。', reason: '提升城市理解度。', estimatedDuration: '1.5小时', estimatedCost: '¥40-80', tags: ['历史文化', '城市漫步'], popularity: 'hidden' },
    { id: 'cq-c3', name: '长江夜游', type: 'culture', category: '江景体验', shortDescription: '从江面理解山城轮廓。', reason: '氛围感与打卡都强。', estimatedDuration: '1小时', estimatedCost: '¥80-120', tags: ['夜生活'], popularity: 'hot' },
  ],
};

const dayThemes = [
  { title: '城市初见', story: '先从地标和街区切入，快速建立对城市气质的第一印象。' },
  { title: '文化深潜', story: '把节奏放慢，在历史脉络与本地生活里理解这座城。' },
  { title: '在地回味', story: '用美食和夜色收尾，把这趟旅程变成可回想的片段。' },
  { title: '自由探索', story: '保留灵活时间，把偏好里的重点体验再做加深。' },
  { title: '轻松收官', story: '减少奔波，回到最喜欢的区域，完成一趟有余韵的旅程。' },
];

const costByBudget = {
  low: ['¥0-30', '¥30-80'],
  medium: ['¥30-100', '¥80-180'],
  high: ['¥100-220', '¥180-350'],
};

function score(item: Omit<RecommendationItem, 'selected'>, pref: UserPreference): number {
  let s = 0;
  if (pref.interests.some((i) => item.tags.includes(i))) s += 3;
  if (pref.travelStyle === 'foodie' && item.type === 'food') s += 3;
  if (pref.travelStyle === 'cultural' && item.type === 'culture') s += 3;
  if (pref.travelStyle === 'efficient' && item.popularity === 'hot') s += 2;
  if (pref.travelStyle === 'relaxed' && item.popularity === 'hidden') s += 1;
  if (pref.preferHiddenRoute && item.popularity === 'hidden') s += 2;
  if (pref.acceptHotspot && item.popularity === 'hot') s += 1;
  if (pref.staminaLevel === 'light' && item.estimatedDuration.includes('3')) s -= 1;
  return s;
}

export function generateRecommendations(pref: UserPreference, seed = 0): RecommendationItem[] {
  const cityData = catalog[pref.destination] ?? catalog.重庆;
  const ranked = [...cityData].sort((a, b) => score(b, pref) - score(a, pref) + ((a.id > b.id ? 1 : -1) * (seed % 3)));

  const attractions = ranked.filter((i) => i.type === 'attraction').slice(0, 8);
  const foods = ranked.filter((i) => i.type === 'food').slice(0, 6);
  const cultures = ranked.filter((i) => i.type === 'culture').slice(0, 4);

  return [...attractions, ...foods, ...cultures].map((i) => ({ ...i, selected: false }));
}

function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length];
}

function buildDayItems(day: number, selected: RecommendationItem[], pref: UserPreference): ItineraryItem[] {
  const attractions = selected.filter((i) => i.type === 'attraction');
  const foods = selected.filter((i) => i.type === 'food');
  const cultures = selected.filter((i) => i.type === 'culture');
  const maxCore = pref.staminaLevel === 'light' ? 4 : pref.travelStyle === 'efficient' ? 5 : 4;

  const slots = ['上午', '中午', '下午', '晚上'];
  const items: ItineraryItem[] = [];

  const morning = pick(attractions.length ? attractions : selected, day - 1);
  items.push(toItineraryItem(morning, slots[0], pref));

  if (foods.length) items.push(toItineraryItem(pick(foods, day - 1), slots[1], pref));

  const afternoonSource = day % 2 === 0 && cultures.length ? cultures : attractions;
  items.push(toItineraryItem(pick(afternoonSource.length ? afternoonSource : selected, day), slots[2], pref));

  if (foods.length > 1) {
    items.push(toItineraryItem(pick(foods, day), slots[3], pref));
  } else if (cultures.length) {
    items.push(toItineraryItem(pick(cultures, day + 1), slots[3], pref));
  }

  return items.slice(0, maxCore);
}

function toItineraryItem(item: RecommendationItem, timeSlot: string, pref: UserPreference): ItineraryItem {
  return {
    id: `${item.id}-${timeSlot}-${Math.random().toString(16).slice(2, 7)}`,
    timeSlot,
    name: item.name,
    type: item.type,
    description: item.shortDescription,
    reason: item.reason,
    estimatedDuration: item.estimatedDuration,
    estimatedCost: item.estimatedCost || pick(costByBudget[pref.budgetLevel], 0),
    transportTip: `建议优先使用${pref.transportPreferences[0] ?? '地铁'}，同一区域串联减少折返。`,
    replaceable: true,
  };
}

export function generateItineraryPlan(pref: UserPreference, selectedItems: RecommendationItem[]): ItineraryPlan {
  const usable = selectedItems.length >= 2 ? selectedItems : generateRecommendations(pref).slice(0, 6);
  const days: ItineraryDay[] = Array.from({ length: pref.duration }).map((_, i) => ({
    dayNumber: i + 1,
    title: `Day ${i + 1} · ${pick(dayThemes, i).title}`,
    story: pick(dayThemes, i).story,
    items: buildDayItems(i + 1, usable, pref),
  }));

  return {
    id: `plan_${Date.now()}`,
    destination: pref.destination,
    duration: pref.duration,
    budgetLevel: pref.budgetLevel,
    createdAt: new Date().toISOString(),
    preference: pref,
    selectedItems: usable,
    days,
  };
}

export function regenerateDay(plan: ItineraryPlan, dayNumber: number): ItineraryPlan {
  const nextDays = plan.days.map((day) =>
    day.dayNumber === dayNumber
      ? {
          ...day,
          title: `Day ${dayNumber} · ${pick(dayThemes, dayNumber + 1).title}`,
          story: pick(dayThemes, dayNumber + 1).story,
          items: buildDayItems(dayNumber + 1, plan.selectedItems, plan.preference),
        }
      : day,
  );

  return { ...plan, days: nextDays };
}
