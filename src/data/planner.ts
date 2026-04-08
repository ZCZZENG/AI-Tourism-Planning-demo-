import type {
  ItineraryDay,
  ItineraryItem,
  ItineraryPlan,
  RecommendationItem,
  UserPreference,
} from '@/types';

const catalog: Record<string, Omit<RecommendationItem, 'selected'>[]> = {
  重庆: [
    {
      id: 'cq-a1',
      name: '洪崖洞',
      type: 'attraction',
      category: '山城地标',
      shortDescription: '吊脚楼夜景与江边灯火。',
      reason: '适合夜生活与打卡拍照偏好。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0-50',
      tags: ['夜景', '拍照'],
      popularity: 'hot',
    },
    {
      id: 'cq-a2',
      name: '磁器口古镇',
      type: 'attraction',
      category: '历史街区',
      shortDescription: '老街与巴渝烟火气。',
      reason: '文化深度与城市漫步都很匹配。',
      estimatedDuration: '2-3小时',
      estimatedCost: '¥0',
      tags: ['历史文化'],
      popularity: 'hot',
    },
    {
      id: 'cq-a3',
      name: '山城步道',
      type: 'attraction',
      category: '城市漫步',
      shortDescription: '上上下下感受立体重庆。',
      reason: '高匹配城市漫步和氛围感体验。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0',
      tags: ['城市漫步'],
      popularity: 'hidden',
    },
    {
      id: 'cq-a4',
      name: '李子坝观景平台',
      type: 'attraction',
      category: '网红打卡',
      shortDescription: '看轻轨穿楼奇观。',
      reason: '高效打卡路线的高优先项。',
      estimatedDuration: '1小时',
      estimatedCost: '¥0',
      tags: ['拍照'],
      popularity: 'hot',
    },
    {
      id: 'cq-a5',
      name: '南山一棵树',
      type: 'attraction',
      category: '自然风景',
      shortDescription: '俯瞰两江夜色。',
      reason: '夜生活与自然风景偏好兼容。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥30',
      tags: ['夜景', '自然风景'],
      popularity: 'hot',
    },
    {
      id: 'cq-a6',
      name: '鹅岭二厂',
      type: 'attraction',
      category: '文创园区',
      shortDescription: '老厂房改造的艺术空间。',
      reason: '适合艺术展览/小众体验用户。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0-40',
      tags: ['艺术展览', '小众体验'],
      popularity: 'hidden',
    },

    {
      id: 'cq-f1',
      name: '重庆小面',
      type: 'food',
      category: '本地早餐',
      shortDescription: '麻辣鲜香，开场即入戏。',
      reason: '预算友好且地道。',
      estimatedDuration: '45分钟',
      estimatedCost: '¥15-30',
      tags: ['美食'],
      popularity: 'hot',
    },
    {
      id: 'cq-f2',
      name: '洞子火锅',
      type: 'food',
      category: '川渝火锅',
      shortDescription: '山城代表性餐饮体验。',
      reason: '美食优先和氛围感风格都推荐。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥90-160',
      tags: ['美食', '夜生活'],
      popularity: 'hot',
    },
    {
      id: 'cq-f3',
      name: '江湖菜馆',
      type: 'food',
      category: '地方菜',
      shortDescription: '麻辣鲜香的重口体验。',
      reason: '适合团体和高效补能。',
      estimatedDuration: '1小时',
      estimatedCost: '¥70-120',
      tags: ['美食'],
      popularity: 'hidden',
    },
    {
      id: 'cq-f4',
      name: '山城老茶馆',
      type: 'food',
      category: '茶点',
      shortDescription: '坐下来感受在地节奏。',
      reason: '轻松悠闲路线必备。',
      estimatedDuration: '1小时',
      estimatedCost: '¥30-60',
      tags: ['氛围感体验'],
      popularity: 'hidden',
    },

    {
      id: 'cq-c1',
      name: '川剧变脸体验',
      type: 'culture',
      category: '非遗演出',
      shortDescription: '近距离看川剧绝活。',
      reason: '文化深度用户的高价值项目。',
      estimatedDuration: '1小时',
      estimatedCost: '¥80-180',
      tags: ['历史文化'],
      popularity: 'hot',
    },
    {
      id: 'cq-c2',
      name: '十八梯老街讲解',
      type: 'culture',
      category: '城市故事',
      shortDescription: '听重庆地形与码头文化。',
      reason: '提升城市理解度。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥40-80',
      tags: ['历史文化', '城市漫步'],
      popularity: 'hidden',
    },
    {
      id: 'cq-c3',
      name: '长江夜游',
      type: 'culture',
      category: '江景体验',
      shortDescription: '从江面理解山城轮廓。',
      reason: '氛围感与打卡都强。',
      estimatedDuration: '1小时',
      estimatedCost: '¥80-120',
      tags: ['夜生活'],
      popularity: 'hot',
    },
  ],
};

const dayThemes = [
  {
    title: '山城初识',
    story: '从城市地标和街区烟火切入，先建立你与这座城的第一层连接。',
  },
  {
    title: '老街与人文',
    story: '把脚步放慢一点，在街巷和文化体验里读懂重庆的日常。',
  },
  {
    title: '江景收束',
    story: '以夜色与在地美食收尾，把旅程记忆留在最有氛围的片段里。',
  },
  {
    title: '松弛探索',
    story: '围绕你最喜欢的偏好做延展，保留节奏，不追求赶场。',
  },
  {
    title: '城市回味',
    story: '回到最契合你风格的区域，完成一趟自然不仓促的收官。',
  },
];

const slotRules: Record<string, Array<'attraction' | 'food' | 'culture'>> = {
  上午: ['attraction', 'culture'],
  中午: ['food'],
  下午: ['culture', 'attraction'],
  晚上: ['culture', 'attraction', 'food'],
};

function score(item: Omit<RecommendationItem, 'selected'>, pref: UserPreference): number {
  let s = 0;

  if (pref.interests.some((interest) => item.tags.includes(interest))) s += 3;
  if (pref.travelStyle === 'foodie' && item.type === 'food') s += 4;
  if (pref.travelStyle === 'cultural' && item.type === 'culture') s += 3;
  if (pref.travelStyle === 'efficient' && item.popularity === 'hot') s += 2;
  if (pref.travelStyle === 'relaxed' && item.popularity === 'hidden') s += 1;

  if ('preferHiddenRoute' in pref && pref.preferHiddenRoute && item.popularity === 'hidden') {
    s += 2;
  }

  if ('acceptHotspot' in pref && pref.acceptHotspot && item.popularity === 'hot') {
    s += 1;
  }

  if (pref.staminaLevel === 'light' && item.estimatedDuration.includes('3')) {
    s -= 1;
  }

  return s;
}

function isNightOrNightlife(item: RecommendationItem): boolean {
  return (
    item.tags.includes('夜景') ||
    item.tags.includes('夜生活') ||
    item.category.includes('江景') ||
    item.category.includes('演出')
  );
}

function durationToMinutes(text: string): number {
  if (text.includes('45分钟')) return 45;
  if (text.includes('1.5小时')) return 90;
  if (text.includes('2-3小时')) return 150;
  if (text.includes('3小时')) return 180;
  if (text.includes('2小时')) return 120;
  if (text.includes('1小时')) return 60;
  return 90;
}

function toItineraryItem(
  item: RecommendationItem,
  timeSlot: string,
  pref: UserPreference,
): ItineraryItem {
  const transportTip =
    timeSlot === '中午'
      ? '建议步行或短距离打车前往，避免影响后续节奏。'
      : pref.transportPreferences.includes('地铁')
        ? '优先地铁 + 步行，兼顾效率与体验。'
        : pref.transportPreferences.includes('打车')
          ? '建议打车衔接，减少折返。'
          : '建议步行衔接附近点位。';

  return {
    id: `${item.id}-${timeSlot}`,
    timeSlot,
    name: item.name,
    type: item.type,
    description: item.shortDescription,
    reason: item.reason,
    estimatedDuration: item.estimatedDuration,
    estimatedCost: item.estimatedCost,
    transportTip,
    replaceable: true,
  };
}

export function generateRecommendations(
  pref: UserPreference,
  seed = 0,
): RecommendationItem[] {
  const cityData = catalog[pref.destination] ?? catalog.重庆;

  const ranked = [...cityData].sort(
    (a, b) => score(b, pref) - score(a, pref) + ((a.id > b.id ? 1 : -1) * (seed % 3)),
  );

  const attractions = ranked.filter((i) => i.type === 'attraction').slice(0, 8);
  const foods = ranked.filter((i) => i.type === 'food').slice(0, 6);
  const cultures = ranked.filter((i) => i.type === 'culture').slice(0, 4);

  return [...attractions, ...foods, ...cultures].map((item) => ({
    ...item,
    selected: false,
  }));
}

function pickBySlot(
  slot: string,
  selected: RecommendationItem[],
  usedIds: Set<string>,
  usedTypes: Map<string, number>,
): RecommendationItem | null {
  const allowedTypes = slotRules[slot];

  const candidates = selected
    .filter((item) => !usedIds.has(item.id))
    .filter((item) => allowedTypes.includes(item.type))
    .filter((item) => !(slot === '上午' && isNightOrNightlife(item)))
    .filter((item) => !(slot === '晚上' && item.type === 'food' && item.name.includes('重庆小面')))
    .sort((a, b) => {
      const typePenaltyA = usedTypes.get(a.type) ?? 0;
      const typePenaltyB = usedTypes.get(b.type) ?? 0;
      return typePenaltyA - typePenaltyB;
    });

  return candidates[0] ?? null;
}

function buildValidatedDay(
  selected: RecommendationItem[],
  pref: UserPreference,
): ItineraryItem[] {
  const usedIds = new Set<string>();
  const usedTypes = new Map<string, number>();
  const slots = ['上午', '中午', '下午', '晚上'];
  const items: ItineraryItem[] = [];

  for (const slot of slots) {
    const picked = pickBySlot(slot, selected, usedIds, usedTypes);
    if (!picked) continue;

    usedIds.add(picked.id);
    usedTypes.set(picked.type, (usedTypes.get(picked.type) ?? 0) + 1);
    items.push(toItineraryItem(picked, slot, pref));

    if (items.length >= 4) break;
  }

  const hasFood = items.some((i) => i.type === 'food');
  const hasExperience = items.some((i) => i.type === 'attraction' || i.type === 'culture');

  if (!hasFood) {
    const foodFallback = selected.find((i) => i.type === 'food' && !usedIds.has(i.id));
    if (foodFallback) {
      items.splice(Math.min(1, items.length), 0, toItineraryItem(foodFallback, '中午', pref));
      usedIds.add(foodFallback.id);
    }
  }

  if (!hasExperience) {
    const expFallback = selected.find(
      (i) => (i.type === 'attraction' || i.type === 'culture') && !usedIds.has(i.id),
    );
    if (expFallback) {
      items.unshift(toItineraryItem(expFallback, '上午', pref));
      usedIds.add(expFallback.id);
    }
  }

  const unique = new Map<string, ItineraryItem>();
  for (const item of items) {
    if (!unique.has(item.name)) unique.set(item.name, item);
  }

  const finalItems = [...unique.values()].slice(0, 4);

  if (pref.staminaLevel === 'light') {
    return finalItems
      .filter((item) => durationToMinutes(item.estimatedDuration) <= 150)
      .slice(0, 4);
  }

  return finalItems;
}

export function generateItineraryPlan(
  pref: UserPreference,
  selectedItems: RecommendationItem[],
): ItineraryPlan {
  const usable =
    selectedItems.length >= 2 ? selectedItems : generateRecommendations(pref).slice(0, 7);

  const days: ItineraryDay[] = Array.from({ length: pref.duration }).map((_, idx) => ({
    dayNumber: idx + 1,
    title: `Day ${idx + 1} · ${dayThemes[idx % dayThemes.length].title}`,
    story: dayThemes[idx % dayThemes.length].story,
    items: buildValidatedDay(usable, pref),
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
          items: buildValidatedDay(plan.selectedItems, plan.preference),
        }
      : day,
  );

  return { ...plan, days: nextDays };
}
