import React, { useEffect, useMemo, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { HomePage } from '@/sections/home/HomePage';
import { generateItineraryPlan, generateRecommendations, getSamplePlan, regenerateDay } from '@/data/planner';
import { deletePlan, getSavedPlans, savePlan } from '@/lib/storage';
import type { ItineraryPlan, RecommendationItem, UserPreference } from '@/types';

type RoutePath = '/' | '/planning' | '/recommendation' | '/itinerary' | '/saved';

const ROUTE_LIST: RoutePath[] = ['/', '/planning', '/recommendation', '/itinerary', '/saved'];

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

const STYLE_LABEL_MAP: Record<UserPreference['travelStyle'], string> = {
  relaxed: '轻松悠闲',
  cultural: '文化深度',
  efficient: '高效打卡',
  foodie: '美食优先',
  atmosphere: '氛围感体验',
};

const BUDGET_LABEL_MAP: Record<UserPreference['budgetLevel'], string> = {
  low: '低预算',
  medium: '中预算',
  high: '高预算',
};

const STAMINA = [
  { value: 'light', label: '轻度' },
  { value: 'medium', label: '中等' },
  { value: 'high', label: '高强度' },
] as const;

const TRANSPORTS = ['步行', '地铁', '公交', '打车', '共享单车'];
const COMPANIONS = ['1 人', '2 人', '3-4 人', '5 人以上'];

const TYPE_CONFIG: Record<string, { label: string; icon: string; bandClass: string; badgeClass: string; dotClass: string }> = {
  attraction: {
    label: '景点',
    icon: '🏛️',
    bandClass: 'bg-teal-500',
    badgeClass: 'border-teal-200 text-teal-700 bg-teal-50',
    dotClass: 'bg-teal-500',
  },
  food: {
    label: '美食',
    icon: '🍜',
    bandClass: 'bg-amber-500',
    badgeClass: 'border-amber-200 text-amber-700 bg-amber-50',
    dotClass: 'bg-amber-500',
  },
  culture: {
    label: '文化',
    icon: '🎭',
    bandClass: 'bg-purple-500',
    badgeClass: 'border-purple-200 text-purple-700 bg-purple-50',
    dotClass: 'bg-purple-500',
  },
  transport: {
    label: '交通',
    icon: '🚌',
    bandClass: 'bg-slate-400',
    badgeClass: 'border-slate-200 text-slate-600 bg-slate-50',
    dotClass: 'bg-slate-400',
  },
};

const DAY_GRADIENTS = [
  'from-[#264653] to-[#2a9d8f]',
  'from-teal-800 to-teal-600',
  'from-violet-800 to-violet-600',
  'from-slate-700 to-slate-500',
  'from-emerald-800 to-emerald-600',
];

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
      setRoute(ROUTE_LIST.includes(current) ? current : '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    onPopState();
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const selectedCount = useMemo(
    () => recommendations.filter((i) => i.selected).length,
    [recommendations],
  );

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
    if (!requiredValid) { toast.error('请先补全必填项'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const nextSeed = regen ? seed + 1 : seed;
    setSeed(nextSeed);
    setRecommendations(generateRecommendations(pref, nextSeed));
    setLoading(false);
    navigate('/recommendation');
  };

  const generatePlan = async () => {
    if (selectedCount < 2) { toast.error('请至少选择 2 个项目后再生成行程'); return; }
    setLoading(true);
    const loadingTexts = ['正在分析你的旅行偏好', '正在组合景点与文化体验', '正在生成故事化行程'];
    toast.loading(loadingTexts[Math.floor(Math.random() * loadingTexts.length)], { id: 'gen' });
    await new Promise((r) => setTimeout(r, 1000));
    setPlan(generateItineraryPlan(pref, recommendations.filter((i) => i.selected)));
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
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />
      <AppLayout
        onGoHome={() => navigate('/')}
        onStartPlanning={() => navigate('/planning')}
        onViewSaved={() => navigate('/saved')}
      >
        {route === '/' && (
          <HomePage
            onStartPlanning={() => navigate('/planning')}
            onViewSample={() => { setPlan(getSamplePlan()); navigate('/itinerary'); }}
          />
        )}

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

        {route === '/recommendation' && recommendations.length > 0 && (
          <RecommendationPage
            pref={pref}
            recommendations={recommendations}
            selectedCount={selectedCount}
            loading={loading}
            onRefresh={() => void runRecommendations(true)}
            onToggle={(id) =>
              setRecommendations((prev) =>
                prev.map((item) => item.id === id ? { ...item, selected: !item.selected } : item),
              )
            }
            onGeneratePlan={() => void generatePlan()}
            onBackToPlanning={() => navigate('/planning')}
          />
        )}

        {route === '/recommendation' && recommendations.length === 0 && (
          <Card className="shadow-sm">
            <CardContent className="flex items-center justify-between gap-3 pt-6">
              <span className="text-muted-foreground">当前还没有推荐内容，请先填写偏好并生成推荐。</span>
              <Button onClick={() => navigate('/planning')}>去偏好页</Button>
            </CardContent>
          </Card>
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
                prev ? {
                  ...prev,
                  days: prev.days.map((day) =>
                    day.dayNumber === dayNumber
                      ? { ...day, items: day.items.filter((it) => it.id !== itemId) }
                      : day,
                  ),
                } : prev,
              )
            }
          />
        )}

        {route === '/itinerary' && !plan && (
          <Card className="shadow-sm">
            <CardContent className="flex items-center justify-between gap-3 pt-6">
              <span className="text-muted-foreground">暂无行程，请先完成推荐选择并生成行程。</span>
              <Button onClick={() => navigate('/planning')}>去开始规划</Button>
            </CardContent>
          </Card>
        )}

        {route === '/saved' && (
          <SavedPage
            saved={saved}
            onOpen={(p) => { setPlan(p); navigate('/itinerary'); }}
            onDelete={(id) => { deletePlan(id); setSaved(getSavedPlans()); }}
            onExport={exportMarkdown}
          />
        )}
      </AppLayout>
    </div>
  );
}

// ── Layout ─────────────────────────────────────────────────────────────────────

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
      <header className="sticky top-0 z-50 bg-[#264653] shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button onClick={onGoHome} className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2a9d8f] shadow-sm transition-transform group-hover:scale-105">
              <span className="text-lg leading-none text-white">✈</span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-base font-bold text-white" style={{ fontFamily: 'Noto Serif SC' }}>
                灵犀逸行
              </span>
              <span className="mt-0.5 text-[11px] text-teal-300">AI 旅游规划</span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={onStartPlanning}
              className="text-sm text-teal-100 hover:bg-white/10 hover:text-white"
            >
              开始规划
            </Button>
            <Button
              onClick={onViewSaved}
              className="bg-[#e9c46a] text-sm font-semibold text-[#264653] hover:bg-[#f4d587]"
            >
              我的行程
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}

// ── Planning Page ──────────────────────────────────────────────────────────────

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 pt-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      </CardHeader>
      <CardContent className="grid gap-5 pb-5">{children}</CardContent>
    </Card>
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
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Noto Serif SC' }}>
          填写旅行偏好
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">带 * 为必填，完成后为你生成专属推荐</p>
      </div>

      <FormSection title="目的地 & 基本信息">
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700">目的地 *</span>
          <Input
            list="cities"
            value={pref.destination}
            onChange={(e) => setPref({ ...pref, destination: e.target.value })}
            placeholder="输入或选择城市，如：重庆、成都"
            className="bg-white"
          />
          <datalist id="cities">
            {CITIES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </label>

        <OptionRow
          title="出行时长 *"
          options={DURATION.map((d) => `${d} 天`)}
          current={`${pref.duration} 天`}
          onSelect={(v) => setPref({ ...pref, duration: Number(v[0]) })}
        />

        <OptionRow
          title="出行预算 *"
          options={BUDGET.map((b) => `${b.label}（${b.desc}）`)}
          current={`${BUDGET.find((b) => b.value === pref.budgetLevel)?.label}（${BUDGET.find((b) => b.value === pref.budgetLevel)?.desc}）`}
          onSelect={(v) =>
            setPref({
              ...pref,
              budgetLevel: BUDGET.find((b) => `${b.label}（${b.desc}）` === v)?.value ?? 'medium',
            })
          }
        />
      </FormSection>

      <FormSection title="兴趣与旅行风格">
        <MultiRow
          title="兴趣偏好 *（可多选）"
          options={INTERESTS}
          selected={pref.interests}
          onToggle={(v) => setPref({ ...pref, interests: updateMulti(pref.interests, v) })}
        />

        <OptionRow
          title="旅行风格 *"
          options={STYLE.map((s) => s.label)}
          current={STYLE.find((s) => s.value === pref.travelStyle)?.label ?? ''}
          onSelect={(v) =>
            setPref({ ...pref, travelStyle: STYLE.find((s) => s.label === v)?.value ?? 'relaxed' })
          }
        />

        <OptionRow
          title="每日体力强度 *"
          options={STAMINA.map((s) => s.label)}
          current={STAMINA.find((s) => s.value === pref.staminaLevel)?.label ?? ''}
          onSelect={(v) =>
            setPref({ ...pref, staminaLevel: STAMINA.find((s) => s.label === v)?.value ?? 'medium' })
          }
        />
      </FormSection>

      <FormSection title="出行方式（可选）">
        <MultiRow
          title="偏好交通方式 *"
          options={TRANSPORTS}
          selected={pref.transportPreferences}
          onToggle={(v) =>
            setPref({ ...pref, transportPreferences: updateMulti(pref.transportPreferences, v) })
          }
        />

        <OptionRow
          title="同行人数 *"
          options={COMPANIONS}
          current={pref.companionCount}
          onSelect={(v) => setPref({ ...pref, companionCount: v })}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">出发地（可选）</span>
            <Input
              placeholder="如：上海"
              value={pref.departureCity ?? ''}
              onChange={(e) => setPref({ ...pref, departureCity: e.target.value })}
              className="bg-white"
            />
          </label>
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">出发日期（可选）</span>
            <Input
              type="date"
              value={pref.startDate ?? ''}
              onChange={(e) => setPref({ ...pref, startDate: e.target.value })}
              className="bg-white"
            />
          </label>
        </div>
      </FormSection>

      <div className="flex items-center gap-3">
        <Button
          size="lg"
          disabled={!requiredValid || loading}
          onClick={onGenerate}
          className="bg-[#2a9d8f] px-8 font-semibold text-white hover:bg-[#21867a]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              生成中…
            </span>
          ) : (
            '生成专属推荐 →'
          )}
        </Button>
        {!requiredValid && (
          <p className="text-sm text-muted-foreground">请补全所有带 * 的必填项</p>
        )}
      </div>
    </div>
  );
}

// ── Recommendation Page ────────────────────────────────────────────────────────

function RecommendationPage({
  pref,
  recommendations,
  selectedCount,
  loading,
  onRefresh,
  onToggle,
  onGeneratePlan,
  onBackToPlanning,
}: {
  pref: UserPreference;
  recommendations: RecommendationItem[];
  selectedCount: number;
  loading: boolean;
  onRefresh: () => void;
  onToggle: (id: string) => void;
  onGeneratePlan: () => void;
  onBackToPlanning: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Noto Serif SC' }}>
          选择感兴趣的内容
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">至少选择 2 项，用于生成你的专属行程</p>
      </div>

      {/* 偏好摘要 */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-white px-4 py-3 shadow-xs">
        <span className="mr-1 text-xs text-muted-foreground">当前偏好：</span>
        <Badge className="bg-[#264653] text-white">{pref.destination}</Badge>
        <Badge variant="outline">{pref.duration} 天</Badge>
        <Badge variant="outline">{BUDGET_LABEL_MAP[pref.budgetLevel]}</Badge>
        <Badge variant="outline">{STYLE_LABEL_MAP[pref.travelStyle]}</Badge>
        {pref.interests.slice(0, 3).map((i) => (
          <Badge key={i} variant="outline" className="border-teal-200 text-teal-600">{i}</Badge>
        ))}
      </div>

      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">已选</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2a9d8f] text-sm font-bold text-white">
            {selectedCount}
          </span>
          <span className="text-sm text-muted-foreground">/ {recommendations.length}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onBackToPlanning}>← 修改偏好</Button>
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>换一批</Button>
        </div>
      </div>

      {/* 卡片网格 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((item) => {
          const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.attraction;
          return (
            <Card
              key={item.id}
              className={cn(
                'relative overflow-hidden transition-all duration-200',
                item.selected
                  ? 'shadow-md ring-2 ring-[#2a9d8f]'
                  : 'shadow-xs hover:-translate-y-0.5 hover:shadow-md',
              )}
            >
              {/* 类型色条 */}
              <div className={cn('h-1.5 w-full', cfg.bandClass)} />

              {/* 已选角标 */}
              {item.selected && (
                <div className="absolute right-3 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#2a9d8f] text-white shadow-sm">
                  <span className="text-xs font-bold">✓</span>
                </div>
              )}

              <CardHeader className="pb-2 pt-4">
                <div className="pr-6">
                  <div className="flex items-center gap-1.5">
                    <span>{cfg.icon}</span>
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    <Badge
                      variant="outline"
                      className={cn('ml-auto text-xs', item.popularity === 'hot' ? 'border-amber-200 text-amber-700' : 'text-slate-500')}
                    >
                      {item.popularity === 'hot' ? '热门' : '小众'}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.shortDescription}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <p className="text-xs leading-relaxed text-slate-500">
                  推荐理由：{item.reason}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  <span className={cn('rounded-full border px-2 py-0.5 text-xs font-medium', cfg.badgeClass)}>
                    {cfg.label}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600">
                    {item.estimatedCost}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600">
                    {item.estimatedDuration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  className={cn(
                    'w-full font-medium transition-colors',
                    item.selected
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-[#2a9d8f] text-white hover:bg-[#21867a]',
                  )}
                  onClick={() => onToggle(item.id)}
                >
                  {item.selected ? '取消选择' : '加入行程 +'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 悬浮生成栏 */}
      <div className="sticky bottom-4 pt-2">
        <div className="flex items-center gap-4 rounded-2xl border bg-white/95 px-5 py-3.5 shadow-lg backdrop-blur-sm">
          <p className="flex-1 text-sm text-muted-foreground">
            {selectedCount < 2
              ? `还需选择 ${2 - selectedCount} 项`
              : `已选 ${selectedCount} 项，可以生成行程了`}
          </p>
          <Button
            size="lg"
            disabled={selectedCount < 2 || loading}
            onClick={onGeneratePlan}
            className="bg-[#264653] px-6 font-semibold text-white hover:bg-[#1a3340]"
          >
            {loading ? '生成中…' : '生成我的行程 →'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Itinerary Page ─────────────────────────────────────────────────────────────

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
    <div className="space-y-5">
      {/* 行程概览 */}
      <Card className="overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-[#264653] to-[#2a9d8f] px-6 py-5 text-white">
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Noto Serif SC' }}>
            {plan.destination} · {plan.duration} 天行程
          </h2>
          <p className="mt-1 text-sm text-teal-100">
            {pref.interests.join(' · ')} ｜ {STYLE_LABEL_MAP[pref.travelStyle]} ｜{' '}
            {BUDGET_LABEL_MAP[pref.budgetLevel]}
          </p>
        </div>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={onRegenerateAll}>↻ 重新生成</Button>
            <Button size="sm" variant="outline" onClick={onBackToPlanning}>← 修改偏好</Button>
            <Button size="sm" onClick={onSave} className="bg-[#2a9d8f] text-white hover:bg-[#21867a]">
              保存行程
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Day 卡片 */}
      {plan.days.map((day) => (
        <Card key={day.dayNumber} className="overflow-hidden shadow-sm">
          {/* Day 头部 */}
          <div
            className={cn(
              'flex items-center gap-4 bg-gradient-to-r px-6 py-4 text-white',
              DAY_GRADIENTS[(day.dayNumber - 1) % DAY_GRADIENTS.length],
            )}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
              {day.dayNumber}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-lg leading-snug" style={{ fontFamily: 'Noto Serif SC' }}>
                {day.title.replace(`Day ${day.dayNumber} · `, '')}
              </p>
              <p className="mt-0.5 text-sm italic text-white/70">{day.story}</p>
            </div>
          </div>

          <CardContent className="pb-5 pt-4">
            <div className="mb-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRegenerateDay(day.dayNumber)}
                className="h-7 text-xs text-muted-foreground hover:text-foreground"
              >
                ↻ 重新生成本日
              </Button>
            </div>

            {/* 时间线 */}
            <div className="relative pl-5">
              <div className="absolute bottom-0 left-2 top-0 w-px bg-gradient-to-b from-teal-300 via-teal-200 to-transparent" />
              <div className="space-y-4">
                {day.items.map((item) => {
                  const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.attraction;
                  return (
                    <div key={item.id} className="relative">
                      {/* 节点 */}
                      <div
                        className={cn(
                          'absolute -left-[21px] top-3.5 h-3 w-3 rounded-full border-2 border-white shadow-sm',
                          cfg.dotClass,
                        )}
                      />
                      <div className="rounded-xl border bg-white p-4 shadow-xs transition-shadow hover:shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                              {item.timeSlot}
                            </span>
                            <span className={cn('rounded-full border px-2 py-0.5 text-xs font-medium', cfg.badgeClass)}>
                              {cfg.icon} {cfg.label}
                            </span>
                            <span className="font-semibold text-slate-800">{item.name}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDeleteItem(day.dayNumber, item.id)}
                            className="h-7 shrink-0 text-xs text-slate-400 hover:bg-red-50 hover:text-red-500"
                          >
                            移除
                          </Button>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">💡 {item.reason}</p>

                        <div className="mt-2.5 flex flex-wrap gap-3 text-xs text-slate-500">
                          <span>⏱ {item.estimatedDuration}</span>
                          <span>💰 {item.estimatedCost}</span>
                          {item.transportTip && (
                            <span className="text-teal-600">🚇 {item.transportTip}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Saved Page ─────────────────────────────────────────────────────────────────

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
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Noto Serif SC' }}>
          已保存行程
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">数据仅保存在本地浏览器，不会上传到服务器</p>
      </div>

      {saved.length === 0 && (
        <Card className="shadow-xs">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <span className="mb-3 text-4xl">🗺️</span>
            <p className="font-medium text-slate-700">暂无已保存的行程</p>
            <p className="mt-1 text-sm text-muted-foreground">生成行程后点击"保存行程"即可在这里查看</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {saved.map((p) => (
          <Card key={p.id} className="overflow-hidden shadow-xs transition-shadow hover:shadow-md">
            <div className="h-1.5 bg-gradient-to-r from-[#264653] to-[#2a9d8f]" />
            <CardHeader className="pb-2 pt-4">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg" style={{ fontFamily: 'Noto Serif SC' }}>
                  {p.destination} · {p.duration} 天
                </CardTitle>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(p.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Day 1：{p.days[0]?.title.split(' · ')[1] ?? '—'}
              </p>
            </CardHeader>

            <CardContent className="space-y-3 pt-0">
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs">
                  {STYLE_LABEL_MAP[p.preference.travelStyle]}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {BUDGET_LABEL_MAP[p.budgetLevel]}
                </Badge>
                {p.preference.interests.slice(0, 2).map((interest) => (
                  <Badge key={interest} variant="outline" className="border-teal-200 text-xs text-teal-600">
                    {interest}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button size="sm" onClick={() => onOpen(p)} className="bg-[#264653] text-white hover:bg-[#1a3340]">
                  查看行程
                </Button>
                <Button size="sm" variant="outline" onClick={() => onExport(p)}>
                  导出 Markdown
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(p.id)}
                  className="text-red-400 hover:bg-red-50 hover:text-red-600"
                >
                  删除
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Shared UI Components ───────────────────────────────────────────────────────

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
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-150',
              current === o
                ? 'border-[#264653] bg-[#264653] text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-[#2a9d8f] hover:text-[#2a9d8f]',
            )}
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
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-150',
              selected.includes(o)
                ? 'border-[#2a9d8f] bg-[#2a9d8f] text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-[#2a9d8f] hover:text-[#2a9d8f]',
            )}
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
