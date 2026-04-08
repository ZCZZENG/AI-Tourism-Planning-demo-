import { useMemo, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { generateItineraryPlan, generateRecommendations, regenerateDay } from '@/data/planner';
import { deletePlan, getSavedPlans, savePlan } from '@/lib/storage';
import type { ItineraryPlan, RecommendationItem, UserPreference } from '@/types';

type Step = 'home' | 'preference' | 'recommendation' | 'itinerary' | 'saved';

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
  destination: '', duration: 3, budgetLevel: 'medium', interests: [], travelStyle: 'relaxed',
  staminaLevel: 'medium', transportPreferences: ['地铁'], companionCount: '2 人',
};

function App() {
  const [step, setStep] = useState<Step>('home');
  const [loading, setLoading] = useState(false);
  const [pref, setPref] = useState<UserPreference>(initialPref);
  const [seed, setSeed] = useState(0);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [plan, setPlan] = useState<ItineraryPlan | null>(null);
  const [saved, setSaved] = useState<ItineraryPlan[]>(() => getSavedPlans());

  const selectedCount = useMemo(() => recommendations.filter((i) => i.selected).length, [recommendations]);

  const requiredValid = pref.destination && pref.duration && pref.budgetLevel && pref.interests.length && pref.travelStyle && pref.staminaLevel && pref.transportPreferences.length;

  const updateMulti = (list: string[], value: string) => list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const runRecommendations = async (regen = false) => {
    if (!requiredValid) {
      toast.error('请先补全必填项');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const nextSeed = regen ? seed + 1 : seed;
    setSeed(nextSeed);
    setRecommendations(generateRecommendations(pref, nextSeed));
    setLoading(false);
    setStep('recommendation');
  };

  const generatePlan = async () => {
    if (selectedCount < 2) {
      toast.error('请至少选择 2 个项目后再生成行程');
      return;
    }
    setLoading(true);
    const loadingTexts = ['正在分析你的旅行偏好', '正在组合景点与文化体验', '正在生成故事化行程'];
    toast.loading(loadingTexts[Math.floor(Math.random() * loadingTexts.length)], { id: 'gen' });
    await new Promise((r) => setTimeout(r, 1200));
    const result = generateItineraryPlan(pref, recommendations.filter((i) => i.selected));
    setPlan(result);
    toast.success('行程生成完成', { id: 'gen' });
    setLoading(false);
    setStep('itinerary');
  };

  const saveCurrentPlan = () => {
    if (!plan) return;
    savePlan(plan);
    const latest = getSavedPlans();
    setSaved(latest);
    toast.success('保存成功，已写入本地');
  };

  const exportMarkdown = (p: ItineraryPlan) => {
    const content = [`# ${p.destination} ${p.duration}天行程`, '', `创建时间：${new Date(p.createdAt).toLocaleString()}`, ''];
    p.days.forEach((d) => {
      content.push(`## ${d.title}`, d.story, '');
      d.items.forEach((i) => content.push(`- **${i.timeSlot}** ${i.name}（${i.type}）- ${i.description}`));
      content.push('');
    });
    const blob = new Blob([content.join('\n')], { type: 'text/markdown;charset=utf-8' });
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
      <header className="border-b bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button className="text-xl font-bold" onClick={() => setStep('home')}>灵犀逸行</button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setStep('saved')}>保存查看</Button>
            <Button onClick={() => setStep('preference')}>开始规划</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {step === 'home' && (
          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <CardTitle className="text-3xl">灵犀逸行</CardTitle>
              <CardDescription>根据预算、兴趣、出行时长与旅行偏好，生成带有文化深度的个性化旅游方案。</CardDescription>
            </CardHeader>
            <CardContent><Button size="lg" onClick={() => setStep('preference')}>开始规划</Button></CardContent>
          </Card>
        )}

        {step === 'preference' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">偏好采集</h2>
            <Card><CardContent className="grid gap-4 pt-6">
              <label className="space-y-2"><span>旅行目的地 *</span><Input list="cities" value={pref.destination} onChange={(e) => setPref({ ...pref, destination: e.target.value })} placeholder="输入或选择城市" /><datalist id="cities">{CITIES.map((c) => <option key={c} value={c} />)}</datalist></label>
              <OptionRow title="出行时长 *" options={DURATION.map((d) => `${d} 天`)} current={`${pref.duration} 天`} onSelect={(v) => setPref({ ...pref, duration: Number(v[0]) })} />
              <OptionRow title="出行预算 *" options={BUDGET.map((b) => `${b.label} (${b.desc})`)} current={`${BUDGET.find((b) => b.value === pref.budgetLevel)?.label} (${BUDGET.find((b) => b.value === pref.budgetLevel)?.desc})`} onSelect={(v) => setPref({ ...pref, budgetLevel: BUDGET.find((b) => `${b.label} (${b.desc})` === v)?.value ?? 'medium' })} />
              <MultiRow title="兴趣偏好 *" options={INTERESTS} selected={pref.interests} onToggle={(v) => setPref({ ...pref, interests: updateMulti(pref.interests, v) })} />
              <OptionRow title="旅行风格 *" options={STYLE.map((s) => s.label)} current={STYLE.find((s) => s.value === pref.travelStyle)?.label ?? ''} onSelect={(v) => setPref({ ...pref, travelStyle: STYLE.find((s) => s.label === v)?.value ?? 'relaxed' })} />
              <OptionRow title="每日体力强度 *" options={STAMINA.map((s) => s.label)} current={STAMINA.find((s) => s.value === pref.staminaLevel)?.label ?? ''} onSelect={(v) => setPref({ ...pref, staminaLevel: STAMINA.find((s) => s.label === v)?.value ?? 'medium' })} />
              <MultiRow title="出行方式偏好 *" options={TRANSPORTS} selected={pref.transportPreferences} onToggle={(v) => setPref({ ...pref, transportPreferences: updateMulti(pref.transportPreferences, v) })} />
              <OptionRow title="同行人数 *" options={COMPANIONS} current={pref.companionCount} onSelect={(v) => setPref({ ...pref, companionCount: v })} />
              <div className="grid gap-3 md:grid-cols-2">
                <Input placeholder="可选：出发地" value={pref.departureCity ?? ''} onChange={(e) => setPref({ ...pref, departureCity: e.target.value })} />
                <Input type="date" value={pref.startDate ?? ''} onChange={(e) => setPref({ ...pref, startDate: e.target.value })} />
              </div>
            </CardContent></Card>
            <Button disabled={!requiredValid || loading} onClick={() => void runRecommendations()}>{loading ? '生成中...' : '生成推荐'}</Button>
          </div>
        )}

        {step === 'recommendation' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">当前偏好：<Badge>{pref.destination}</Badge><Badge>{pref.duration}天</Badge><Badge>{BUDGET.find((b) => b.value === pref.budgetLevel)?.label}</Badge><Badge>{STYLE.find((s) => s.value === pref.travelStyle)?.label}</Badge>{pref.interests.map((i) => <Badge key={i} variant="outline">{i}</Badge>)}</div>
            <div className="flex items-center justify-between"><p>已选 {selectedCount} 项</p><div className="space-x-2"><Button variant="outline" onClick={() => void runRecommendations(true)}>换一批</Button><Button variant="outline" onClick={() => void runRecommendations(true)}>重新生成推荐</Button></div></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((r) => (
                <Card key={r.id} className={r.selected ? 'ring-2 ring-primary' : ''}>
                  <CardHeader>
                    <CardTitle className="text-base">{r.name}</CardTitle>
                    <CardDescription>{r.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>分类：{r.category}</div><div>推荐理由：{r.reason}</div><div>预计时长：{r.estimatedDuration}</div><div>预算：{r.estimatedCost}</div>
                    <div className="flex gap-2"><Badge variant="outline">{r.popularity === 'hot' ? '热门' : '小众'}</Badge><Badge variant="outline">{r.type}</Badge></div>
                    <Button className="w-full" variant={r.selected ? 'secondary' : 'default'} onClick={() => setRecommendations((prev) => prev.map((p) => p.id === r.id ? { ...p, selected: !p.selected } : p))}>{r.selected ? '已加入行程' : '加入行程'}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button size="lg" disabled={selectedCount < 2 || loading} onClick={() => void generatePlan()}>开始生成行程</Button>
          </div>
        )}

        {step === 'itinerary' && plan && (
          <div className="space-y-4">
            <Card><CardHeader><CardTitle>{plan.destination} · {plan.duration} 天行程</CardTitle><CardDescription>总预算等级：{BUDGET.find((b) => b.value === plan.budgetLevel)?.label}</CardDescription></CardHeader></Card>
            <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => setPlan(generateItineraryPlan(pref, recommendations.filter((i) => i.selected)))}>重新生成整份行程</Button><Button variant="outline" onClick={() => setStep('preference')}>返回修改偏好</Button><Button onClick={saveCurrentPlan}>保存行程</Button></div>
            {plan.days.map((d) => (
              <Card key={d.dayNumber}>
                <CardHeader><CardTitle>{d.title}</CardTitle><CardDescription>{d.story}</CardDescription></CardHeader>
                <CardContent className="space-y-2">
                  <Button size="sm" variant="outline" onClick={() => setPlan((prev) => prev ? regenerateDay(prev, d.dayNumber) : prev)}>仅重生成某一天</Button>
                  {d.items.map((item) => (
                    <div key={item.id} className="rounded-lg border p-3 text-sm">
                      <div className="flex items-center justify-between"><strong>{item.timeSlot} · {item.name}</strong><Button size="sm" variant="ghost" onClick={() => setPlan((prev) => prev ? ({ ...prev, days: prev.days.map((day) => day.dayNumber === d.dayNumber ? { ...day, items: day.items.filter((it) => it.id !== item.id) } : day) }) : prev)}>删除</Button></div>
                      <p>{item.description}</p><p>原因：{item.reason}</p><p>时长：{item.estimatedDuration} ｜ 费用：{item.estimatedCost}</p><p>交通：{item.transportTip}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 'saved' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">已保存行程</h2>
            {saved.length === 0 && <Card><CardContent className="pt-6">暂无已保存行程</CardContent></Card>}
            {saved.map((p) => (
              <Card key={p.id}>
                <CardHeader><CardTitle>{p.destination} · {p.duration} 天</CardTitle><CardDescription>{new Date(p.createdAt).toLocaleString()}</CardDescription></CardHeader>
                <CardContent className="flex flex-wrap gap-2"><Button onClick={() => { setPlan(p); setStep('itinerary'); }}>打开详情</Button><Button variant="outline" onClick={() => exportMarkdown(p)}>导出 Markdown</Button><Button variant="destructive" onClick={() => { deletePlan(p.id); setSaved(getSavedPlans()); }}>删除</Button></CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function OptionRow({ title, options, current, onSelect }: { title: string; options: string[]; current: string; onSelect: (value: string) => void }) {
  return <div className="space-y-2"><p>{title}</p><div className="flex flex-wrap gap-2">{options.map((o) => <button key={o} className={`rounded-full border px-3 py-1 text-sm ${current === o ? 'bg-slate-900 text-white' : 'bg-white'}`} onClick={() => onSelect(o)}>{o}</button>)}</div></div>;
}

function MultiRow({ title, options, selected, onToggle }: { title: string; options: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return <div className="space-y-2"><p>{title}</p><div className="flex flex-wrap gap-2">{options.map((o) => <button key={o} className={`rounded-full border px-3 py-1 text-sm ${selected.includes(o) ? 'bg-primary text-white' : 'bg-white'}`} onClick={() => onToggle(o)}>{o}</button>)}</div></div>;
}

export default App;
