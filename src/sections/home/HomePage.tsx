import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRef, type RefObject } from 'react';

type HomePageProps = {
  onStartPlanning: () => void;
};

const steps = [
  { icon: '📍', title: '选择目的地', desc: '从热门城市中选择本次旅行目的地。' },
  { icon: '💰', title: '设置预算与天数', desc: '明确预算区间和出行时长，控制节奏。' },
  { icon: '🎯', title: '勾选兴趣偏好', desc: '选择美食、文化、夜景、城市漫步等偏好。' },
  { icon: '🗺️', title: '生成专属行程', desc: '输出结构化 Day by Day 行程并可微调。' },
];

export function HomePage({ onStartPlanning }: HomePageProps) {
  const sampleRef = useRef<HTMLElement | null>(null);

  const scrollToSample = () => {
    sampleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-8">
      <HeroSection onStartPlanning={onStartPlanning} onViewSample={scrollToSample} />
      <HowItWorksSection />
      <OutputPreviewSection />
      <DifferentiatorSection />
      <SampleItinerarySection onStartPlanning={onStartPlanning} sampleRef={sampleRef} />
    </div>
  );
}

function HeroSection({ onStartPlanning, onViewSample }: { onStartPlanning: () => void; onViewSample: () => void }) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <Card className="border-slate-200">
        <CardHeader className="gap-3">
          <CardTitle className="text-3xl">AI 个性化旅游规划</CardTitle>
          <CardDescription className="text-base leading-7">
            根据目的地、预算、时间和兴趣，生成带有文化深度的专属行程。
          </CardDescription>
          <p className="text-sm text-muted-foreground">适合大学生、年轻旅行者、轻度自由行用户</p>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button size="lg" onClick={onStartPlanning}>开始规划</Button>
          <Button size="lg" variant="outline" onClick={onViewSample}>查看示例行程</Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-slate-100">
        <CardHeader>
          <CardTitle className="text-lg">示例结果预览</CardTitle>
          <CardDescription>重庆 · 3天 · 文化深度游</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-2">
            <Badge variant="outline">中预算</Badge>
            <Badge variant="outline">文化深度</Badge>
          </div>
          <p className="rounded-md border bg-white p-3 text-xs text-slate-600">3天内串联老街、人文与夜景，节奏松弛但内容完整。</p>
          <p className="rounded-md bg-amber-50 p-2 text-xs font-medium text-amber-700">高亮行程点：洪崖洞夜景 + 江边步行段</p>
          {['Day 1 山城初识', 'Day 2 老街与江景', 'Day 3 博物馆与夜市'].map((d) => (
            <div key={d} className="rounded-md border bg-white p-3 font-medium">{d}</div>
          ))}
          <div className="flex gap-2">
            <Badge variant="outline">结构化日程</Badge>
            <Badge variant="outline">可二次调整</Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">4步生成你的专属旅行计划</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <Card key={step.title} className="border-slate-200">
            <CardContent className="space-y-2 pt-6">
              <div className="text-2xl">{step.icon}</div>
              <p className="text-xs text-muted-foreground">STEP {idx + 1}</p>
              <p className="font-semibold">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function OutputPreviewSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">你将获得什么</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">景点推荐</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc space-y-1 pl-4"><li>洪崖洞</li><li>李子坝</li><li>磁器口</li></ul>
            <div className="flex gap-2"><Badge variant="outline">夜景</Badge><Badge variant="outline">地标</Badge><Badge variant="outline">老街</Badge><Badge variant="outline">2h-3h</Badge></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">美食推荐</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc space-y-1 pl-4"><li>重庆小面（早餐）</li><li>老火锅（晚餐）</li><li>江边夜市小吃（宵夜）</li></ul>
            <div className="flex gap-2"><Badge variant="outline">人均¥25-120</Badge><Badge variant="outline">地道口味</Badge><Badge variant="outline">分时段推荐</Badge></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">文化体验</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc space-y-1 pl-4"><li>川剧变脸</li><li>山城步道</li><li>老茶馆体验</li></ul>
            <div className="flex gap-2"><Badge variant="outline">非遗</Badge><Badge variant="outline">在地文化</Badge><Badge variant="outline">可替换</Badge></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">每日行程单</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border bg-slate-50 p-3">
              <p>上午：解放碑城市漫步</p>
              <p>下午：山城步道 + 老街体验</p>
              <p>晚上：洪崖洞夜景 + 火锅</p>
            </div>
            <Badge variant="outline">上午 / 下午 / 晚上节奏</Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function DifferentiatorSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">为什么不是普通攻略网站</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="font-semibold">按预算筛选推荐内容</p><p className="mt-2 text-sm text-muted-foreground">自动过滤高/中/低预算项目，减少无效信息。</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="font-semibold">不只推荐景点，也补充文化体验</p><p className="mt-2 text-sm text-muted-foreground">从“看景点”升级到“体验一座城市”。</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="font-semibold">自动生成上午 / 下午 / 晚上的行程节奏</p><p className="mt-2 text-sm text-muted-foreground">避免一天安排混乱，形成可执行日程。</p></CardContent></Card>
      </div>
    </section>
  );
}

function SampleItinerarySection({
  onStartPlanning,
  sampleRef,
}: {
  onStartPlanning: () => void;
  sampleRef: RefObject<HTMLElement | null>;
}) {
  return (
    <section ref={sampleRef} className="space-y-3">
      <h2 className="text-2xl font-semibold">示例行程</h2>
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>重庆 · 3天</CardTitle>
          <CardDescription>
            <span className="mr-4">风格：文化深度 / 城市漫步</span>
            <span>预算：中预算</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <TimelineItem day="Day 1" content="解放碑 → 山城步道 → 洪崖洞夜景" />
          <TimelineItem day="Day 2" content="磁器口 → 老茶馆 → 川剧体验" />
          <TimelineItem day="Day 3" content="三峡博物馆 → 李子坝 → 江边夜市" />
          <Button className="mt-3" onClick={onStartPlanning}>我也生成类似行程</Button>
        </CardContent>
      </Card>
    </section>
  );
}

function TimelineItem({ day, content }: { day: string; content: string }) {
  return (
    <div className="flex items-start gap-3 rounded-md border bg-white p-3">
      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
      <div>
        <p className="font-medium">{day}</p>
        <p className="text-muted-foreground">{content}</p>
      </div>
    </div>
  );
}
