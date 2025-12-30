import { Head, useForm, Link } from '@inertiajs/react';

export default function Show({ auth, report, specialists }) {
    const { data, setData, post, processing, errors } = useForm({
        doctor_id: '',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/gp/refer/${report.id}`);
    };

    const formatAiAnalysis = (result) => {
        if (!result) return 'No AI analysis available.';
        try {
            const analysis = typeof result === 'string' ? JSON.parse(result) : result;
            return JSON.stringify(analysis, null, 2);
        } catch (e) {
            return 'Error parsing AI analysis.';
        }
    };

    const getFileExtension = (filename) => {
        return filename.split('.').pop().toLowerCase();
    };

    const isImage = (filename) => {
        return ['jpg', 'jpeg', 'png', 'webp'].includes(getFileExtension(filename));
    };

    const isPdf = (filename) => {
        return getFileExtension(filename) === 'pdf';
    };

    return (
        <>
            <Head title={`Review Case #${report.id}`} />
            <div className="min-h-screen bg-slate-50 font-sans p-6">
                <nav className="mb-8">
                     <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/gp/dashboard" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                            &larr; Back to Dashboard
                        </Link>
                     </div>
                </nav>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Patient & Report Data */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Image Viewer */}
                            <div className="bg-white p-1 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="bg-slate-900 rounded-[20px] overflow-hidden relative group">
                                    {report.file_path && (
                                        <>
                                            {isImage(report.file_path) ? (
                                                <img src={`/storage/${report.file_path}`} alt="Medical Scan" className="w-full h-auto object-contain max-h-[500px]" />
                                            ) : isPdf(report.file_path) ? (
                                                <div className="h-[500px] flex items-center justify-center bg-slate-800 text-white">
                                                    <iframe src={`/storage/${report.file_path}`} className="w-full h-full"></iframe>
                                                </div>
                                            ) : (
                                                <div className="h-64 flex items-center justify-center text-slate-500">
                                                    Unsupported file format. <a href={`/storage/${report.file_path}`} className="text-indigo-400 underline ml-2" target="_blank">Download</a>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    
                                    {/* AI Overlay Badge */}
                                    <div className="absolute top-4 left-4">
                                         <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-sm">
                                            <svg className="h-3 w-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            <span className="text-xs font-bold text-slate-900">AI Analyzed</span>
                                         </span>
                                    </div>
                                </div>
                            </div>

                            {/* AI Analysis Results */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    AI Findings
                                </h3>
                                <div className="bg-slate-50 rounded-2xl p-5 font-mono text-sm text-slate-700 leading-relaxed">
                                    <pre className="whitespace-pre-wrap font-sans">{formatAiAnalysis(report.ai_analysis_result)}</pre>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Actions */}
                        <div className="space-y-6">
                            {/* Patient Info Card */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Patient Details</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-700">
                                        {(report.patient?.name || 'U').charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{report.patient?.name || 'Unknown'}</h4>
                                        <p className="text-xs text-slate-500">{report.patient?.email}</p>
                                    </div>
                                </div>
                                 <div className="p-3 bg-slate-50 rounded-xl">
                                    <p className="text-xs text-slate-500 font-bold uppercase">Requested Specialty</p>
                                    <p className="text-sm font-semibold text-slate-900">{report.required_specialty || 'General'}</p>
                                </div>
                            </div>

                            {/* Referral Form */}
                            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-500/10 border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Refer to Specialist</h3>
                                <p className="text-xs text-slate-500 mb-6">Select a specialist to assign this case.</p>

                                <form onSubmit={submit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Specialist</label>
                                            <select
                                                value={data.doctor_id}
                                                onChange={(e) => setData('doctor_id', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm font-semibold text-slate-700 bg-slate-50 outline-none"
                                            >
                                                <option value="">Select a Doctor...</option>
                                                {specialists.map((doctor) => (
                                                    <option key={doctor.id} value={doctor.id}>Dr. {doctor.name} ({doctor.specialization})</option>
                                                ))}
                                            </select>
                                            {errors.doctor_id && <p className="text-red-500 text-xs mt-1">{errors.doctor_id}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">GP Notes / Triage Info</label>
                                            <textarea
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                rows="4"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm bg-slate-50 outline-none"
                                                placeholder="Add clinical notes for the specialist..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-200 active:scale-[0.98] disabled:opacity-75"
                                        >
                                            Confirm Referral
                                        </button>
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
