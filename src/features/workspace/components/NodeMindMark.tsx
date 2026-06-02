import { BrainCircuit } from 'lucide-react';

type NodeMindMarkProps = {
  compact?: boolean;
};

export function NodeMindMark({ compact = false }: NodeMindMarkProps) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-500/20">
        <BrainCircuit className="h-5 w-5" />
      </div>
      {!compact && (
        <div>
          <p className="text-sm font-semibold leading-5 text-slate-950">
            Node Mind
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Knowledge OS
          </p>
        </div>
      )}
    </div>
  );
}
