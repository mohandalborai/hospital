import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ auth, reports = [] }) {
    const formatAiAnalysis = (result) => {
        if (!result) return { summary: 'Pending AI', confidence: null };
        try {
            const analysis = typeof result === 'string' ? JSON.parse(result) : result;
            return {
                 summary: analysis.label || analysis.summary || 'N/A',
                 confidence: analysis.score || analysis.confidence_score || 0
            };
        } catch (e) {
            return { summary: 'Error parsing AI', confidence: null };
        }
    };

    return (
        <>
            <Head title="GP Console" />
            <div className="min-h-screen bg-slate-50 font-sans">
                 <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center gap-2">
                                     <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                    <span className="font-bold text-xl tracking-tight">MediAI GP Console</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-slate-600">Dr. {auth.user.name}</span>
                                <Link href="/logout" method="post" className="text-sm font-medium text-red-500 hover:text-red-700">Sign Out</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        {/* Stats / Welcome */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Triage</h3>
                                <p className="text-3xl font-extrabold text-slate-900 mt-2">{reports.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">My Shift</h3>
                                <p className="text-3xl font-extrabold text-slate-900 mt-2">Active</p>
                            </div>
                            <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-200 text-white">
                                <h3 className="text-white/80 text-xs font-bold uppercase tracking-wider">System Status</h3>
                                <p className="text-3xl font-extrabold mt-2">Online</p>
                            </div>
                        </div>

                        {/* Reports List */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-slate-900">Incoming Cases</h2>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">Live Feed</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Patient</th>
                                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Case ID</th>
                                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">AI Analysis</th>
                                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {reports.length > 0 ? (
                                            reports.map((report) => {
                                                const analysis = formatAiAnalysis(report.ai_analysis_result);
                                                return (
                                                    <tr key={report.id} className="hover:bg-slate-50/80 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                                    {(report.patient?.name || 'U').charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-slate-900">{report.patient?.name || 'Unknown'}</p>
                                                                    <p className="text-[10px] text-slate-400 font-medium">{new Date(report.created_at).toLocaleDateString()}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="font-mono text-xs text-slate-500">#{report.id}</span>
                                                        </td>
                                                        <td className="px-6 py-4 max-w-xs">
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-bold text-slate-700 truncate">{analysis.summary.length > 30 ? analysis.summary.substring(0, 30) + '...' : analysis.summary}</span>
                                                                {analysis.confidence && (
                                                                    <span className="text-[10px] text-emerald-600 font-bold">{Math.round(analysis.confidence * 100)}% Confidence</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                                                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Needs Triage</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <Link href={`/gp/report/${report.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-200">
                                                                Review & Refer
                                                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                                    <p className="text-sm font-medium">No pending cases. Good job!</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
