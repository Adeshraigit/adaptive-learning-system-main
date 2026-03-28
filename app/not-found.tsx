"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Brain, Compass, Home, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5fbff_0%,#eef8ff_36%,#f7fbff_100%)] px-4 py-10 lg:py-16">
      <div className="mx-auto max-w-300">
        <div className="rounded-4xl border border-blue-100 bg-[#eef8ff] px-6 py-8 shadow-[0_30px_80px_-45px_rgba(59,130,246,0.55)] sm:px-10 sm:py-10 lg:px-14 lg:py-14">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <p className="text-lg font-semibold text-slate-900">AdaptIQ</p>
          </div>

          <Badge className="mb-5 rounded-full border border-blue-200/70 bg-white/90 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-blue-700 hover:bg-white/90">
            Error 404
          </Badge>

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem]">
            This page took a
            <span className="mx-2 inline-flex items-center rounded-full bg-white px-4 py-2 text-lg font-semibold text-blue-700 shadow-sm sm:text-xl lg:mx-3 lg:text-2xl">
              wrong turn
            </span>
            in the graph.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
            The link may be outdated, or the page may have moved. Let&apos;s get you back to your learning flow.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
                <Link href="/" className="gap-2">
                  <Home className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-full border-blue-300 bg-white/85 text-blue-700 hover:bg-white">
                <Link href="/practice" className="gap-2">
                  <Compass className="h-4 w-4" />
                  Start Practice
                </Link>
              </Button>
            </div>

            <Button asChild variant="ghost" className="justify-start rounded-full text-blue-700 hover:bg-blue-100/70 md:justify-center">
              <Link href="/knowledge-map" className="gap-2">
                <Network className="h-4 w-4" />
                Open Knowledge Map
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-blue-100/80 bg-white/80 px-5 py-4 text-sm text-slate-600 shadow-sm">
          Redirecting to the dashboard in 5 seconds. Tip: if this happened from a bookmark, update it to the latest route after navigating back.
        </div>
      </div>
    </main>
  );
}
