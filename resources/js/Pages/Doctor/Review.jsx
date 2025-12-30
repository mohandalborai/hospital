import { Head, useForm, Link } from '@inertiajs/react';

export default function Review({ auth, report }) {
    const { data, setData, post, processing, errors } = useForm({
        doctor_notes: '',
        prescription: '',
    });

    const reportData = report;
    let aiAnalysisResult = { findings: [], summary: '', confidence_score: 0 };
    try {
        aiAnalysisResult = reportData.ai_analysis_result ? (typeof reportData.ai_analysis_result === 'string' ? JSON.parse(reportData.ai_analysis_result) : reportData.ai_analysis_result) : aiAnalysisResult;
    } catch (e) {
        console.error("AI Analysis parsing error", e);
    }

    const submit = (e) => {
        e.preventDefault();
        post(`/doctor/review/${reportData.id}`);
    };

    return (
        <>
            <Head title="Clinical Case Evaluation" />
             <div className="min-h-screen bg-slate-50 font-sans p-6">
                <nav className="mb-8">
                     <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/doctor/dashboard" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                            &larr; Back to Dashboard
                        </Link>
                     </div>
                </nav>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Left: Image & AI Analysis */}
                        <div className="space-y-8">
                            {/* Scan Card */}
                            <div className="bg-white rounded-3xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
                                <div className="px-8 py-6 bg-slate-50/50 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Medical Imaging</h3>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case #{String(reportData.id).padStart(5, '0')}</span>
                                </div>
                                <div className="p-6">
                                    <div className="aspect-square bg-slate-900 rounded-2xl overflow-hidden flex justify-center items-center shadow-inner relative group/image">
                                        <img src={`/storage/${reportData.file_path}`} alt="Medical Scan" className="max-h-[95%] max-w-[95%] object-contain transition-transform duration-700 group-hover/image:scale-105" />
                                        <div className="absolute bottom-4 right-4">
                                            <a href={`/storage/${reportData.file_path}`} target="_blank" className="bg-white/10 backdrop-blur-md text-white p-3 rounded-xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AI Analysis */}
                            <div className="bg-indigo-900 rounded-3xl shadow-lg overflow-hidden text-white relative group transition-all duration-300">
                                <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                                <div className="px-8 py-8 bg-white/5 flex justify-between items-center relative z-10">
                                    <h3 className="text-lg font-bold tracking-tight">AI Analysis Results</h3>
                                    <div className="bg-indigo-500/20 px-4 py-2 rounded-lg text-indigo-200 text-[10px] font-bold uppercase tracking-widest border border-indigo-400/20 flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                                        Interpreted confidence: {Math.round(aiAnalysisResult.confidence_score * 100)}%
                                    </div>
                                </div>
                                <div className="px-8 py-8 relative z-10">
                                    <h4 className="font-bold text-indigo-300 text-[10px] uppercase tracking-widest mb-6">Key System Findings</h4>
                                    <div className="space-y-4">
                                        {aiAnalysisResult.findings?.map((finding, index) => (
                                            <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-200">
                                                <div className="h-6 w-6 bg-indigo-500 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
                                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-indigo-50 leading-relaxed font-semibold">{finding}</p>
                                            </div>
                                        )) || <p className="text-sm text-indigo-200 italic">No specific findings listed.</p>}
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/5">
                                        <h4 className="font-bold text-indigo-300 text-[10px] uppercase tracking-widest mb-4">Neural Summary</h4>
                                        <p className="text-sm text-indigo-100 font-medium italic border-l-2 border-indigo-400 pl-4 py-2">
                                            "{aiAnalysisResult.summary}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Doctor Review Form */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-3xl shadow-sm overflow-hidden h-fit sticky top-24 hover:shadow-md transition-all duration-300">
                                <div className="px-8 py-8">
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Professional Review</h3>
                                    <p className="mt-2 text-slate-400 font-medium text-sm">Provide your clinical evaluation and treatment plan.</p>
                                </div>
                                
                                <form onSubmit={submit} className="p-8 space-y-8">
                                    <div className="space-y-8">
                                        <div>
                                            <label htmlFor="doctor_notes" className="block text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Clinical Findings</label>
                                            <textarea
                                                id="doctor_notes"
                                                value={data.doctor_notes}
                                                onChange={(e) => setData('doctor_notes', e.target.value)}
                                                rows="8"
                                                required
                                                className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all resize-none text-slate-900 font-semibold text-sm placeholder-slate-300 outline-none"
                                                placeholder="Analyze the raw imaging data and validate AI findings..."
                                            ></textarea>
                                            {errors.doctor_notes && (
                                                <p className="mt-2 text-xs text-rose-500 font-bold uppercase tracking-widest">{errors.doctor_notes}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="prescription" className="block text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Prescription protocol</label>
                                            <textarea
                                                id="prescription"
                                                value={data.prescription}
                                                onChange={(e) => setData('prescription', e.target.value)}
                                                rows="4"
                                                className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all resize-none text-slate-900 font-semibold text-sm placeholder-slate-300 outline-none"
                                                placeholder="Specify medications, dosage, and next steps..."
                                            ></textarea>
                                        </div>

                                        <div className="pt-4 flex flex-col gap-4">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed"
                                            >
                                                {processing ? (
                                                    <span>Submitting...</span>
                                                ) : (
                                                    <>
                                                        <span>Submit Review</span>
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => window.history.back()}
                                                className="w-full text-center py-2 text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                                            >
                                                ← Cancel and Return
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
