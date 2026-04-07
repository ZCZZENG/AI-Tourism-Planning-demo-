import type { Destination, InterestTag, TravelStyle, DayPlan, Activity } from '@/types';

export const destinations: Destination[] = [
  {
    id: '1',
    name: '巴厘岛',
    country: '印度尼西亚',
    image: '/dest-bali.jpg',
    category: 'beach',
    description: '热带天堂，拥有迷人的海滩和独特的文化'
  },
  {
    id: '2',
    name: '京都',
    country: '日本',
    image: '/dest-kyoto.jpg',
    category: 'history',
    description: '千年古都，传统与现代的完美融合'
  },
  {
    id: '3',
    name: '圣托里尼',
    country: '希腊',
    image: '/dest-santorini.jpg',
    category: 'beach',
    description: '爱琴海上的蓝白天堂'
  },
  {
    id: '4',
    name: '雷克雅未克',
    country: '冰岛',
    image: '/dest-iceland.jpg',
    category: 'nature',
    description: '极光与冰川的奇幻世界'
  },
  {
    id: '5',
    name: '马丘比丘',
    country: '秘鲁',
    image: '/dest-machu picchu.jpg',
    category: 'history',
    description: '云端上的印加古城'
  },
  {
    id: '6',
    name: '开普敦',
    country: '南非',
    image: '/dest-capetown.jpg',
    category: 'nature',
    description: '山海交汇的壮丽景观'
  }
];

export const interestTags: InterestTag[] = [
  { id: '1', name: '美食' },
  { id: '2', name: '历史' },
  { id: '3', name: '自然' },
  { id: '4', name: '艺术' },
  { id: '5', name: '购物' },
  { id: '6', name: '夜生活' },
  { id: '7', name: '摄影' },
  { id: '8', name: '冒险' }
];

export const travelStyles: TravelStyle[] = [
  {
    id: '1',
    name: '悠闲型',
    description: '慢节奏旅行，享受每一刻'
  },
  {
    id: '2',
    name: '文化深度型',
    description: '深入了解当地历史文化'
  },
  {
    id: '3',
    name: '打卡型',
    description: '高效游览热门景点'
  }
];

export const budgetOptions = [
  { value: '经济', label: '经济', description: '人均每日 300-500 元', icon: '💰' },
  { value: '适中', label: '适中', description: '人均每日 500-1000 元', icon: '💰💰' },
  { value: '宽裕', label: '宽裕', description: '人均每日 1000 元以上', icon: '💰💰💰' }
];

// Mock itinerary data for demo cities
export const mockItineraries: Record<string, Partial<DayPlan>[]> = {
  '重庆': [
    {
      dayNumber: 1,
      title: '山城初识',
      story: '沿着长江穿行，体验老街的烟火气。重庆，这座建在山上的城市，以其独特的地形和火辣的美食闻名于世。今天你将感受到山城的魅力与热情。',
      activities: [
        { name: '磁器口古镇', category: '景点', description: '探索千年古镇，品尝地道小吃', time: '上午', cost: 0, duration: '3小时' },
        { name: '重庆小面', category: '餐饮', description: '体验正宗重庆早餐', time: '早餐', cost: 15, duration: '1小时' },
        { name: '解放碑', category: '景点', description: '城市地标，感受现代重庆', time: '下午', cost: 0, duration: '2小时' },
        { name: '洪崖洞', category: '景点', description: '网红打卡地，夜景绝美', time: '傍晚', cost: 0, duration: '2小时' },
        { name: '串串火锅', category: '餐饮', description: '体验地道火锅文化', time: '晚餐', cost: 80, duration: '2小时' }
      ],
      culturalHighlights: [
        { name: '川剧变脸表演', description: '感受传统戏曲艺术的魅力' },
        { name: '山城步道', description: '体验独特的山城建筑文化' }
      ]
    },
    {
      dayNumber: 2,
      title: '江湖重庆',
      story: '深入重庆的江湖文化，体验本地人的生活方式。从过早到夜宵，感受这座城市永不熄灭的热情。',
      activities: [
        { name: '长江索道', category: '体验', description: '空中俯瞰两江交汇', time: '上午', cost: 30, duration: '1小时' },
        { name: '李子坝轻轨', category: '景点', description: '看轻轨穿楼的奇观', time: '上午', cost: 0, duration: '1小时' },
        { name: '鹅岭二厂', category: '景点', description: '文艺青年聚集地', time: '下午', cost: 0, duration: '3小时' },
        { name: '南山一棵树', category: '景点', description: '俯瞰全城夜景', time: '傍晚', cost: 30, duration: '2小时' },
        { name: '江湖菜', category: '餐饮', description: '品尝地道重庆江湖菜', time: '晚餐', cost: 100, duration: '2小时' }
      ],
      culturalHighlights: [
        { name: '码头文化', description: '了解重庆作为码头城市的历史' },
        { name: '茶馆文化', description: '在老字号茶馆体验慢生活' }
      ]
    },
    {
      dayNumber: 3,
      title: '巴渝风情',
      story: '探访世界文化遗产，感受大足石刻的庄严与精美。在离开之前，带一份重庆的记忆回家。',
      activities: [
        { name: '大足石刻', category: '景点', description: '世界文化遗产，佛教艺术瑰宝', time: '上午', cost: 140, duration: '4小时' },
        { name: '武隆天生三桥', category: '景点', description: '喀斯特地貌奇观', time: '下午', cost: 125, duration: '4小时' },
        { name: '酸辣粉', category: '餐饮', description: '重庆特色小吃', time: '小吃', cost: 12, duration: '30分钟' },
        { name: '朝天门', category: '景点', description: '两江交汇处，重庆零公里', time: '傍晚', cost: 0, duration: '1小时' }
      ],
      culturalHighlights: [
        { name: '大足石刻艺术', description: '唐宋时期佛教石刻艺术的巅峰' },
        { name: '巴渝文化', description: '了解巴渝地区独特的历史文化' }
      ]
    }
  ],
  '成都': [
    {
      dayNumber: 1,
      title: '天府之国',
      story: '来到天府之国，感受成都的悠闲与惬意。这里有可爱的大熊猫，有热闹的宽窄巷子，还有让人流连忘返的美食。',
      activities: [
        { name: '大熊猫基地', category: '景点', description: '近距离接触国宝大熊猫', time: '上午', cost: 55, duration: '4小时' },
        { name: '宽窄巷子', category: '景点', description: '成都文化名片', time: '下午', cost: 0, duration: '3小时' },
        { name: '担担面', category: '餐饮', description: '成都经典小吃', time: '午餐', cost: 15, duration: '1小时' },
        { name: '锦里古街', category: '景点', description: '体验三国文化', time: '傍晚', cost: 0, duration: '2小时' },
        { name: '火锅', category: '餐饮', description: '成都必吃美食', time: '晚餐', cost: 100, duration: '2小时' }
      ],
      culturalHighlights: [
        { name: '川剧变脸', description: '神奇的川剧艺术' },
        { name: '茶馆文化', description: '体验成都人的慢生活' }
      ]
    },
    {
      dayNumber: 2,
      title: '古蜀文明',
      story: '探访神秘的古蜀文明，从金沙遗址到武侯祠，感受成都深厚的历史底蕴。',
      activities: [
        { name: '金沙遗址', category: '景点', description: '古蜀文明的重要遗址', time: '上午', cost: 70, duration: '3小时' },
        { name: '武侯祠', category: '景点', description: '纪念诸葛亮的祠庙', time: '下午', cost: 50, duration: '2小时' },
        { name: '龙抄手', category: '餐饮', description: '成都传统名吃', time: '午餐', cost: 25, duration: '1小时' },
        { name: '人民公园', category: '景点', description: '体验成都市民生活', time: '下午', cost: 0, duration: '2小时' },
        { name: '串串香', category: '餐饮', description: '成都街头美食', time: '晚餐', cost: 60, duration: '2小时' }
      ],
      culturalHighlights: [
        { name: '三国文化', description: '了解三国时期的历史故事' },
        { name: '古蜀文明', description: '探索神秘的古蜀国' }
      ]
    },
    {
      dayNumber: 3,
      title: '青城天下幽',
      story: '问道青城山，拜水都江堰。这一天，你将领略到成都周边最壮丽的自然风光和人类智慧的结晶。',
      activities: [
        { name: '都江堰', category: '景点', description: '世界文化遗产，古代水利工程', time: '上午', cost: 80, duration: '3小时' },
        { name: '青城山', category: '景点', description: '道教名山，天下幽', time: '下午', cost: 80, duration: '4小时' },
        { name: '道家素斋', category: '餐饮', description: '青城山特色素斋', time: '午餐', cost: 40, duration: '1小时' },
        { name: '春熙路', category: '景点', description: '成都最繁华的商业街', time: '傍晚', cost: 0, duration: '2小时' }
      ],
      culturalHighlights: [
        { name: '道教文化', description: '了解中国本土宗教道教' },
        { name: '水利文化', description: '惊叹古人的治水智慧' }
      ]
    }
  ],
  '北京': [
    {
      dayNumber: 1,
      title: '皇城根下',
      story: '走进千年帝都，感受紫禁城的庄严与恢弘。北京，一座承载着中华文明厚重历史的城市。',
      activities: [
        { name: '故宫博物院', category: '景点', description: '世界最大宫殿建筑群', time: '上午', cost: 60, duration: '4小时' },
        { name: '天安门广场', category: '景点', description: '世界最大城市广场', time: '上午', cost: 0, duration: '1小时' },
        { name: '北京烤鸭', category: '餐饮', description: '北京最著名的美食', time: '午餐', cost: 200, duration: '2小时' },
        { name: '景山公园', category: '景点', description: '俯瞰紫禁城全景', time: '下午', cost: 2, duration: '1小时' },
        { name: '王府井', category: '景点', description: '著名商业街', time: '傍晚', cost: 0, duration: '2小时' }
      ],
      culturalHighlights: [
        { name: '皇家建筑', description: '了解中国古代皇家建筑艺术' },
        { name: '京剧文化', description: '欣赏国粹京剧表演' }
      ]
    },
    {
      dayNumber: 2,
      title: '长城内外',
      story: '不到长城非好汉。今天你将登上世界文化遗产万里长城，感受中华民族的伟大精神。',
      activities: [
        { name: '八达岭长城', category: '景点', description: '万里长城最精华段', time: '上午', cost: 40, duration: '4小时' },
        { name: '炸酱面', category: '餐饮', description: '老北京传统面食', time: '午餐', cost: 20, duration: '1小时' },
        { name: '颐和园', category: '景点', description: '中国最大皇家园林', time: '下午', cost: 30, duration: '3小时' },
        { name: '南锣鼓巷', category: '景点', description: '老北京胡同文化', time: '傍晚', cost: 0, duration: '2小时' },
        { name: '涮羊肉', category: '餐饮', description: '老北京特色美食', time: '晚餐', cost: 120, duration: '2小时' }
      ],
      culturalHighlights: [
        { name: '长城文化', description: '了解长城的历史意义' },
        { name: '园林艺术', description: '欣赏中国古典园林之美' }
      ]
    },
    {
      dayNumber: 3,
      title: '胡同深处',
      story: '走进老北京的胡同，感受四合院的宁静与温馨。在现代化的都市中，寻找那份古老的记忆。',
      activities: [
        { name: '天坛公园', category: '景点', description: '明清皇帝祭天场所', time: '上午', cost: 15, duration: '2小时' },
        { name: '前门大街', category: '景点', description: '老北京商业街', time: '上午', cost: 0, duration: '2小时' },
        { name: '豆汁焦圈', category: '餐饮', description: '老北京特色早餐', time: '早餐', cost: 10, duration: '1小时' },
        { name: '什刹海', category: '景点', description: '老北京水乡风情', time: '下午', cost: 0, duration: '3小时' },
        { name: '798艺术区', category: '景点', description: '北京现代艺术聚集地', time: '傍晚', cost: 0, duration: '2小时' }
      ],
      culturalHighlights: [
        { name: '胡同文化', description: '体验老北京的生活方式' },
        { name: '四合院建筑', description: '了解传统民居建筑' }
      ]
    }
  ]
};

// Generate a mock itinerary based on preferences
export function generateMockItinerary(destination: string, days: number, preferences: {
  budget: string;
  interests: string[];
  travelStyle: string;
}) {
  const baseItinerary = mockItineraries[destination] || mockItineraries['重庆'];
  
  // Adjust activities based on budget
  const budgetMultiplier = preferences.budget === '经济' ? 0.7 : preferences.budget === '宽裕' ? 1.5 : 1;
  
  // Filter and adjust days
  const adjustedDays = baseItinerary.slice(0, days).map((day, index) => {
    const adjustedActivities = day.activities?.map((activity: Activity) => ({
      ...activity,
      cost: Math.round(activity.cost * budgetMultiplier)
    })) || [];
    
    // Calculate day total cost
    const dayCost = adjustedActivities.reduce((sum: number, a: Activity) => sum + a.cost, 0);
    
    return {
      ...day,
      dayNumber: index + 1,
      activities: adjustedActivities,
      dayCost
    };
  });
  
  const totalCost = adjustedDays.reduce((sum: number, day: { dayCost?: number }) => sum + (day.dayCost || 0), 0);
  
  return {
    days: adjustedDays,
    totalCost
  };
}
