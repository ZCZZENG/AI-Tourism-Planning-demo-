import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type HomePageProps = {
  onStartPlanning: () => void;
  onViewSample: () => void;
};

const steps = [
  { num: '01', title: '选择目的地', desc: '从重庆、成都、北京、西安、上海中选择，或自由输入。' },
  { num: '02', title: '设定偏好', desc: '预算、天数、兴趣标签、旅行风格，一次填完。' },
  { num: '03', title: '挑选内容', desc: '从 AI 推荐的景点、美食、文化体验中选你感兴趣的。' },
  { num: '04', title: '获得行程', desc: '按天生成结构化日程，可随时调整、保存或导出。' },
];

const differentiators = [
  {
    icon: '🎯',
    title: '按偏好精准匹配',
    desc: '根据兴趣、预算、体力强度过滤推荐，减少无关信息干扰。',
  },
  {
    icon: '📖',
    title: '文化故事加持',
    desc: '每日行程配有故事化叙述，从"看景点"升级到"体验一座城市"。',
  },
  {
    icon: '🗓️',
    title: '结构化时间安排',
    desc: '自动生成上午 / 下午 / 晚上节奏，可一键重生成单日或整份行程。',
  },
];

const sampleDays = [
  {
    day: 'Day 1',
    title: '山城初识',
    story: '从城市地标和街区烟火切入，先建立你与这座城的第一层连接。',
    items: [
      { name: '磁器口古镇', type: 'attraction', slot: '上午' },
      { name: '重庆小面', type: 'food', slot: '中午' },
      { name: '山城步道', type: 'attraction', slot: '下午' },
      { name: '洪崖洞夜景', type: 'culture', slot: '晚上' },
    ],
  },
  {
    day: 'Day 2',
    title: '老街与人文',
    story: '把脚步放慢一点，在街巷和文化体验里读懂重庆的日常。',
    items: [
      { name: '十八梯老街讲解', type: 'culture', slot: '上午' },
      { name: '洞子火锅', type: 'food', slot: '中午' },
      { name: '鹅岭二厂', type: 'attraction', slot: '下午' },
      { name: '川剧变脸体验', type: 'culture', slot: '晚上' },
    ],
  },
  {
    day: 'Day 3',
    title: '江景收束',
    story: '以夜色与在地美食收尾，把旅程记忆留在最有氛围的片段里。',
    items: [
      { name: '三峡博物馆', type: 'culture', slot: '上午' },
      { name: '江湖菜馆', type: 'food', slot: '中午' },
      { name: '李子坝观景平台', type: 'attraction', slot: '下午' },
      { name: '长江夜游', type: 'culture', slot: '晚上' },
    ],
  },
];

const typeColors: Record<string, string> = {
  attraction: 'bg-teal-100 text-teal-700',
  food: 'bg-amber-100 text-amber-700',
  culture: 'bg-purple-100 text-purple-700',
};

const dayGradients = [
  'from-[#264653] to-[#2a9d8f]',
  'from-teal-800 to-teal-600',
  'from-violet-800 to-violet-600',
];

export function HomePage({ onStartPlanning, onViewSample }: HomePageProps) {
  return (
    <div className="space-y-12">
      <HeroSection onStartPlanning={onStartPlanning} onViewSample={onViewSample} />
      <StepsSection />
      <DifferentiatorsSection />
      <SampleSection onStartPlanning={onStartPlanning} />
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────

function HeroSection({ onStartPlanning, onViewSample }: HomePageProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#264653] via-[#2d5a6b] to-[#2a9d8f] px-8 py-16 text-white shadow-lg">
      {/* 装饰元素 */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-10 right-24 h-48 w-48 rounded-full bg-[#e9c46a]/10" />
      <div className="pointer-events-none absolute right-1/3 top-10 h-5 w-5 rounded-full bg-[#e9c46a]/40" />
      <div className="pointer-events-none absolute right-1/4 bottom-16 h-3 w-3 rounded-full bg-white/20" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto]">
        {/* 左侧文案 */}
        <div className="max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-teal-100 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#e9c46a]" />
            AI 驱动 · 个性化旅行规划
          </div>

          <h1
            className="mb-4 text-5xl font-bold leading-tight text-white"
            style={{ fontFamily: 'Noto Serif SC' }}
          >
            把旅行灵感<br />变成专属行程
          </h1>

          <p className="mb-8 max-w-md text-lg leading-relaxed text-teal-100">
            输入目的地、预算与兴趣，获得带有文化深度的 Day by Day 行程。
            适合大学生与年轻自由行用户。
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={onStartPlanning}
              className="bg-[#e9c46a] px-6 font-semibold text-[#264653] shadow-md hover:bg-[#f4d587]"
            >
              开始规划 →
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onViewSample}
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              查看示例行程
            </Button>
          </div>

          {/* 城市标签 */}
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="text-xs text-teal-300">支持城市：</span>
            {['重庆', '成都', '北京', '西安', '上海'].map((city) => (
              <span
                key={city}
                className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-teal-100"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* 右侧预览卡（大屏） */}
        <div className="hidden lg:block">
          <div className="w-52 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#e9c46a]" />
              <p className="text-xs font-semibold text-teal-200">重庆 · 3天示例</p>
            </div>
            {sampleDays.map((d) => (
              <div key={d.day} className="mb-3 last:mb-0">
                <p className="text-[11px] font-bold text-[#e9c46a]">
                  {d.day} · {d.title}
                </p>
                <div className="mt-1 space-y-0.5">
                  {d.items.map((item) => (
                    <p key={item.name} className="text-[10px] text-white/60">
                      {item.slot} · {item.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Steps ──────────────────────────────────────────────────────────────────────

function StepsSection() {
  return (
    <section className="space-y-5">
      <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Noto Serif SC' }}>
        4 步生成你的专属行程
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <Card key={step.num} className="shadow-xs transition-shadow hover:shadow-sm">
            <CardContent className="pb-5 pt-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#264653] text-sm font-bold text-[#e9c46a]">
                {step.num}
              </div>
              <p className="mb-1 font-semibold text-slate-800">{step.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ── Differentiators ────────────────────────────────────────────────────────────

function DifferentiatorsSection() {
  return (
    <section className="space-y-5">
      <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Noto Serif SC' }}>
        为什么不是普通攻略网站
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {differentiators.map((d) => (
          <Card key={d.title} className="shadow-xs">
            <CardContent className="pb-5 pt-5">
              <div className="mb-3 text-3xl">{d.icon}</div>
              <p className="mb-1.5 font-semibold text-slate-800">{d.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ── Sample Itinerary ───────────────────────────────────────────────────────────

function SampleSection({ onStartPlanning }: { onStartPlanning: () => void }) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Noto Serif SC' }}>
          示例行程：重庆 3 天
        </h2>
        <div className="flex gap-1.5">
          <Badge variant="outline" className="text-xs">中预算</Badge>
          <Badge variant="outline" className="border-teal-200 text-xs text-teal-600">文化深度</Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {sampleDays.map((day, idx) => (
          <Card key={day.day} className="overflow-hidden shadow-xs">
            {/* Day 头部 */}
            <div className={cn('bg-gradient-to-r px-4 py-3 text-white', dayGradients[idx])}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ fontFamily: 'Noto Serif SC' }}>
                    {day.day} · {day.title}
                  </p>
                </div>
              </div>
              <p className="mt-1.5 text-xs italic text-white/70">{day.story}</p>
            </div>

            {/* 行程项 */}
            <CardContent className="pt-3 pb-4">
              <div className="space-y-2">
                {day.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-8 shrink-0 text-center text-[10px] font-medium text-muted-foreground">
                      {item.slot}
                    </span>
                    <span
                      className={cn(
                        'flex-1 rounded-md px-2.5 py-1.5 text-xs font-medium',
                        typeColors[item.type] ?? 'bg-slate-100 text-slate-600',
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border bg-white px-5 py-4 shadow-xs">
        <p className="mb-3 text-sm text-muted-foreground">
          以上为系统根据"文化深度 · 中预算 · 历史文化/美食"偏好自动生成的行程示例。
          选择不同偏好，每次生成结果都会不同。
        </p>
        <Button
          onClick={onStartPlanning}
          className="bg-[#2a9d8f] font-medium text-white hover:bg-[#21867a]"
        >
          生成我的行程 →
        </Button>
      </div>
    </section>
  );
}
