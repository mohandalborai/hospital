import { Head, Link, usePage } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Dashboard({ auth, pendingReports = { data: [], links: [], total: 0 }, myReviewedReports = { data: [], links: [], total: 0 }, medications = [] }) {
    
    // Safety helper for AI analysis
    const getAiSummary = (result) => {
        if (!result) return 'The intelligent clinical core has finished the initial pre-processing of this imaging data. Awaiting expert validation.';
        try {
            const parsed = typeof result === 'string' ? JSON.parse(result) : result;
            return parsed?.summary || parsed?.label || 'The intelligent clinical core has finished the initial pre-processing of this imaging data. Awaiting expert validation.';
        } catch (e) {
            return 'Analysis data available but malformed.';
        }
    };

    return (
        <>
            <Head title="Medical Professional Dashboard" />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Navbar (Mock for now) */}
                 <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center gap-2">
                                     <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                    <span className="font-bold text-xl tracking-tight">MediAI Console</span>
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
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {usePage().props.flash?.success && (
                            <div className="mb-8 p-4 bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl shadow-sm">
                                <div className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm font-bold text-emerald-800">{usePage().props.flash.success}</p>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                            {/* Stats Sidebar */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* Performance Card */}
                                <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Monthly Performance</h3>
                                    <div className="space-y-8">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Cases Reviewed</p>
                                                <div className="h-8 w-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                                    <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="text-4xl font-black text-slate-900 tracking-tight">{myReviewedReports.total}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pending Priority</p>
                                                <div className="h-8 w-8 bg-rose-50 rounded-lg flex items-center justify-center">
                                                    <svg className="h-4 w-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="text-4xl font-black text-slate-900 tracking-tight">{pendingReports.total}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <Link href="/doctor/medications" className="flex items-center justify-between group/link">
                                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Medication Library</span>
                                            <svg className="h-4 w-4 text-indigo-600 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-3 space-y-10">
                                
                                {/* Pending Reviews */}
                                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                                    <div className="px-10 py-8 bg-slate-50/50 flex justify-between items-center backdrop-blur-sm">
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight ml-2">
                                            Urgent Assignments
                                        </h3>
                                        <span className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] bg-indigo-600 text-white shadow-lg shadow-indigo-100">
                                            {auth.user.specialization} Specialist
                                        </span>
                                    </div>
                                    
                                    {pendingReports.data.length === 0 ? (
                                        <div className="p-24 text-center">
                                            <div className="h-24 w-24 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto mb-8 shadow-inner">
                                                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-xl font-black text-slate-900">Task queue is clear</p>
                                            <p className="mt-4 text-slate-400 font-medium text-sm">You have reviewed all incoming case files for your specialty.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 p-8">
                                            {pendingReports.data.map((report) => (
                                                <div key={report.id} className="px-6 py-6 bg-slate-50/30 rounded-2xl hover:bg-slate-50 transition-all duration-500 group">
                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center gap-6">
                                                            <div className="h-16 w-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-slate-200 transition-all duration-500 group-hover:rotate-3">
                                                                {report.patient?.name?.charAt(0) || 'U'}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-black text-slate-900 text-xl tracking-tight leading-none">{report.patient?.name || 'Unknown'}</h4>
                                                                <div className="flex items-center gap-3 mt-3">
                                                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Received {new Date(report.created_at).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                                                                    <div className="h-1 w-1 rounded-full bg-slate-200"></div>
                                                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded-lg">
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                                                                        <span className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">AI MATCH 94%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link href={`/doctor/review/${report.id}`} className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]">
                                                            Analyze Case
                                                        </Link>
                                                    </div>
                                                    <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm relative group-hover:shadow-md transition-all duration-500">
                                                        <div className="absolute -top-3 -left-3 h-8 w-8 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-400">
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-sm text-slate-600 leading-relaxed font-bold italic pl-4 border-l-2 border-indigo-100">
                                                            "{getAiSummary(report.ai_analysis_result)}"
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="bg-slate-50 border-t border-slate-100 p-4">
                                        <Pagination links={pendingReports.links} />
                                    </div>
                                </div>

                                {/* History */}
                                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                                     <div className="px-10 py-6 bg-slate-50/30">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Successful Consultations</h3>
                                    </div>
                                    <div className="space-y-2 p-4">
                                        {myReviewedReports.data.map((report) => (
                                            <div key={report.id} className="px-10 py-8 flex items-center justify-between hover:bg-slate-50/30 transition-colors">
                                                <div className="flex items-center gap-5">
                                                    <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900 tracking-tight leading-none">{report.patient.name}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest">{new Date(report.updated_at).toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})} • Case Archived</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-black text-emerald-600 tracking-tight leading-none">+$50.00</p>
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">
                                                        <div className="h-1 w-1 rounded-full bg-emerald-400"></div>
                                                        Verified Payout
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-slate-50 border-t border-slate-100 p-4">
                                        <Pagination links={myReviewedReports.links} />
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
