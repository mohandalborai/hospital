import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Pagination from '@/Components/Pagination';

export default function Dashboard({ auth, reports }) {
    return (
        <>
            <Head title="Health Profile" />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Navbar (Mock for now, could be a Layout) */}
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
                                <span className="text-sm font-bold text-slate-600">{auth.user.name}</span>
                                <Link href="/logout" method="post" className="text-sm font-medium text-red-500 hover:text-red-700">Sign Out</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                            {/* Sidebar / Actions */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white rounded-3xl shadow-sm p-8 text-center group hover:shadow-md transition-all duration-300">
                                    <div className="h-20 w-20 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6 transition-all group-hover:rotate-3">
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Scan Report</h3>
                                    <p className="mt-3 text-sm text-slate-400 font-medium leading-relaxed">Upload a medical image for AI analysis and specialist review.</p>
                                    <div className="mt-8">
                                        <a href="/patient/upload" className="inline-flex items-center justify-center w-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl text-white bg-indigo-600 hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]">
                                            Start New Upload
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-100 p-8 text-white relative overflow-hidden group min-h-[300px] flex flex-col justify-between transition-all duration-300">
                                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
                                    <div className="relative z-10">
                                        <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9l-.707.707M12 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight">AI Health Assessment</h3>
                                        <p className="mt-4 text-sm text-indigo-50 font-medium leading-relaxed">Describe symptoms and get tailored specialized recommendations.</p>
                                    </div>
                                    <div className="mt-8 relative z-10">
                                        <a href="/patient/assessment" className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-white text-indigo-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all shadow-xl active:scale-[0.98]">
                                            Start Assessment
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl shadow-sm p-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case Load</h4>
                                            <p className="text-3xl font-bold text-slate-900 mt-1">{reports.total}</p>
                                        </div>
                                        <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shadow-inner">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content / Reports List */}
                            <div className="lg:col-span-3">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Clinical History</h2>
                                    <button className="px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-slate-100 text-slate-500 bg-white hover:bg-slate-50 transition-all">Export All</button>
                                </div>

                                {reports.data.length === 0 ? (
                                    <div className="bg-white rounded-3xl shadow-sm p-20 text-center">
                                        <div className="h-20 w-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto mb-6 shadow-inner">
                                            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">No medical records yet</h3>
                                        <p className="mt-3 text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">Your diagnostic history and specialist reports will be archived here.</p>
                                        <div className="mt-10">
                                            <a href="/patient/upload" className="text-indigo-600 font-bold hover:underline inline-flex items-center gap-2">
                                                Upload your first scan
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {reports.data.map((report) => (
                                            <div key={report.id} className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
                                                <div className="p-8">
                                                    {/* Top Section */}
                                                    <div className="flex items-start gap-6 pb-8">
                                                        <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600 transition-all group-hover:bg-indigo-600 group-hover:text-white shrink-0 shadow-inner">
                                                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h3 className="text-lg font-bold text-slate-900">Report <span className="text-indigo-600">#{String(report.id).padStart(4, '0')}</span></h3>
                                                                    <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">
                                                                        {new Date(report.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} • <span className="text-slate-600">{report.required_specialty || 'General Medicine'}</span>
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    {report.status === 'reviewed' ? (
                                                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-lg border border-emerald-100">Reviewed</span>
                                                                    ) : report.status === 'pending_specialist' ? (
                                                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded-lg border border-indigo-100">With Specialist</span>
                                                                    ) : report.status === 'pending_gp' ? (
                                                                        <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase rounded-lg border border-amber-100">Pending Triage</span>
                                                                    ) : (
                                                                        <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase rounded-lg border border-slate-200">Processing</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="mt-4">
                                                                <a href={`/storage/${report.file_path}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-2">
                                                                    View Imaging Scan
                                                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                                        {/* AI Evaluation Card */}
                                                        <div className="bg-indigo-50/20 rounded-2xl p-6">
                                                            <div className="flex items-center gap-3 mb-6">
                                                                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
                                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">AI Diagnostics</span>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {JSON.parse(report.ai_analysis_result)?.findings?.map((finding, idx) => (
                                                                    <div key={idx} className="flex items-start gap-3">
                                                                        <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                                                                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                            </svg>
                                                                        </div>
                                                                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{finding}</p>
                                                                    </div>
                                                                )) || <p className="text-xs text-slate-500">No specific findings recorded.</p>}
                                                            </div>
                                                        </div>

                                                        {/* Doctor Feedback Card */}
                                                        <div className="bg-gray-50/30 rounded-2xl p-6">
                                                            {report.doctor_notes ? (
                                                                <>
                                                                    <div className="flex items-center gap-3 mb-6">
                                                                        <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-md">
                                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                            </svg>
                                                                        </div>
                                                                        <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Specialist Review</span>
                                                                    </div>
                                                                    <div className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl whitespace-pre-wrap">
                                                                        {report.doctor_notes}
                                                                    </div>
                                                                    {report.doctor && (
                                                                         <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-3">
                                                                            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                                                                {report.doctor.name.charAt(0)}
                                                                            </div>
                                                                            <div>
                                                                                <span className="block text-xs font-bold text-slate-900">Dr. {report.doctor.name}</span>
                                                                                <span className="block text-[10px] text-indigo-600 font-semibold uppercase">{report.doctor.specialization}</span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <div className="h-full flex flex-col items-center justify-center py-6 text-center">
                                                                    <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4 animate-pulse">
                                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                    </div>
                                                                    <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Awaiting validation</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-6">
                                    <Pagination links={reports.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
