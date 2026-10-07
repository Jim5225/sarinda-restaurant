import React, { useState, useEffect } from 'react';
import { 
  Laptop, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'pc' | 'mobile'>('pc');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect if already installed / standalone
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback instruction
      alert('আপনার ব্রাউজারের অ্যাড্রেস বারের ডানে "Install App" বা ৩-ডট মেন্যু থেকে "Add to Home Screen / Install Sarinda POS" সিলেক্ট করুন।');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-brand-border relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary text-brand-gold flex items-center justify-center shadow-md">
            <Download className="w-6 h-6 text-brand-gold" />
          </div>
          <div>
            <h3 className="font-serif font-black text-xl sm:text-2xl text-brand-primary">
              সারিন্দা পিওএস ও ম্যানেজার অ্যাপ
            </h3>
            <p className="text-xs text-brand-muted font-bold">
              ১০০% ফ্রি ইনস্টলেশন • অনলাইন ও অফলাইন মোড
            </p>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl mb-6">
          <button
            onClick={() => setActivePlatform('pc')}
            className={`py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
              activePlatform === 'pc'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Laptop className="w-4 h-4 text-emerald-600" />
            <span>ক্যাশ কাউন্টার পিসি অ্যাপ</span>
          </button>

          <button
            onClick={() => setActivePlatform('mobile')}
            className={`py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
              activePlatform === 'mobile'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>মালিকের মোবাইল অ্যাপ</span>
          </button>
        </div>

        {/* Content for PC */}
        {activePlatform === 'pc' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>উইন্ডোজ পিসির সুবিধা (Windows 10/11)</span>
              </div>
              <ul className="text-xs text-emerald-900 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>ইন্টারনেট না থাকলেও ক্যাশ মেমো ও বিলিং চলবে (100% Offline)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>থার্মাল রিসিপ্ট প্রিন্টারে ১-ক্লিকে টোকেন প্রিন্ট সুবিধা</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>ডেস্কটপে আলাদা অ্যাপ আইকন তৈরি হবে, ব্রাউজার ওপেন করা লাগবে না</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-101 transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-brand-gold" />
              <span>{isInstalled ? 'পিসিতে অ্যাপ ইনস্টল করা আছে' : 'পিসিতে সফটওয়্যার হিসেবে ইনস্টল করুন'}</span>
            </button>
          </div>
        )}

        {/* Content for Mobile */}
        {activePlatform === 'mobile' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 text-blue-800 font-black text-xs uppercase">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>মালিক ও ম্যানেজারের মোবাইল সুবিধা (Android / iOS)</span>
              </div>
              <ul className="text-xs text-blue-900 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>যেখানেই থাকুন, মোবাইলে আজকের মোট সেল ও ক্যাশ ব্যালেন্স দেখা যাবে</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>সবারি রিসোর্ট বা লাইটিংয়ের নতুন কাস্টমার আসলে সরাসরি নোটিফিকেশন</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>কোনো প্লে-স্টোর অ্যাকাউন্ট বা ফি ছাড়াই সরাসরি মোবাইলে চলে</span>
                </li>
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <p className="font-bold text-slate-900 mb-1">📱 মোবাইলে যেভাবে ইনস্টল করবেন:</p>
              <p>মালিকের মোবাইল ক্রোম (Chrome) ব্রাউজারে সাইটটি ওপেন করে উপরের ৩-ডট মেন্যুতে চাপ দিয়ে <strong className="text-emerald-700">"Install app"</strong> অথবা <strong className="text-emerald-700">"Add to Home screen"</strong> ক্লিক করলেই অ্যাপটি হোমস্ক্রিনে চলে আসবে!</p>
            </div>

            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-101 transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-200" />
              <span>মোবাইলে অ্যাপ যোগ করুন</span>
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>আজীবন ফ্রি সার্ভিস • জিরো সাবস্ক্রিপশন ফি</span>
          </span>
          <span className="text-emerald-700">Sarinda PWA Engine v2.0</span>
        </div>

      </div>
    </div>
  );
};
