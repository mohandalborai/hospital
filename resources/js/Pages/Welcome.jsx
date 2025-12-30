import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
                {/* Navbar */}
                <div className="fixed top-6 w-full z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
                    <nav className="max-w-5xl mx-auto glass-header pointer-events-auto transition-all duration-500 backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                        <div className="px-6 lg:px-10">
                            <div className="flex justify-between h-20 items-center">
                                {/* Logo */}
                                <div className="flex items-center gap-3 group cursor-pointer">
                                    <div className="bg-slate-900 p-2 rounded-xl text-white shadow-lg transition-transform duration-500 group-hover:rotate-12">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="font-black text-xl tracking-tight text-slate-900">Medi<span className="text-indigo-600">AI</span></span>
                                </div>

                                {/* Menu Links */}
                                <div className="hidden lg:flex items-center gap-10">
                                    <a href="#" className="text-[11px] font-black text-slate-500 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors">Technology</a>
                                    <a href="#" className="text-[11px] font-black text-slate-500 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors">Specialists</a>
                                    <a href="#" className="text-[11px] font-black text-slate-500 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors">Privacy</a>
                                </div>

                                {/* Auth Actions */}
                                <div className="flex items-center gap-6">
                                    {auth.user ? (
                                        <a href="/dashboard" className="text-[11px] font-black text-indigo-600 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">Console</a>
                                    ) : (
                                        <>
                                            <a href="/login" className="hidden sm:block text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">Sign In</a>
                                            <a href="/register" className="bg-slate-900 text-white px-7 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-100 active:scale-[0.95]">Join Now</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Hero Section */}
                <div className="relative min-h-screen flex items-center pt-20 overflow-hidden w-full">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] z-0 pointer-events-none"></div>
                    <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl mix-blend-multiply pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8 animate-fade-in-up">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                    </span>
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Next Generation Healthcare</span>
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                                    Diagnosis <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Powered by AI.</span>
                                </h1>
                                <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
                                    Experience the future of medical imaging with instant, AI-driven analysis reviewed by top-tier specialists.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a href="/register" className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1">
                                        Start Free Analysis
                                    </a>
                                    <a href="#features" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-50 transition-all hover:-translate-y-1">
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                            
                            <div className="relative hidden lg:block">
                                <div className="relative z-10 bg-white rounded-3xl shadow-2xl shadow-indigo-500/20 p-4 border border-slate-100 transform rotate-[-2deg] hover:rotate-0 transition-all duration-700">
                                    <div className="bg-slate-50 rounded-2xl overflow-hidden aspect-[4/3] relative group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent flex items-end p-8">
                                            <div className="text-white">
                                                <div className="inline-block px-3 py-1 bg-emerald-500 rounded-lg text-[10px] font-bold uppercase mb-2">99.8% Accuracy</div>
                                                <p className="font-bold text-lg">Lung Abnormalities Detected</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
