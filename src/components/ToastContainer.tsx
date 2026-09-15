import React from 'react';
import { useSignature } from '../context/SignatureContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useSignature();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none select-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-medium pointer-events-auto transition-all transform translate-y-0 ${
            t.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-800'
              : t.type === 'error'
              ? 'bg-rose-900 text-white border-rose-800'
              : t.type === 'warning'
              ? 'bg-amber-900 text-white border-amber-800'
              : 'bg-[#0C3866] text-white border-blue-900'
          }`}
        >
          {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
          {t.type === 'info' && <Info className="w-4 h-4 text-[#F7BD00] shrink-0" />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
