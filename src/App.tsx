import { useEffect, useMemo, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { HomePage } from '@/sections/home/HomePage';
import { generateItineraryPlan, generateRecommendations, regenerateDay } from '@/data/planner';
import { deletePlan, getSavedPlans, savePlan } from '@/lib/storage';
import type { ItineraryPlan, RecommendationItem, UserPreference } from '@/types';

type RoutePath = '/' | '/planning' | '/recommendation' | '/itinerary' | '/saved';

const CITIES = ['重庆', '成都', '北京', '西安', '上海'];
const DURATION = [1, 2, 3, 4, 5];
const BUDGET = [
  { value: 'low', label: '低预算', desc: '500-1000' },
  { value: 'medium', label: '中预算', desc: '1000-3000' },
  { value: 'high', label: '高预算', desc: '3000+' },
] as const;
const INTERESTS = ['美食', '历史文化', '自然风景', '城市漫步', '艺术展览', '夜生活', '打卡拍照', '小众体验'];
const STYLE = [
  { value: 'relaxed', label: '轻松悠闲' },
  { value: 'cultural', label: '文化深度' },
  { value: 'efficient', label: '高效打卡' },
  { value: 'foodie', label: '美食优先' },
  { value: 'atmosphere', label: '氛围感体验' },
] as const;
const STAMINA = [
  { value: 'light', label: '轻度' },
  { value: 'medium', label: '中等' },
  { value: 'high', label: '高强度' },
] as const;
const TRANSPORTS = ['步行', '地铁', '公交', '打车', '共享单车'];
const COMPANIONS = ['1 人', '2 人', '3-4 人', '5 人以上'];

const initialPref: UserPreference = {
  destination: '',
  duration: 3,
  budgetLevel: 'medium',
  interests: [],
  travelStyle: 'relaxed',
  staminaLevel: 'medium',
  transportPreferences: ['地铁'],
  companionCount: '2 人',
};

function navigate(path: RoutePath): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function App() {
  const [route, setRoute] = useState<RoutePath>((window.location.pathname as RoutePath) || '/');
  const [loading, setLoading] = useState(false);
  const [pref, setPref] = useState<UserPreference>(initialPref);
  const [seed, setSeed] = useState(0);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [plan, setPlan] = useState<ItineraryPlan | null>(null);
  const [saved, setSaved] = useState<ItineraryPlan[]>(() => getSavedPlans());

  useEffect(() => {
    const onPopState = () => {
      const current = window.location.pathname as RoutePath;
      setRoute(['/', '/planning', '/recommendation', '/itinerary', '/saved'].includes(current) ? current : '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    onPopState();
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const selectedCount = useMemo(() => recommendations.filter((i) => i.selected).length, [recommendations]);
  const requiredValid = Boolean(
    pref.destination &&
    pref.duration &&
    pref.budgetLevel &&
    pref.interests.length > 0 &&
    pref.travelStyle &&
    pref.staminaLevel &&
    pref.transportPreferences.length > 0,
  );

  const updateMulti = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const runRecommendations = async (regen = false) => {
    if (!requiredValid) {
      toast.error('请先补全必填项');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const nextSeed = regen ? seed + 1 : seed;
    setSeed(nextSeed);
    setRecommendations(generateRecommendations(pref, nextSeed));
    setLoading(false);
    navigate('/recommendation');
  };

  const generatePlan = async () => {
    if (selectedCount < 2) {
      toast.error('请至少选择 2 个项目后再生成行程');
      return;
    }
    setLoading(true);
    const loadingTexts = ['正在分析你的旅行偏好', '正在组合景点与文化体验', '正在生成故事化行程'];
    toast.loading(loadingTexts[Math.floor(Math.random() * loadingTexts.length)], { id: 'gen' });
    await new Promise((r) => setTimeout(r, 1000));
    const result = generateItineraryPlan(pref, recommendations.filter((i) => i.selected));
    setPlan(result);
    toast.success('行程生成完成', { id: 'gen' });
    setLoading(false);
    navigate('/itinerary');
  };

  const saveCurrentPlan = () => {
    if (!plan) return;
    savePlan(plan);
    setSaved(getSavedPlans());
    toast.success('保存成功，已写入本地');
  };

  const exportMarkdown = (p: ItineraryPlan) => {
    const lines = [`# ${p.destination} ${p.duration}天行程`, '', `创建时间：${new Date(p.createdAt).toLocaleString()}`, ''];
    p.days.forEach((d) => {
      lines.push(`## ${d.title}`, d.story, '');
      d.items.forEach((i) => lines.push(`- **${i.timeSlot}** ${i.name}（${i.type}）- ${i.description}`));
      lines.push('');
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${p.destination}-${p.duration}天-行程.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toaster richColors position="top-center" />
      <AppLayout
        onGoHome={() => navigate('/')}
        onStartPlanning={() => navigate('/planning')}
        onViewSaved={() => navigate('/saved')}
      >
        {route === '/' && <HomePage onStartPlanning={() => navigate('/planning')} onViewSample={() => navigate('/itinerary')} />}

        {route === '/planning' && (
          <PlanningPage
            pref={pref}
            setPref={setPref}
            loading={loading}
            requiredValid={requiredValid}
            onGenerate={() => void runRecommendations()}
            updateMulti={updateMulti}
          />
        )}

        {route === '/recommendation' && (
          <RecommendationPage
            pref={pref}
            recommendations={recommendations}
            selectedCount={selectedCount}
            loading={loading}
            onRefresh={() => void runRecommendations(true)}
            onToggle={(id) =>
              setRecommendations((prev) => prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
            }
            onGeneratePlan={() => void generatePlan()}
          />
        )}

        {route === '/itinerary' && plan && (
          <ItineraryPage
            pref={pref}
            plan={plan}
            onRegenerateAll={() => setPlan(generateItineraryPlan(pref, recommendations.filter((i) => i.selected)))}
            onBackToPlanning={() => navigate('/planning')}
            onSave={saveCurrentPlan}
            onRegenerateDay={(dayNumber) => setPlan((prev) => (prev ? regenerateDay(prev, dayNumber) : prev))}
            onDeleteItem={(dayNumber, itemId) =>
              setPlan((prev) =>
                prev
                  ? {
                      ...prev,
                      days: prev.days.map((day) =>
                        day.dayNumber === dayNumber ? { ...day, items: day.items.filter((it) => it.id !== itemId) } : day,
                      ),
                    }
                  : prev,
              )
            }
          />
        )}

        {route === '/itinerary' && !plan && (
          <Card><CardContent className="pt-6">暂无行程，请先完成推荐选择并生成行程。</CardContent></Card>
        )}

        {route === '/saved' && (
          <SavedPage
            saved={saved}
            onOpen={(p) => {
              setPlan(p);
              navigate('/itinerary');
            }}
            onDelete={(id) => {
              deletePlan(id);
              setSaved(getSavedPlans());
            }}
            onExport={exportMarkdown}
          />
        )}
      </AppLayout>
    </div>
  );
}

function AppLayout({
  children,
  onGoHome,
  onStartPlanning,
  onViewSaved,
}: {
  children: React.ReactNode;
  onGoHome: () => void;
  onStartPlanning: () => void;
  onViewSaved: () => void;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button className="text-xl font-bold" onClick={onGoHome}>灵犀逸行</button>
          <div className="space-x-2">
            <Button onClick={onStartPlanning}>开始规划</Button>
            <Button variant="outline" onClick={onViewSaved}>保存行程</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}

function PlanningPage({
  pref,
  setPref,
  loading,
  requiredValid,
  onGenerate,
  updateMulti,
}: {
  pref: UserPreference;
  setPref: (value: UserPreference) => void;
  loading: boolean;
  requiredValid: boolean;
  onGenerate: () => void;
  updateMulti: (list: string[], value: string) => string[];
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">偏好采集</h2>
      <Card>
        <CardContent className="grid gap-4 pt-6">
          <label className="space-y-2">
            <span>旅行目的地 *</span>
            <Input
              list="cities"
              value={pref.destination}
              onChange={(e) => setPref({ ...pref, destination: e.target.value })}
              placeholder="输入或选择城市"
            />
            <datalist id="cities">{CITIES.map((c) => <option key={c} value={c} />)}</datalist>
          </label>
          <OptionRow
            title="出行时长 *"
            options={DURATION.map((d) => `${d} 天`)}
            current={`${pref.duration} 天`}
            onSelect={(v) => setPref({ ...pref, duration: Number(v[0]) })}
          />
          <OptionRow
            title="出行预算 *"
            options={BUDGET.map((b) => `${b.label} (${b.desc})`)}
            current={`${BUDGET.find((b) => b.value === pref.budgetLevel)?.label} (${BUDGET.find((b) => b.value === pref.budgetLevel)?.desc})`}
            onSelect={(v) =>
              setPref({
                ...pref,
                budgetLevel: BUDGET.find((b) => `${b.label} (${b.desc})` === v)?.value ?? 'medium',
              })
            }
          />
          <MultiRow
            title="兴趣偏好 *"
            options={INTERESTS}
            selected={pref.interests}
            onToggle={(v) => setPref({ ...pref, interests: updateMulti(pref.interests, v) })}
          />
          <OptionRow
            title="旅行风格 *"
            options={STYLE.map((s) => s.label)}
            current={STYLE.find((s) => s.value === pref.travelStyle)?.label ?? ''}
            onSelect={(v) => setPref({ ...pref, travelStyle: STYLE.find((s) => s.label === v)?.value ?? 'relaxed' })}
          />
          <OptionRow
            title="每日体力强度 *"
            options={STAMINA.map((s) => s.label)}
            current={STAMINA.find((s) => s.value === pref.staminaLevel)?.label ?? ''}
            onSelect={(v) => setPref({ ...pref, staminaLevel: STAMINA.find((s) => s.label === v)?.value ?? 'medium' })}
          />
          <MultiRow
            title="出行方式偏好 *"
            options={TRANSPORTS}
            selected={pref.transportPreferences}
            onToggle={(v) => setPref({ ...pref, transportPreferences: updateMulti(pref.transportPreferences, v) })}
          />
          <OptionRow
            title="同行人数 *"
            options={COMPANIONS}
            current={pref.companionCount}
            onSelect={(v) => setPref({ ...pref, companionCount: v })}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              placeholder="可选：出发地"
              value={pref.departureCity ?? ''}
              onChange={(e) => setPref({ ...pref, departureCity: e.target.value })}
            />
            <Input type="date" value={pref.startDate ?? ''} onChange={(e) => setPref({ ...pref, startDate: e.target.value })} />
          </div>
        </CardContent>
      </Card>
      <Button disabled={!requiredValid || loading} onClick={onGenerate}>{loading ? '生成中...' : '生成推荐'}</Button>
    </div>
  );
}

function RecommendationPage({
  pref,
  recommendations,
  selectedCount,
  loading,
  onRefresh,
  onToggle,
  onGeneratePlan,
}: {
  pref: UserPreference;
  recommendations: RecommendationItem[];
  selectedCount: number;
  loading: boolean;
  onRefresh: () => void;
  onToggle: (id: string) => void;
  onGeneratePlan: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 rounded-lg border bg-white p-3">
        当前偏好：
        <Badge>{pref.destination}</Badge>
        <Badge>{pref.duration}天</Badge>
        {pref.interests.map((i) => <Badge key={i} variant="outline">{i}</Badge>)}
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium">已选 {selectedCount} 项</p>
        <div className="space-x-2">
          <Button variant="outline" onClick={onRefresh}>换一批</Button>
          <Button variant="outline" onClick={onRefresh}>重新生成推荐</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((item) => (
          <Card key={item.id} className={item.selected ? 'ring-2 ring-primary' : ''}>
            <CardHeader>
              <CardTitle className="text-base">{item.name}</CardTitle>
              <CardDescription>{item.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>推荐理由：{item.reason}</p>
              <div className="flex gap-2">
                <Badge variant="outline">{item.popularity === 'hot' ? '热门' : '小众'}</Badge>
                <Badge variant="outline">{item.type === 'attraction' ? '景点' : item.type === 'food' ? '美食' : '文化'}</Badge>
              </div>
              <Button className="w-full" variant={item.selected ? 'secondary' : 'default'} onClick={() => onToggle(item.id)}>
                {item.selected ? '取消选择' : '加入行程'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button size="lg" disabled={selectedCount < 2 || loading} onClick={onGeneratePlan}>生成行程</Button>
    </div>
  );
}

function ItineraryPage({
  pref,
  plan,
  onRegenerateAll,
  onBackToPlanning,
  onSave,
  onRegenerateDay,
  onDeleteItem,
}: {
  pref: UserPreference;
  plan: ItineraryPlan;
  onRegenerateAll: () => void;
  onBackToPlanning: () => void;
  onSave: () => void;
  onRegenerateDay: (dayNumber: number) => void;
  onDeleteItem: (dayNumber: number, itemId: string) => void;
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{plan.destination} · {plan.duration} 天行程</CardTitle>
          <CardDescription>偏好摘要：目的地 {pref.destination} ｜ 天数 {pref.duration} ｜ 兴趣 {pref.interests.join('、')}</CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={onRegenerateAll}>重新生成整份行程</Button>
        <Button variant="outline" onClick={onBackToPlanning}>返回修改偏好</Button>
        <Button onClick={onSave}>保存行程</Button>
      </div>

      {plan.days.map((day) => (
        <Card key={day.dayNumber}>
          <CardHeader>
            <CardTitle>Day {day.dayNumber} · {day.title.replace(`Day ${day.dayNumber} · `, '')}</CardTitle>
            <CardDescription>{day.story}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button size="sm" variant="outline" onClick={() => onRegenerateDay(day.dayNumber)}>仅重生成某一天</Button>
            {day.items.map((item) => (
              <div key={item.id} className="rounded-lg border bg-white p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <strong>{item.timeSlot} · {item.name}</strong>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.type === 'attraction' ? '景点' : item.type === 'food' ? '美食' : '文化'}</Badge>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteItem(day.dayNumber, item.id)}>删除</Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-sm">推荐理由：{item.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SavedPage({
  saved,
  onOpen,
  onDelete,
  onExport,
}: {
  saved: ItineraryPlan[];
  onOpen: (plan: ItineraryPlan) => void;
  onDelete: (id: string) => void;
  onExport: (plan: ItineraryPlan) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">已保存行程</h2>
      {saved.length === 0 && <Card><CardContent className="pt-6">暂无已保存行程</CardContent></Card>}
      {saved.map((p) => (
        <Card key={p.id}>
          <CardHeader>
            <CardTitle>{p.destination} · {p.duration} 天</CardTitle>
            <CardDescription>{new Date(p.createdAt).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button onClick={() => onOpen(p)}>打开详情</Button>
            <Button variant="outline" onClick={() => onExport(p)}>导出 Markdown</Button>
            <Button variant="destructive" onClick={() => onDelete(p.id)}>删除</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function OptionRow({
  title,
  options,
  current,
  onSelect,
}: {
  title: string;
  options: string[];
  current: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p>{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            className={`rounded-full border px-3 py-1 text-sm ${current === o ? 'bg-slate-900 text-white' : 'bg-white'}`}
            onClick={() => onSelect(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiRow({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p>{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            className={`rounded-full border px-3 py-1 text-sm ${selected.includes(o) ? 'bg-primary text-white' : 'bg-white'}`}
            onClick={() => onToggle(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
