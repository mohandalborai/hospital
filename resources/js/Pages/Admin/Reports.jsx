import { Head, Link, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Reports({ auth, reports }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
            destroy(`/admin/reports/${id}`);
        }
    };

    return (
        <>
            <Head title="Admin - Reports Management" />
            <div className="min-h-screen bg-slate-50 font-sans">
                 <nav className="bg-slate-900 border-b border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                             <div className="flex">
                                <Link href="/admin/dashboard" className="shrink-0 flex items-center gap-2 font-bold text-xl tracking-tight text-white mr-10 hover:text-indigo-400 transition-colors">
                                     MediAI Admin
                                </Link>
                                <div className="hidden space-x-8 sm:-my-px sm:flex">
                                    <Link href="/admin/dashboard" className="text-slate-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-slate-300 text-sm font-medium transition-colors">
                                        Dashboard
                                    </Link>
                                    <Link href="/admin/users" className="text-slate-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-slate-300 text-sm font-medium transition-colors">
                                        Users
                                    </Link>
                                    <Link href="/admin/reports" className="text-white inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
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
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900">Reports Management</h2>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Patient</th>
                                        <th className="px-6 py-4">Assigned Doctor</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {reports.data.map((report) => (
                                        <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-500">#{report.id}</td>
                                            <td className="px-6 py-4 font-bold text-slate-900">{report.patient?.name || 'Unknown'}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{report.doctor?.name ? 'Dr. ' + report.doctor.name : 'Unassigned'}</td>
                                            <td className="px-6 py-4">
                                                 <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                                                    ${report.status.includes('completed') ? 'bg-emerald-100 text-emerald-700' : 
                                                      report.status.includes('pending') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                                                    {report.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500">{new Date(report.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <a href={`/storage/${report.file_path}`} target="_blank" className="text-indigo-600 hover:text-indigo-900 font-bold text-xs hover:underline">View File</a>
                                                <button onClick={() => handleDelete(report.id)} className="text-red-500 hover:text-red-700 font-bold text-xs hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 border-t border-slate-100">
                                <Pagination links={reports.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
