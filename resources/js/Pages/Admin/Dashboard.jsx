import { Head, Link } from '@inertiajs/react';


export default function Dashboard({ auth, stats }) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-slate-50 font-sans">
                 <nav className="bg-slate-900 border-b border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center gap-2">
                                     <span className="font-bold text-xl tracking-tight text-white">MediAI Admin</span>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <Link href="/admin/dashboard" className="text-white inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
                                        Dashboard
                                    </Link>
                                    <Link href="/admin/users" className="text-slate-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-slate-300 text-sm font-medium transition-colors">
                                        Users
                                    </Link>
                                    <Link href="/admin/reports" className="text-slate-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-slate-300 text-sm font-medium transition-colors">
                                        Reports
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-slate-300">Admin {auth.user.name}</span>
                                <Link href="/logout" method="post" className="text-sm font-medium text-red-400 hover:text-red-300">Sign Out</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                             {/* Stats Cards */}
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Users</h3>
                                <p className="text-3xl font-extrabold text-slate-900 mt-2">{stats.total_users}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Doctors</h3>
                                <p className="text-3xl font-extrabold text-slate-900 mt-2">{stats.total_doctors}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Patients</h3>
                                <p className="text-3xl font-extrabold text-slate-900 mt-2">{stats.total_patients}</p>
                            </div>
                            <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-200 text-white">
                                <h3 className="text-white/80 text-xs font-bold uppercase tracking-wider">Reports</h3>
                                <p className="text-3xl font-extrabold mt-2">{stats.total_reports}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                             <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                             <div className="flex gap-4">
                                <Link href="/admin/users" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-all">Manage Users</Link>
                                <Link href="/admin/reports" className="px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">View All Reports</Link>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
