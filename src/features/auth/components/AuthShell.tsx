import { BrainCircuit, Network, ShieldCheck, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_42%,#ffffff_100%)] text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(14,165,233,0.24),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(37,99,235,0.18),transparent_24%),radial-gradient(circle_at_68%_82%,rgba(56,189,248,0.20),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(14,116,144,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,116,144,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

      <div className="pointer-events-none absolute left-[6%] top-[14%] hidden h-28 w-28 rotate-12 rounded-[2rem] border border-white/50 bg-white/30 shadow-2xl shadow-sky-300/20 backdrop-blur-2xl lg:block" />
      <div className="pointer-events-none absolute bottom-[10%] right-[8%] hidden h-36 w-36 -rotate-6 rounded-[2.5rem] border border-sky-100/80 bg-white/25 shadow-2xl shadow-blue-300/20 backdrop-blur-2xl lg:block" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section className="order-2 space-y-8 lg:order-1">
            <Logo />

            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/60 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                {eyebrow}
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <ProductPreview />
          </section>

          <section className="order-1 flex justify-center lg:order-2">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}

export function Logo() {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/70 bg-sky-600 text-white shadow-lg shadow-sky-500/25">
        <BrainCircuit className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xl font-semibold tracking-tight text-slate-950">
          Node Mind
        </p>
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-700">
          Knowledge OS
        </p>
      </div>
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="hidden max-w-2xl rounded-[2rem] border border-white/60 bg-white/45 p-4 shadow-[0_32px_100px_rgba(14,116,144,0.16)] backdrop-blur-2xl sm:block">
      <div className="grid gap-4 rounded-[1.5rem] border border-white/70 bg-white/50 p-4 md:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-sky-600" />
            Today&apos;s workspace
          </div>
          {['AI research notes', 'Product roadmap', 'Reading system'].map(
            (item, index) => (
              <div
                className="rounded-2xl border border-sky-100 bg-white/70 p-3 shadow-sm"
                key={item}
              >
                <div className="mb-2 h-2 w-16 rounded-full bg-sky-200" />
                <p className="text-sm font-medium text-slate-800">{item}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {index + 4} linked blocks
                </p>
              </div>
            ),
          )}
        </div>

        <div className="relative min-h-64 overflow-hidden rounded-[1.25rem] border border-sky-100 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.18),transparent_44%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(219,234,254,0.45))]">
          <div className="absolute left-1/2 top-1/2 h-px w-44 -translate-x-1/2 -rotate-12 bg-sky-300/70" />
          <div className="absolute left-[32%] top-[32%] h-px w-36 rotate-45 bg-sky-300/70" />
          <div className="absolute left-[38%] top-[58%] h-px w-40 -rotate-45 bg-sky-300/70" />
          <GraphNode className="left-[42%] top-[38%]" label="Core" />
          <GraphNode className="left-[18%] top-[22%]" label="Notes" />
          <GraphNode className="right-[14%] top-[24%]" label="AI" />
          <GraphNode className="bottom-[18%] left-[24%]" label="Tasks" />
          <GraphNode className="bottom-[22%] right-[18%]" label="Graph" />
          <Network className="absolute bottom-4 right-4 h-5 w-5 text-sky-500" />
        </div>
      </div>
    </div>
  );
}

function GraphNode({ className, label }: { className: string; label: string }) {
  return (
    <div
      className={`absolute rounded-full border border-white/80 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg shadow-sky-500/15 backdrop-blur-xl ${className}`}
    >
      {label}
    </div>
  );
}
