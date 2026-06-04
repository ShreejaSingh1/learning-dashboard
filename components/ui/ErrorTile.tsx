import { AlertCircle } from "lucide-react";

export function ErrorTile({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 flex items-start gap-3">
      <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-red-300">Something went wrong</p>
        <p className="text-xs text-red-400/70 mt-1">{message}</p>
      </div>
    </div>
  );
}
