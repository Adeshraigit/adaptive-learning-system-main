'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Brain, Network, Sparkles, Target, TrendingUp, ArrowRight, CheckCircle2, ChevronRight, Users, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/client';

const features = [
  {
    icon: Network,
    title: 'Visual Knowledge Graph',
    description: 'See how concepts connect. Our interactive graph reveals the hidden dependencies between topics, showing exactly where learning gaps begin.',
  },
  {
    icon: Target,
    title: 'Root Cause Diagnosis',
    description: 'Go beyond "wrong answer" feedback. AdaptIQ traces back to the foundational concept you missed, so you fix the real problem.',
  },
  {
    icon: Sparkles,
    title: 'AI Study Companion',
    description: 'Get instant, context-aware explanations. Our AI understands what you&apos;re struggling with and explains it in ways that click.',
  },
  {
    icon: TrendingUp,
    title: 'Adaptive Learning Paths',
    description: 'No more guessing what to study next. Follow personalized paths that strengthen weak concepts before building on them.',
  },
];

const benefits = [
  'Identify knowledge gaps before exams',
  'Understand why you get answers wrong',
  'Master prerequisite concepts first',
  'Track progress with visual insights',
  'Learn at your own pace',
  'Get AI-powered explanations anytime',
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Class 10 Student',
    initials: 'PS',
    content: 'I finally understood why I kept failing physics problems. AdaptIQ showed me I was missing basic vector concepts. After fixing that, everything clicked!',
  },
  {
    name: 'Rahul Verma',
    role: 'Parent',
    initials: 'RV',
    content: 'As a parent, I can now see exactly where my son needs help instead of hiring expensive tutors for everything. The knowledge graph is brilliant.',
  },
  {
    name: 'Dr. Meera Patel',
    role: 'Physics Teacher',
    initials: 'MP',
    content: 'This is how education should work. Instead of rote learning, students actually understand the connections between concepts. Remarkable tool.',
  },
];

const stats = [
  { value: '94%', label: 'Accuracy Improvement' },
  { value: '2.5x', label: 'Faster Learning' },
  { value: '10K+', label: 'Students Helped' },
  { value: '500+', label: 'Concepts Mapped' },
];

const experienceStages = [
  'Personalize',
  'Engage',
  'Practice',
  'Assess',
  'Assist',
] as const;

const experienceDetails: Record<(typeof experienceStages)[number], {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  badge: string;
}> = {
  Personalize: {
    title: 'Personalized by Hindsight Memory',
    description: 'AdaptIQ uses your hindsight events and mastery history to detect recurring struggles and prioritize exactly what you need next.',
    actionLabel: 'Open Settings Sync',
    actionHref: '/settings',
    badge: 'Hindsight + Mastery Sync',
  },
  Engage: {
    title: 'Engage with AI Study Companion',
    description: 'Use the built-in AI companion for grounded explanations, concept clarity, and guided next steps based on your real progress.',
    actionLabel: 'Try AI Companion',
    actionHref: '/practice',
    badge: 'Grounded AI Companion',
  },
  Practice: {
    title: 'Practice with Focus Mode',
    description: 'Switch on Focus Mode to practice weak concepts first, with fallback to default flow when weak targets are not available.',
    actionLabel: 'Start Focus Practice',
    actionHref: '/practice?focusMode=true',
    badge: 'Weak-Concept Targeting',
  },
  Assess: {
    title: 'Assess Root Cause, Not Just Scores',
    description: 'Every incorrect attempt can trigger diagnosis that traces prerequisite dependencies and reveals the true concept causing the mistake.',
    actionLabel: 'View Knowledge Map',
    actionHref: '/knowledge-map',
    badge: 'Dependency Diagnosis',
  },
  Assist: {
    title: 'Assist Recovery with Guided Paths',
    description: 'Adaptive recovery plans track completion steps and now show progress feedback so learners can see measurable improvement.',
    actionLabel: 'Open Recovery',
    actionHref: '/recovery',
    badge: 'Recovery Completion Feedback',
  },
};

export default function LandingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeStage, setActiveStage] = useState<(typeof experienceStages)[number]>('Personalize');

  const handleGetStarted = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    router.push(user ? '/' : '/auth/login');
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5fbff_0%,#eef8ff_36%,#f7fbff_100%)]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60">
        <nav className="mx-auto flex h-16 max-w-300 items-center justify-between px-4 lg:px-8">
          <Link href="/landing" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-lg">AdaptIQ</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button size="sm" className="gap-2" onClick={handleGetStarted}>
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-14 pt-10 lg:pb-20 lg:pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#dceeff_0%,transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#e5f2ff_0%,transparent_50%)]" />
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-300 px-4 lg:px-8">
          <div className="rounded-[2.25rem] border border-blue-100 bg-[#eef8ff] px-5 pb-8 pt-8 shadow-[0_30px_80px_-45px_rgba(59,130,246,0.55)] sm:px-8 lg:px-12 lg:pb-12 lg:pt-10">
            <div className="relative">
              <Badge className="mb-5 rounded-full border border-blue-200/70 bg-white/90 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-blue-700 hover:bg-white/90">
                Adaptive Math Intelligence
              </Badge>

              <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem]">
                It&apos;s time to
                <span className="mx-2 inline-flex items-center rounded-full bg-white px-4 py-2 text-lg font-semibold text-blue-700 shadow-sm sm:text-xl lg:mx-3 lg:text-2xl">
                  upgrade
                </span>
                your
                <span className="mt-1 block text-blue-600">learning!</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
                AdaptIQ finds the exact concept gap behind every wrong answer and gives you the clearest next step to improve faster.
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/" className="group inline-flex">
                    <span className="inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white px-3 py-2 shadow-sm transition-colors group-hover:bg-blue-50">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span className="pr-4 text-sm font-semibold text-slate-700 sm:text-base">Open Guide Tour</span>
                    </span>
                  </Link>

                  <Link href="/knowledge-map" className="group inline-flex">
                    <span className="inline-flex items-center gap-3 rounded-full border border-blue-200 bg-linear-to-r from-blue-100/90 to-blue-200/70 px-3 py-2 shadow-sm transition-opacity group-hover:opacity-90">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-700">
                        <Network className="h-4 w-4" />
                      </span>
                      <span className="pr-4 text-sm font-semibold text-slate-700 sm:text-base">Open Knowledge Graph</span>
                    </span>
                  </Link>
                </div>

                <div className="max-w-52 rounded-2xl border border-blue-200/70 bg-white/70 p-3 text-sm text-slate-600 backdrop-blur sm:max-w-60 md:ml-auto">
                  Solve your math problems with AI-backed concept diagnosis and guided practice.
                </div>
              </div>

            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-border/70 bg-card/70 p-5 text-center shadow-sm backdrop-blur sm:grid-cols-4 lg:mt-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-foreground lg:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground lg:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adaptive Experience Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-300 px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-4xl border border-blue-100 bg-[#edf7ff]/95 px-6 py-14 shadow-[0_24px_70px_-46px_rgba(56,130,246,0.65)] sm:px-10 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.18),transparent_42%),radial-gradient(circle_at_0%_100%,rgba(56,189,248,0.12),transparent_35%)]" />

            <div className="relative text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
                Adaptive Learning Experience
              </h2>

              <div className="mx-auto mt-10 w-full max-w-5xl rounded-full border border-blue-200 bg-white/80 p-2.5 shadow-inner shadow-blue-100 sm:mt-14">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
                  {experienceStages.map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setActiveStage(stage)}
                      className={`rounded-full px-4 py-3 text-center text-base font-semibold transition-all sm:text-lg ${activeStage === stage ? 'bg-blue-600 text-white shadow-lg shadow-blue-300/50' : 'text-slate-500 hover:bg-blue-50 hover:text-slate-800'}`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid items-center gap-8 text-left lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <Badge className="mb-4 border-blue-200 bg-white/90 text-blue-700 hover:bg-white/90">
                    {experienceDetails[activeStage].badge}
                  </Badge>
                  <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                    {experienceDetails[activeStage].title}
                  </h3>
                  <p className="mt-4 max-w-xl text-lg text-slate-600">
                    {experienceDetails[activeStage].description}
                  </p>
                  <div className="mt-8">
                    <Link href={experienceDetails[activeStage].actionHref}>
                      <Button className="rounded-full bg-blue-600 px-7 text-white hover:bg-blue-700">
                        {experienceDetails[activeStage].actionLabel}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-white/90 p-4 shadow-xl shadow-blue-100/70">
                  <div className="rounded-2xl border border-blue-100 bg-[#f3f9ff] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">{activeStage} Panel</p>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">Live Feature</span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-blue-100 bg-white p-3 text-sm text-slate-700">
                        <p className="font-medium text-slate-900">Personalized Context</p>
                        <p className="mt-1 text-slate-600">Learner state is read from mastery, attempts, and hindsight traces.</p>
                      </div>
                      <div className="rounded-xl border border-blue-100 bg-white p-3 text-sm text-slate-700">
                        <p className="font-medium text-slate-900">Adaptive Guidance</p>
                        <p className="mt-1 text-slate-600">Routes and prompts adapt to weak concepts and prerequisite gaps.</p>
                      </div>
                      <div className="rounded-xl border border-blue-100 bg-white p-3 text-sm text-slate-700">
                        <p className="font-medium text-slate-900">Progress Visibility</p>
                        <p className="mt-1 text-slate-600">Completion, mastery updates, and recovery outcomes are surfaced clearly.</p>
                      </div>
                      <div className="rounded-xl border border-blue-100 bg-white p-3 text-sm text-slate-700">
                        <p className="font-medium text-slate-900">Real App Modules</p>
                        <p className="mt-1 text-slate-600">Powered by Practice, Diagnosis, Knowledge Map, Recovery, and AI APIs.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-300 px-4 lg:px-8">
          <div className="rounded-4xl border border-blue-100 bg-[#edf7ff]/95 px-6 py-12 shadow-[0_24px_70px_-46px_rgba(56,130,246,0.65)] lg:px-10">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-blue-200 bg-white/80 text-blue-700">Features</Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Learning that actually adapts to you
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Traditional learning platforms tell you what&apos;s wrong. AdaptIQ shows you why and guides you to mastery.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index} className="group border-blue-100/70 bg-white/85 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="mx-auto max-w-300 px-4 lg:px-8">
          <div className="rounded-4xl border border-blue-100 bg-white/80 px-6 py-12 shadow-[0_24px_70px_-50px_rgba(56,130,246,0.6)] lg:px-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700">How It Works</Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Three steps to smarter learning
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Practice & Diagnose',
                description: 'Answer questions in your subject. When you get something wrong, AdaptIQ analyzes which underlying concept you missed.',
                icon: BookOpen,
              },
              {
                step: '02',
                title: 'Visualize Dependencies',
                description: 'See your knowledge on an interactive graph. Color-coded nodes show mastered, weak, and missing concepts with their connections.',
                icon: Network,
              },
              {
                step: '03',
                title: 'Follow Your Path',
                description: 'Get a personalized learning path that strengthens foundations first. Our AI companion guides you every step of the way.',
                icon: Sparkles,
              },
            ].map((item, index) => (
              <div key={index} className="relative rounded-2xl border border-blue-100 bg-[#f2f9ff] p-6">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-2rem)] w-16">
                    <ChevronRight className="h-8 w-8 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-300 px-4 lg:px-8">
          <div className="grid items-center gap-12 rounded-4xl border border-blue-100 bg-[#eaf6ff] px-6 py-12 shadow-[0_24px_80px_-50px_rgba(56,130,246,0.65)] lg:grid-cols-2 lg:px-10">
            <div>
              <Badge variant="outline" className="mb-4 border-blue-200 bg-white/85 text-blue-700">Why AdaptIQ</Badge>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
                Stop wasting time on the wrong problems
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Most students study harder, not smarter. AdaptIQ ensures every minute you spend is on the concepts that actually matter for your progress.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/">
                <Button size="lg" className="mt-8 gap-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                  Start Your Journey
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card className="border-blue-100 bg-white/90 text-card-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">AI Study Companion</p>
                      <p className="text-xs text-muted-foreground">Always ready to help</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-muted rounded-lg p-3 text-sm">
                      I keep getting velocity problems wrong. Why?
                    </div>
                    <div className="bg-accent rounded-lg p-3 text-sm">
                      <p className="font-medium text-accent-foreground mb-1">I analyzed your recent attempts:</p>
                      <p className="text-muted-foreground">
                        You&apos;re confusing velocity (a vector) with speed (a scalar). This happens because you haven&apos;t fully grasped vector concepts. Let me explain the difference with an example...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-28">
        <div className="mx-auto max-w-300 px-4 lg:px-8">
          <div className="rounded-4xl border border-blue-100 bg-white/85 px-6 py-12 shadow-[0_24px_70px_-50px_rgba(56,130,246,0.6)] lg:px-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700">Testimonials</Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Loved by students and educators
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full border-blue-100/80 bg-[#f5fbff]">
                <CardContent className="p-6 flex flex-col h-full">
                  <p className="text-muted-foreground flex-1">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-300 px-4 lg:px-8 text-center">
          <div className="rounded-4xl border border-blue-100 bg-[#edf8ff] px-6 py-12 shadow-[0_24px_70px_-45px_rgba(56,130,246,0.65)] lg:px-10">
          <div className="flex justify-center mb-6">
            <div className="flex -space-x-3">
              {['AS', 'PM', 'RK', 'NJ', 'SK'].map((initials, i) => (
                <Avatar key={i} className="border-4 border-background">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Join 10,000+ students already learning smarter</p>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Ready to understand why you struggle?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your free trial today. No credit card required. See your knowledge graph and get your first diagnosis in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2 rounded-full bg-blue-600 px-8 text-white hover:bg-blue-700">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/practice">
              <Button variant="outline" size="lg" className="rounded-full border-blue-300 bg-white/80 text-blue-700 hover:bg-white">
                Try a Practice Session
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12">
        <div className="mx-auto max-w-300 px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-blue-100 bg-white/85 px-6 py-8 shadow-sm md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">AdaptIQ</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">About</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              2026 AdaptIQ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
