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
      id: 'cq-a7',
      name: '解放碑步行街',
      type: 'attraction',
      category: '城市地标',
      shortDescription: '重庆核心商圈，感受都市脉搏。',
      reason: '城市漫步与高效打卡均适合。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥0',
      tags: ['城市漫步', '拍照'],
      popularity: 'hot',
    },
    {
      id: 'cq-a8',
      name: '十八梯老街',
      type: 'attraction',
      category: '历史街区',
      shortDescription: '重庆最具烟火气的老城片区。',
      reason: '历史文化爱好者的必访之地。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0',
      tags: ['历史文化', '城市漫步'],
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
      id: 'cq-f5',
      name: '江边夜市串串',
      type: 'food',
      category: '夜市小吃',
      shortDescription: '边走边吃，感受夜重庆。',
      reason: '夜生活偏好的绝佳搭配。',
      estimatedDuration: '1小时',
      estimatedCost: '¥30-60',
      tags: ['美食', '夜生活'],
      popularity: 'hot',
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
    {
      id: 'cq-c4',
      name: '三峡博物馆',
      type: 'culture',
      category: '历史博物馆',
      shortDescription: '了解长江文明与三峡历史。',
      reason: '历史文化爱好者必去，免费开放。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0',
      tags: ['历史文化'],
      popularity: 'hidden',
    },
  ],

  成都: [
    {
      id: 'cd-a1',
      name: '宽窄巷子',
      type: 'attraction',
      category: '历史街区',
      shortDescription: '老成都的市井生活与文化缩影。',
      reason: '历史文化与城市漫步的标志性打卡地。',
      estimatedDuration: '2-3小时',
      estimatedCost: '¥0',
      tags: ['历史文化', '城市漫步'],
      popularity: 'hot',
    },
    {
      id: 'cd-a2',
      name: '锦里古街',
      type: 'attraction',
      category: '文化街区',
      shortDescription: '三国文化与成都小吃的交汇地。',
      reason: '打卡拍照与美食爱好者都喜欢。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0',
      tags: ['历史文化', '拍照'],
      popularity: 'hot',
    },
    {
      id: 'cd-a3',
      name: '成都大熊猫繁育研究基地',
      type: 'attraction',
      category: '自然体验',
      shortDescription: '近距离观察国宝大熊猫。',
      reason: '自然风景偏好的首选，全年龄段友好。',
      estimatedDuration: '3小时',
      estimatedCost: '¥55',
      tags: ['自然风景', '拍照'],
      popularity: 'hot',
    },
    {
      id: 'cd-a4',
      name: '玉林路小酒馆',
      type: 'attraction',
      category: '氛围街区',
      shortDescription: '赵雷歌里的那条路，成都慢生活象征。',
      reason: '氛围感体验的小众打卡地。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥0-50',
      tags: ['氛围感体验', '小众体验'],
      popularity: 'hidden',
    },
    {
      id: 'cd-a5',
      name: '武侯祠',
      type: 'attraction',
      category: '历史遗址',
      shortDescription: '三国圣地，诸葛亮与刘备长眠之处。',
      reason: '历史文化爱好者的必访地标。',
      estimatedDuration: '2小时',
      estimatedCost: '¥50',
      tags: ['历史文化'],
      popularity: 'hot',
    },
    {
      id: 'cd-a6',
      name: '东郊记忆',
      type: 'attraction',
      category: '文创园区',
      shortDescription: '工业遗址改造的音乐文创区。',
      reason: '艺术展览与小众体验爱好者的好去处。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0',
      tags: ['艺术展览', '小众体验'],
      popularity: 'hidden',
    },
    {
      id: 'cd-a7',
      name: '春熙路',
      type: 'attraction',
      category: '商业地标',
      shortDescription: '成都最繁华的步行街，IFS 熊猫爬楼。',
      reason: '高效打卡与城市漫步均适合。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥0',
      tags: ['城市漫步', '拍照'],
      popularity: 'hot',
    },
    {
      id: 'cd-a8',
      name: '望江楼公园',
      type: 'attraction',
      category: '自然人文',
      shortDescription: '竹林与古塔，喝茶看鸟的绝佳之地。',
      reason: '轻松悠闲风格的隐秘好去处。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥20',
      tags: ['自然风景', '氛围感体验'],
      popularity: 'hidden',
    },
    {
      id: 'cd-f1',
      name: '成都担担面',
      type: 'food',
      category: '本地早餐',
      shortDescription: '芝麻酱与辣椒的完美融合。',
      reason: '预算友好，地道成都早餐体验。',
      estimatedDuration: '45分钟',
      estimatedCost: '¥15-25',
      tags: ['美食'],
      popularity: 'hot',
    },
    {
      id: 'cd-f2',
      name: '成都火锅（九宫格）',
      type: 'food',
      category: '川式火锅',
      shortDescription: '麻辣鲜香，成都必吃体验。',
      reason: '美食优先风格的核心体验。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥80-150',
      tags: ['美食', '夜生活'],
      popularity: 'hot',
    },
    {
      id: 'cd-f3',
      name: '赖汤圆',
      type: 'food',
      category: '传统小吃',
      shortDescription: '百年老店，糯香细腻。',
      reason: '历史文化与美食偏好兼顾。',
      estimatedDuration: '30分钟',
      estimatedCost: '¥20-40',
      tags: ['美食', '历史文化'],
      popularity: 'hot',
    },
    {
      id: 'cd-f4',
      name: '茶馆盖碗茶',
      type: 'food',
      category: '茶文化',
      shortDescription: '找家老茶馆，坐半天。',
      reason: '成都慢生活精髓，轻松悠闲必选。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥20-40',
      tags: ['氛围感体验'],
      popularity: 'hidden',
    },
    {
      id: 'cd-f5',
      name: '夜啤酒街',
      type: 'food',
      category: '夜市',
      shortDescription: '露天摊、串串、啤酒，成都夜晚标配。',
      reason: '夜生活偏好的高匹配体验。',
      estimatedDuration: '2小时',
      estimatedCost: '¥50-100',
      tags: ['美食', '夜生活'],
      popularity: 'hot',
    },
    {
      id: 'cd-c1',
      name: '川剧变脸演出',
      type: 'culture',
      category: '非遗演出',
      shortDescription: '成都最具代表性的传统表演艺术。',
      reason: '文化深度游的高价值体验。',
      estimatedDuration: '1小时',
      estimatedCost: '¥80-180',
      tags: ['历史文化'],
      popularity: 'hot',
    },
    {
      id: 'cd-c2',
      name: '金沙遗址博物馆',
      type: 'culture',
      category: '考古博物馆',
      shortDescription: '古蜀文明的出土珍宝展览。',
      reason: '历史文化爱好者的深度文化补给。',
      estimatedDuration: '2小时',
      estimatedCost: '¥60',
      tags: ['历史文化'],
      popularity: 'hidden',
    },
    {
      id: 'cd-c3',
      name: '都江堰水利工程',
      type: 'culture',
      category: '世界遗产',
      shortDescription: '两千年前的治水智慧，至今仍在运转。',
      reason: '历史文化与自然风景的双重体验。',
      estimatedDuration: '3小时',
      estimatedCost: '¥80',
      tags: ['历史文化', '自然风景'],
      popularity: 'hot',
    },
  ],

  北京: [
    {
      id: 'bj-a1',
      name: '故宫博物院',
      type: 'attraction',
      category: '历史宫殿',
      shortDescription: '明清两朝皇家宫殿，世界最大古建筑群。',
      reason: '历史文化爱好者的必游之地。',
      estimatedDuration: '3小时',
      estimatedCost: '¥60',
      tags: ['历史文化', '拍照'],
      popularity: 'hot',
    },
    {
      id: 'bj-a2',
      name: '天安门广场',
      type: 'attraction',
      category: '城市地标',
      shortDescription: '中国最具象征意义的广场。',
      reason: '打卡拍照与城市漫步的核心地标。',
      estimatedDuration: '1小时',
      estimatedCost: '¥0',
      tags: ['拍照', '城市漫步'],
      popularity: 'hot',
    },
    {
      id: 'bj-a3',
      name: '颐和园',
      type: 'attraction',
      category: '皇家园林',
      shortDescription: '皇家园林与昆明湖的绝美景致。',
      reason: '自然风景与历史文化双重满足。',
      estimatedDuration: '3小时',
      estimatedCost: '¥30',
      tags: ['自然风景', '历史文化'],
      popularity: 'hot',
    },
    {
      id: 'bj-a4',
      name: '南锣鼓巷',
      type: 'attraction',
      category: '胡同文化',
      shortDescription: '老北京胡同里的文艺小店与咖啡馆。',
      reason: '城市漫步与氛围感体验的绝佳选择。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0-50',
      tags: ['城市漫步', '氛围感体验'],
      popularity: 'hot',
    },
    {
      id: 'bj-a5',
      name: '798 艺术区',
      type: 'attraction',
      category: '当代艺术',
      shortDescription: '工厂改造的当代艺术聚集地。',
      reason: '艺术展览与小众体验爱好者的首选。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0-80',
      tags: ['艺术展览', '小众体验'],
      popularity: 'hidden',
    },
    {
      id: 'bj-a6',
      name: '长城（慕田峪段）',
      type: 'attraction',
      category: '世界遗产',
      shortDescription: '人少风景好的长城段，植被茂密。',
      reason: '自然风景与历史文化的完美结合。',
      estimatedDuration: '3小时',
      estimatedCost: '¥65',
      tags: ['自然风景', '历史文化'],
      popularity: 'hidden',
    },
    {
      id: 'bj-a7',
      name: '什刹海',
      type: 'attraction',
      category: '城市水域',
      shortDescription: '湖边酒吧、胡同与四合院的交汇地。',
      reason: '夜生活与氛围感体验的完美场景。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0-100',
      tags: ['夜生活', '氛围感体验'],
      popularity: 'hot',
    },
    {
      id: 'bj-a8',
      name: '雍和宫',
      type: 'attraction',
      category: '宗教文化',
      shortDescription: '北京最大藏传佛教寺院，庄严肃穆。',
      reason: '历史文化深度游的小众之选。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥25',
      tags: ['历史文化', '小众体验'],
      popularity: 'hidden',
    },
    {
      id: 'bj-f1',
      name: '老北京炸酱面',
      type: 'food',
      category: '本地主食',
      shortDescription: '传统手擀面配炸酱，地道京味早午餐。',
      reason: '预算友好，体验最纯正的北京味道。',
      estimatedDuration: '45分钟',
      estimatedCost: '¥25-50',
      tags: ['美食'],
      popularity: 'hot',
    },
    {
      id: 'bj-f2',
      name: '全聚德烤鸭',
      type: 'food',
      category: '北京名菜',
      shortDescription: '百年品牌，北京必吃经典。',
      reason: '美食优先风格的标志性体验。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥150-250',
      tags: ['美食'],
      popularity: 'hot',
    },
    {
      id: 'bj-f3',
      name: '护国寺小吃街',
      type: 'food',
      category: '传统小吃',
      shortDescription: '豆汁、焦圈、驴打滚，老北京全在这里。',
      reason: '历史文化与美食一网打尽。',
      estimatedDuration: '1小时',
      estimatedCost: '¥30-60',
      tags: ['美食', '历史文化'],
      popularity: 'hot',
    },
    {
      id: 'bj-f4',
      name: '三里屯酒吧街',
      type: 'food',
      category: '夜生活',
      shortDescription: '北京最热闹的夜生活聚集地。',
      reason: '夜生活偏好的高匹配选择。',
      estimatedDuration: '2小时',
      estimatedCost: '¥100-200',
      tags: ['夜生活'],
      popularity: 'hot',
    },
    {
      id: 'bj-c1',
      name: '国家博物馆',
      type: 'culture',
      category: '国家级博物馆',
      shortDescription: '中国历史文物的最高殿堂，免费开放。',
      reason: '历史文化深度游的核心体验，性价比极高。',
      estimatedDuration: '3小时',
      estimatedCost: '¥0',
      tags: ['历史文化'],
      popularity: 'hot',
    },
    {
      id: 'bj-c2',
      name: '胡同四合院探访',
      type: 'culture',
      category: '在地文化',
      shortDescription: '走进北京胡同，感受老城市井生活。',
      reason: '文化深度游的沉浸式体验。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0-60',
      tags: ['历史文化', '城市漫步'],
      popularity: 'hidden',
    },
    {
      id: 'bj-c3',
      name: '天坛公园',
      type: 'culture',
      category: '皇家祭祀',
      shortDescription: '明清皇帝祭天之所，祈年殿震撼人心。',
      reason: '历史文化与自然风景兼备。',
      estimatedDuration: '2小时',
      estimatedCost: '¥35',
      tags: ['历史文化', '自然风景'],
      popularity: 'hot',
    },
  ],

  西安: [
    {
      id: 'xa-a1',
      name: '兵马俑',
      type: 'attraction',
      category: '世界遗产',
      shortDescription: '秦始皇的地下军队，世界第八大奇迹。',
      reason: '历史文化爱好者的终极目标。',
      estimatedDuration: '3小时',
      estimatedCost: '¥120',
      tags: ['历史文化'],
      popularity: 'hot',
    },
    {
      id: 'xa-a2',
      name: '西安古城墙',
      type: 'attraction',
      category: '历史城防',
      shortDescription: '保存最完整的古代城墙，可骑行环游。',
      reason: '历史文化与打卡拍照的双重体验。',
      estimatedDuration: '2小时',
      estimatedCost: '¥54',
      tags: ['历史文化', '拍照'],
      popularity: 'hot',
    },
    {
      id: 'xa-a3',
      name: '回民街',
      type: 'attraction',
      category: '美食街区',
      shortDescription: '西安最热闹的清真美食聚集地。',
      reason: '美食优先与城市漫步的绝佳组合。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0-80',
      tags: ['美食', '城市漫步'],
      popularity: 'hot',
    },
    {
      id: 'xa-a4',
      name: '大唐不夜城',
      type: 'attraction',
      category: '文化街区',
      shortDescription: '盛唐风情的大型步行街，夜晚流光溢彩。',
      reason: '夜生活与打卡拍照的网红必去地。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0',
      tags: ['夜生活', '拍照'],
      popularity: 'hot',
    },
    {
      id: 'xa-a5',
      name: '华清宫',
      type: 'attraction',
      category: '历史遗址',
      shortDescription: '唐玄宗与杨贵妃的皇家温泉行宫。',
      reason: '历史文化深度游的重要节点。',
      estimatedDuration: '2小时',
      estimatedCost: '¥150',
      tags: ['历史文化'],
      popularity: 'hot',
    },
    {
      id: 'xa-a6',
      name: '碑林博物馆',
      type: 'attraction',
      category: '书法艺术',
      shortDescription: '收藏历代名家碑刻，中国书法圣地。',
      reason: '历史文化与艺术展览爱好者的小众精品。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥75',
      tags: ['历史文化', '艺术展览'],
      popularity: 'hidden',
    },
    {
      id: 'xa-a7',
      name: '钟鼓楼广场',
      type: 'attraction',
      category: '城市地标',
      shortDescription: '西安城市中心，钟楼鼓楼遥遥相对。',
      reason: '城市漫步与高效打卡的核心地标。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥30-50',
      tags: ['历史文化', '拍照'],
      popularity: 'hot',
    },
    {
      id: 'xa-f1',
      name: '肉夹馍',
      type: 'food',
      category: '西安小吃',
      shortDescription: '腊汁肉夹白吉馍，西安最具代表性的小吃。',
      reason: '预算友好，地道西安早餐。',
      estimatedDuration: '30分钟',
      estimatedCost: '¥10-20',
      tags: ['美食'],
      popularity: 'hot',
    },
    {
      id: 'xa-f2',
      name: '羊肉泡馍',
      type: 'food',
      category: '西安名吃',
      shortDescription: '掰馍、煮馍、上桌，仪式感满满。',
      reason: '美食优先风格的核心体验，必须亲自掰馍。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥40-80',
      tags: ['美食', '历史文化'],
      popularity: 'hot',
    },
    {
      id: 'xa-f3',
      name: '凉皮与擀面皮',
      type: 'food',
      category: '西安小吃',
      shortDescription: '酸辣爽口，街头随处可见。',
      reason: '高效打卡路线的性价比美食补充。',
      estimatedDuration: '30分钟',
      estimatedCost: '¥10-15',
      tags: ['美食'],
      popularity: 'hot',
    },
    {
      id: 'xa-f4',
      name: '永兴坊摔碗酒',
      type: 'food',
      category: '体验饮食',
      shortDescription: '一饮而尽，摔碗祈福，西安仪式感体验。',
      reason: '氛围感体验偏好的独特选择。',
      estimatedDuration: '1小时',
      estimatedCost: '¥30-60',
      tags: ['氛围感体验', '小众体验'],
      popularity: 'hidden',
    },
    {
      id: 'xa-c1',
      name: '陕西历史博物馆',
      type: 'culture',
      category: '国家级博物馆',
      shortDescription: '陕西三千年文明的宝库，镇馆之宝众多。',
      reason: '历史文化深度游的精髓所在，免费预约。',
      estimatedDuration: '3小时',
      estimatedCost: '¥0',
      tags: ['历史文化'],
      popularity: 'hot',
    },
    {
      id: 'xa-c2',
      name: '大雁塔夜游',
      type: 'culture',
      category: '佛教文化',
      shortDescription: '唐僧西天取经归来建造，夜晚灯光璀璨。',
      reason: '历史文化与夜生活的完美结合。',
      estimatedDuration: '2小时',
      estimatedCost: '¥30-50',
      tags: ['历史文化', '夜生活'],
      popularity: 'hot',
    },
    {
      id: 'xa-c3',
      name: '汉阳陵博物馆',
      type: 'culture',
      category: '考古遗址',
      shortDescription: '汉景帝地下陵园，裸眼可见考古现场。',
      reason: '历史文化爱好者的小众深度体验。',
      estimatedDuration: '2小时',
      estimatedCost: '¥75',
      tags: ['历史文化', '小众体验'],
      popularity: 'hidden',
    },
  ],

  上海: [
    {
      id: 'sh-a1',
      name: '外滩',
      type: 'attraction',
      category: '城市地标',
      shortDescription: '万国建筑博览群，浦江两岸的璀璨夜景。',
      reason: '打卡拍照与城市漫步的绝对核心。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0',
      tags: ['拍照', '城市漫步', '夜景'],
      popularity: 'hot',
    },
    {
      id: 'sh-a2',
      name: '豫园',
      type: 'attraction',
      category: '古典园林',
      shortDescription: '明代私家园林，老上海烟火气。',
      reason: '历史文化与城市漫步的经典组合。',
      estimatedDuration: '2小时',
      estimatedCost: '¥40',
      tags: ['历史文化', '城市漫步'],
      popularity: 'hot',
    },
    {
      id: 'sh-a3',
      name: '田子坊',
      type: 'attraction',
      category: '文艺街区',
      shortDescription: '弄堂里的创意小店与咖啡馆。',
      reason: '艺术展览与氛围感体验爱好者的宝地。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0-60',
      tags: ['艺术展览', '氛围感体验', '小众体验'],
      popularity: 'hot',
    },
    {
      id: 'sh-a4',
      name: '武康路',
      type: 'attraction',
      category: '历史风貌区',
      shortDescription: '法式梧桐道，上海最美老洋房街道。',
      reason: '城市漫步与拍照的小众精品路线。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥0',
      tags: ['城市漫步', '拍照', '小众体验'],
      popularity: 'hidden',
    },
    {
      id: 'sh-a5',
      name: '上海迪士尼乐园',
      type: 'attraction',
      category: '主题乐园',
      shortDescription: '亚洲最大迪士尼，梦幻体验一整天。',
      reason: '打卡拍照与夜生活的完美结合。',
      estimatedDuration: '3小时',
      estimatedCost: '¥400+',
      tags: ['拍照', '夜生活'],
      popularity: 'hot',
    },
    {
      id: 'sh-a6',
      name: '朱家角古镇',
      type: 'attraction',
      category: '江南水乡',
      shortDescription: '上海郊区的江南水乡，古桥与流水。',
      reason: '历史文化与自然风景的双重享受。',
      estimatedDuration: '3小时',
      estimatedCost: '¥0',
      tags: ['历史文化', '自然风景'],
      popularity: 'hidden',
    },
    {
      id: 'sh-a7',
      name: '新天地',
      type: 'attraction',
      category: '时尚街区',
      shortDescription: '石库门建筑与现代时尚的融合地带。',
      reason: '氛围感体验与夜生活的热门去处。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0-150',
      tags: ['氛围感体验', '夜生活'],
      popularity: 'hot',
    },
    {
      id: 'sh-a8',
      name: '陆家嘴金融区',
      type: 'attraction',
      category: '现代地标',
      shortDescription: '东方明珠、环球金融中心、上海中心三足鼎立。',
      reason: '高效打卡与拍照的现代都市地标。',
      estimatedDuration: '2小时',
      estimatedCost: '¥100-200',
      tags: ['拍照', '城市漫步'],
      popularity: 'hot',
    },
    {
      id: 'sh-f1',
      name: '生煎包',
      type: 'food',
      category: '上海早点',
      shortDescription: '底脆肉嫩汤汁丰，上海最具代表性的早餐。',
      reason: '预算友好，开启地道上海早晨。',
      estimatedDuration: '30分钟',
      estimatedCost: '¥20-35',
      tags: ['美食'],
      popularity: 'hot',
    },
    {
      id: 'sh-f2',
      name: '小笼包（佳家汤包）',
      type: 'food',
      category: '上海名点',
      shortDescription: '汤汁饱满，皮薄馅嫩，上海必吃。',
      reason: '美食优先的核心打卡体验。',
      estimatedDuration: '1小时',
      estimatedCost: '¥40-80',
      tags: ['美食'],
      popularity: 'hot',
    },
    {
      id: 'sh-f3',
      name: '本帮红烧肉',
      type: 'food',
      category: '本帮菜',
      shortDescription: '酱香浓郁、肥而不腻的上海本帮经典。',
      reason: '美食深度体验，感受沪味家常菜。',
      estimatedDuration: '1小时',
      estimatedCost: '¥80-150',
      tags: ['美食'],
      popularity: 'hidden',
    },
    {
      id: 'sh-f4',
      name: '衡山路酒吧街',
      type: 'food',
      category: '夜生活',
      shortDescription: '法租界风情的酒吧聚集地，夜晚氛围浓郁。',
      reason: '夜生活偏好与氛围感体验的绝佳场所。',
      estimatedDuration: '2小时',
      estimatedCost: '¥80-200',
      tags: ['夜生活', '氛围感体验'],
      popularity: 'hot',
    },
    {
      id: 'sh-c1',
      name: '上海博物馆',
      type: 'culture',
      category: '综合博物馆',
      shortDescription: '中国古代艺术的顶级收藏，青铜器镇馆。',
      reason: '历史文化深度游，免费开放性价比极高。',
      estimatedDuration: '2小时',
      estimatedCost: '¥0',
      tags: ['历史文化', '艺术展览'],
      popularity: 'hot',
    },
    {
      id: 'sh-c2',
      name: '龙华寺与桃花节',
      type: 'culture',
      category: '宗教文化',
      shortDescription: '上海最古老的寺院，千年银杏见证历史。',
      reason: '历史文化与自然风景的隐秘体验。',
      estimatedDuration: '1.5小时',
      estimatedCost: '¥10',
      tags: ['历史文化', '自然风景'],
      popularity: 'hidden',
    },
    {
      id: 'sh-c3',
      name: '上海当代艺术博物馆（PSA）',
      type: 'culture',
      category: '当代艺术',
      shortDescription: '发电厂改造，国内顶尖当代艺术展览空间。',
      reason: '艺术展览爱好者的小众必去。',
      estimatedDuration: '2小时',
      estimatedCost: '¥35',
      tags: ['艺术展览', '小众体验'],
      popularity: 'hidden',
    },
  ],
};

const cityDayThemes: Record<string, Array<{ title: string; story: string }>> = {
  重庆: [
    { title: '山城初识', story: '从城市地标和街区烟火切入，先建立你与这座城的第一层连接。' },
    { title: '老街与人文', story: '把脚步放慢一点，在街巷和文化体验里读懂重庆的日常。' },
    { title: '江景收束', story: '以夜色与在地美食收尾，把旅程记忆留在最有氛围的片段里。' },
    { title: '立体漫游', story: '重庆是一座需要用脚步丈量高度的城市，今天就随坡而行。' },
    { title: '烟火慢游', story: '围绕你最喜欢的偏好做延展，保留节奏，不追求赶场。' },
  ],
  成都: [
    { title: '天府初印象', story: '从最具代表性的成都地标切入，感受这座城市慢节奏的底色。' },
    { title: '古韵与烟火', story: '走进老街、茶馆与传统表演，触摸成都千年文化的脉络。' },
    { title: '熊猫与自然', story: '把一天交给自然与动物，以最轻松的方式感受天府之国的灵气。' },
    { title: '美食深度游', story: '今天只有一件事——把成都的美食从早吃到晚，不留遗憾。' },
    { title: '悠然收尾', story: '找一家茶馆坐下来，让成都的慢生活在最后一天完整收束。' },
  ],
  北京: [
    { title: '帝都初览', story: '从天安门广场到故宫，感受中国历史最厚重的一面。' },
    { title: '皇家园林与胡同', story: '从御苑到胡同，在对比中理解北京的宏大与市井。' },
    { title: '当代与传统', story: '798 艺术区与国家博物馆，感受北京在历史与当代之间的张力。' },
    { title: '长城与山野', story: '出城一天，站在城墙上俯瞰群山，理解"不到长城非好汉"。' },
    { title: '京味收官', story: '以一顿地道京菜和胡同夜游收束，把北京的味道带走。' },
  ],
  西安: [
    { title: '千年古都初见', story: '从城墙到兵马俑，以最直接的方式感受三千年历史的分量。' },
    { title: '大唐盛世重现', story: '走进博物馆与大唐不夜城，把历史课本里的盛唐变成眼前的画面。' },
    { title: '美食与烟火', story: '回民街、羊肉泡馍与摔碗酒，用食物读懂这座城市的性格。' },
    { title: '文物与细节', story: '放慢脚步，走进碑林与遗址博物馆，看见被忽略的历史细节。' },
    { title: '古城漫步收官', story: '骑行城墙，俯瞰西安全貌，以最高的视角结束这趟穿越之旅。' },
  ],
  上海: [
    { title: '魔都初印象', story: '从外滩的万国建筑到浦东的现代天际线，感受上海的时空错位之美。' },
    { title: '弄堂与洋房', story: '走进武康路和田子坊，在法式梧桐与石库门里触摸老上海的肌理。' },
    { title: '美食与市集', story: '生煎、小笼、本帮菜，今天的主角是上海的舌尖记忆。' },
    { title: '艺术与当代', story: 'PSA、新天地与外滩美术馆，感受上海作为艺术之都的当代脉搏。' },
    { title: '水乡与慢时光', story: '出城去朱家角，让江南的水和桥把旅程收束在一份宁静里。' },
  ],
};

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
  if (text.includes('45分钟') || text.includes('30分钟')) return 45;
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
  const cityData = catalog[pref.destination] ?? catalog['重庆'];

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
    .filter(
      (item) => !(slot === '晚上' && item.type === 'food' && item.name.includes('小面')),
    )
    .sort((a, b) => {
      const typePenaltyA = usedTypes.get(a.type) ?? 0;
      const typePenaltyB = usedTypes.get(b.type) ?? 0;
      return typePenaltyA - typePenaltyB;
    });

  return candidates[0] ?? null;
}

function buildDayItems(
  selected: RecommendationItem[],
  pref: UserPreference,
  globalUsedIds: Set<string>,
): ItineraryItem[] {
  const localUsedIds = new Set<string>(globalUsedIds);
  const usedTypes = new Map<string, number>();
  const slots = ['上午', '中午', '下午', '晚上'];
  const items: ItineraryItem[] = [];

  for (const slot of slots) {
    const picked = pickBySlot(slot, selected, localUsedIds, usedTypes);
    if (!picked) continue;

    localUsedIds.add(picked.id);
    globalUsedIds.add(picked.id);
    usedTypes.set(picked.type, (usedTypes.get(picked.type) ?? 0) + 1);
    items.push(toItineraryItem(picked, slot, pref));

    if (items.length >= 4) break;
  }

  const hasFood = items.some((i) => i.type === 'food');
  if (!hasFood) {
    const foodFallback = selected.find((i) => i.type === 'food' && !localUsedIds.has(i.id));
    if (foodFallback) {
      items.splice(Math.min(1, items.length), 0, toItineraryItem(foodFallback, '中午', pref));
      localUsedIds.add(foodFallback.id);
      globalUsedIds.add(foodFallback.id);
    }
  }

  const hasExperience = items.some((i) => i.type === 'attraction' || i.type === 'culture');
  if (!hasExperience) {
    const expFallback = selected.find(
      (i) => (i.type === 'attraction' || i.type === 'culture') && !localUsedIds.has(i.id),
    );
    if (expFallback) {
      items.unshift(toItineraryItem(expFallback, '上午', pref));
      localUsedIds.add(expFallback.id);
      globalUsedIds.add(expFallback.id);
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

function getDayThemes(destination: string): Array<{ title: string; story: string }> {
  return cityDayThemes[destination] ?? cityDayThemes['重庆'];
}

export function generateItineraryPlan(
  pref: UserPreference,
  selectedItems: RecommendationItem[],
): ItineraryPlan {
  const usable =
    selectedItems.length >= 2 ? selectedItems : generateRecommendations(pref).slice(0, 7);

  const themes = getDayThemes(pref.destination);
  const globalUsedIds = new Set<string>();

  const days: ItineraryDay[] = Array.from({ length: pref.duration }).map((_, idx) => ({
    dayNumber: idx + 1,
    title: `Day ${idx + 1} · ${themes[idx % themes.length].title}`,
    story: themes[idx % themes.length].story,
    items: buildDayItems(usable, pref, globalUsedIds),
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
  const themes = getDayThemes(plan.destination);
  const usedInOtherDays = new Set<string>(
    plan.days
      .filter((d) => d.dayNumber !== dayNumber)
      .flatMap((d) => d.items.map((i) => i.id.split('-').slice(0, -1).join('-'))),
  );

  const nextDays = plan.days.map((day) =>
    day.dayNumber === dayNumber
      ? {
          ...day,
          title: `Day ${dayNumber} · ${themes[(dayNumber + 1) % themes.length].title}`,
          story: themes[(dayNumber + 1) % themes.length].story,
          items: buildDayItems(plan.selectedItems, plan.preference, usedInOtherDays),
        }
      : day,
  );

  return { ...plan, days: nextDays };
}

export function getSamplePlan(): ItineraryPlan {
  const pref: UserPreference = {
    destination: '重庆',
    duration: 3,
    budgetLevel: 'medium',
    interests: ['历史文化', '美食', '城市漫步'],
    travelStyle: 'cultural',
    staminaLevel: 'medium',
    transportPreferences: ['地铁'],
    companionCount: '2 人',
  };

  const selected = generateRecommendations(pref).map((i) => ({ ...i, selected: true }));
  return generateItineraryPlan(pref, selected);
}
