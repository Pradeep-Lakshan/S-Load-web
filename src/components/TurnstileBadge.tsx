import React, { useState } from 'react';
import { ShieldCheck, Check, Loader2 } from 'lucide-react';

interface TurnstileBadgeProps {
  onVerified: (token: string) => void;
  isVerified: boolean;
}

export const TurnstileBadge: React.FC<TurnstileBadgeProps> = ({ onVerified, isVerified }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleManualVerify = () => {
    if (isVerified || isVerifying) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerified('turnstile-verified-token-' + Date.now());
    }, 700);
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-4 p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex items-center justify-between text-xs">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleManualVerify}
          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
            isVerified
              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
              : isVerifying
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
              : 'bg-slate-800 border-slate-700 hover:border-slate-500'
          }`}
          title="Verify human challenge"
        >
          {isVerified ? (
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          ) : isVerifying ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : null}
        </button>

        <span className="text-slate-300 font-medium select-none cursor-pointer" onClick={handleManualVerify}>
          {isVerified ? 'Human Verified' : isVerifying ? 'Checking...' : 'Verify you are human'}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
        <span>Cloudflare Turnstile</span>
      </div>
    </div>
  );
};
