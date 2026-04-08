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
  { title: '山城初识', story: '从城市地标和街区烟火切入，先建立你与这座城的第一层连接。' },
  { title: '老街与人文', story: '把脚步放慢一点，在街巷和文化体验里读懂重庆的日常。' },
  { title: '江景收束', story: '以夜色与在地美食收尾，把旅程记忆留在最有氛围的片段里。' },
  { title: '松弛探索', story: '围绕你最喜欢的偏好做延展，保留节奏，不追求赶场。' },
  { title: '城市回味', story: '回到最契合你风格的区域，完成一趟自然不仓促的收官。' },
];

const slotRules: Record<string, Array<'attraction' | 'food' | 'culture'>> = {
  上午: ['attraction', 'culture'],
  中午: ['food'],
  下午: ['attraction', 'culture'],
  晚上: ['culture', 'food', 'attraction'],
};

function score(item: Omit<RecommendationItem, 'selected'>, pref: UserPreference): number {
  let s = 0;
  if (pref.interests.some((interest) => item.tags.includes(interest))) s += 3;
  if (pref.travelStyle === 'foodie' && item.type === 'food') s += 4;
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
  const ranked = [...cityData].sort((a, b) => score(b, pref) - score(a, pref) + (a.id > b.id ? 1 : -1) * (seed % 3));

  const attractions = ranked.filter((i) => i.type === 'attraction').slice(0, 8);
  const foods = ranked.filter((i) => i.type === 'food').slice(0, 6);
  const cultures = ranked.filter((i) => i.type === 'culture').slice(0, 4);

  return [...attractions, ...foods, ...cultures].map((item) => ({ ...item, selected: false }));
}

function pickUnique(pool: RecommendationItem[], used: Set<string>, fallback: RecommendationItem[]): RecommendationItem {
  const found = pool.find((item) => !used.has(item.id));
  if (found) return found;
  const backup = fallback.find((item) => !used.has(item.id));
  return backup ?? fallback[0];
}

function itemForSlot(slot: string, selected: RecommendationItem[], used: Set<string>, pref: UserPreference): RecommendationItem {
  const preferred = slotRules[slot]
    .flatMap((type) => selected.filter((item) => item.type === type))
    .filter((item) => !(slot === '晚上' && pref.staminaLevel === 'light' && item.estimatedDuration.includes('3')));

  return pickUnique(preferred, used, selected);
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
    estimatedCost: item.estimatedCost,
    transportTip: `建议优先使用${pref.transportPreferences[0] ?? '地铁'}，同一区域串联减少折返。`,
    replaceable: true,
  };
}

function buildDayItems(selected: RecommendationItem[], pref: UserPreference): ItineraryItem[] {
  const usedIds = new Set<string>();
  const slotPlan = pref.staminaLevel === 'high' ? ['上午', '中午', '下午', '晚上'] : ['上午', '中午', '晚上'];
  if (pref.staminaLevel !== 'light' && pref.travelStyle !== 'relaxed') slotPlan.splice(2, 0, '下午');

  const items: ItineraryItem[] = [];
  const maxItems = pref.staminaLevel === 'high' ? 4 : 3;

  slotPlan.slice(0, maxItems).forEach((slot) => {
    const picked = itemForSlot(slot, selected, usedIds, pref);
    if (!picked || usedIds.has(picked.id)) return;
    usedIds.add(picked.id);
    items.push(toItineraryItem(picked, slot, pref));
  });

  // 补位：选中内容不足时自动补相似项，避免重复感
  if (items.length < 3) {
    const fallback = generateRecommendations(pref).filter((item) => !usedIds.has(item.id));
    while (items.length < 3 && fallback.length) {
      const next = fallback.shift();
      if (!next) break;
      if (items.some((it) => it.type === 'food' && next.type === 'food')) continue;
      usedIds.add(next.id);
      const slot = ['上午', '中午', '下午', '晚上'][items.length];
      items.push(toItineraryItem(next, slot, pref));
    }
  }

  return items.slice(0, 4);
}

export function generateItineraryPlan(pref: UserPreference, selectedItems: RecommendationItem[]): ItineraryPlan {
  const usable = selectedItems.length >= 2 ? selectedItems : generateRecommendations(pref).slice(0, 7);
  const days: ItineraryDay[] = Array.from({ length: pref.duration }).map((_, idx) => ({
    dayNumber: idx + 1,
    title: `Day ${idx + 1} · ${dayThemes[idx % dayThemes.length].title}`,
    story: dayThemes[idx % dayThemes.length].story,
    items: buildDayItems(usable, pref),
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
          title: `Day ${dayNumber} · ${dayThemes[(dayNumber + 1) % dayThemes.length].title}`,
          story: dayThemes[(dayNumber + 1) % dayThemes.length].story,
          items: buildDayItems(plan.selectedItems, plan.preference),
        }
      : day,
  );

  return { ...plan, days: nextDays };
}
