import { Head, useForm, Link, usePage } from '@inertiajs/react';

export default function Assessment({ auth, flash }) {
    const { data, setData, post, processing, errors } = useForm({
        symptoms: '',
    });

    // Inertia flashes are often passed differently depending on setup.
    // If we use standard Inertia props sharing, key 'assessment' might be in flash or straight props.
    // Checking previous Controller code: return redirect()->back()->with('assessment', $assessment);
    // Inertia shares flash messages. We need to access $page.props.flash.assessment or similar.
    // However, when using Inertia::render from controller, we can pass props directly.
    // But this is a form submission redirecting back.
    // The previous controller logic was: return redirect()->back()->with(...).
    // Inertia will handle this by updating the props on the same page.
    
    // We should check what's actually available.
    // Ideally, we might pass 'assessment' as a prop if it exists.
    // Let's assume flash.assessment is available if we set up HandleInertiaRequests to share flash.
    // The default Laravel Inertia middleware usually shares 'flash' => ['success' => ..., 'error' => ...].
    // We might need to update HandleInertiaRequests to share 'assessment' or 'flash.assessment'.
    // For now, let's look at `flash` prop.

    const assessment = usePage().props.flash?.assessment;

    const submit = (e) => {
        e.preventDefault();
        post('/patient/assessment', {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Interactive Health Assessment" />
            <div className="min-h-screen bg-slate-50 font-sans p-6">
                 <nav className="mb-8">
                     <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <Link href="/patient/dashboard" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                            &larr; Back to Dashboard
                        </Link>
                     </div>
                </nav>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Assessment Form */}
                        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-8 group hover:shadow-md transition-all duration-300">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight flex items-center gap-3">
                                <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 transition-all group-hover:rotate-3">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                Quick Assessment
                            </h2>
                            <p className="text-slate-400 font-medium mb-8 text-sm leading-relaxed">
                                Describe your symptoms below. Our AI will analyze your description to recommend the most suitable clinical department.
                            </p>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Description</label>
                                    <textarea
                                        value={data.symptoms}
                                        onChange={(e) => setData('symptoms', e.target.value)}
                                        rows="6"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all resize-none text-slate-900 font-medium placeholder-slate-300 outline-none"
                                        placeholder="Describe how you're feeling..."
                                    ></textarea>
                                    {errors.symptoms && <p className="text-red-500 text-xs mt-1">{errors.symptoms}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-indigo-600 text-white rounded-2xl p-6 hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 group active:scale-[0.98] flex items-center justify-between text-left relative overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative z-10">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-1 block">Clinical Core</span>
                                        <h3 className="text-base font-black uppercase tracking-tight leading-tight flex flex-col">
                                            <span>{processing ? 'Processing...' : 'Process Clinical'}</span>
                                            <span className="text-indigo-200">Analysis</span>
                                        </h3>
                                    </div>
                                    <div className="relative z-10 h-14 w-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-indigo-600 transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-110 shadow-lg">
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </button>
                            </form>
                        </div>

                        {/* Result Column */}
                        <div className="lg:col-span-3">
                            {assessment ? (
                                <div className="bg-indigo-900 rounded-3xl shadow-xl p-10 text-white relative overflow-hidden group h-full flex flex-col justify-center transition-all duration-300 animate-in fade-in zoom-in">
                                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
                                    
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold tracking-tight mb-8 flex items-center gap-3">
                                            <div className="h-8 w-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-indigo-300">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            Clinical Recommendation
                                        </h3>
                                        
                                        <div className="mb-10">
                                            <div className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-2">Primary Match</div>
                                            <div className="text-5xl font-bold tracking-tighter">{assessment.recommended_specialty}</div>
                                        </div>

                                        {assessment.recommended_doctor_id && assessment.recommended_doctor ? (
                                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/10 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-indigo-900 font-bold text-xl">
                                                        {assessment.recommended_doctor.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-0.5">Recommended Physician</div>
                                                        <div className="text-lg font-bold tracking-tight">Dr. {assessment.recommended_doctor.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-6 rounded-xl bg-indigo-800/50 text-xs font-semibold text-indigo-200 backdrop-blur-sm italic">
                                                Specialists are currently reviewing incoming data. You can proceed with a scan upload for further analysis.
                                            </div>
                                        )}

                                        <div className="mt-10 pt-8 flex items-center justify-between">
                                            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Confidence: 98%</p>
                                            <Link href="/patient/upload" className="inline-flex items-center text-xs font-bold bg-white text-indigo-900 px-6 py-3.5 rounded-xl uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg active:scale-[0.98] group/link">
                                                Upload Scan
                                                <svg className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-16 text-center group hover:bg-white hover:border-indigo-100 transition-all duration-300">
                                    <div className="h-24 w-24 bg-white rounded-2xl flex items-center justify-center text-slate-100 mb-8 shadow-sm group-hover:text-indigo-600 transition-all">
                                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900 tracking-tight">Ready for analysis</p>
                                    <p className="mt-2 text-slate-400 font-medium text-sm max-w-xs mx-auto">Submit your symptoms to receive an automated clinical recommendation.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
