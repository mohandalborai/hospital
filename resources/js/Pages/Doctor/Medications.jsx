import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react'

export default function Medications({ auth, medications }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        classification: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/doctor/medications', {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
        });
    };

    const deleteMedication = (id) => {
        if (confirm('Remove this protocol?')) {
            router.delete(`/doctor/medications/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Medications" />
             <div className="min-h-screen bg-slate-50 font-sans p-6">
                 <nav className="mb-8">
                     <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <Link href="/doctor/dashboard" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                            &larr; Back to Dashboard
                        </Link>
                     </div>
                </nav>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="p-8 flex justify-between items-center bg-slate-50/30">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Prescription Library</h2>
                                <p className="text-slate-400 font-medium mt-1 text-sm">Manage clinical medication protocols.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 group/btn active:scale-[0.98]">
                                <svg className="h-4 w-4 transform group-hover/btn:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Protocol</span>
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Name</th>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classification</th>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medications.length > 0 ? (
                                        medications.map((medication) => (
                                            <tr key={medication.id} className="hover:bg-slate-50/30 transition-all duration-200 group/row">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover/row:bg-white group-hover/row:text-indigo-600 transition-colors shadow-inner">
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-bold text-slate-900 text-sm tracking-tight">{medication.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-slate-600">
                                                        {medication.classification}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button onClick={() => deleteMedication(medication.id)} className="p-2 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all">
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mb-6 shadow-inner">
                                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-lg font-bold text-slate-900">No protocols found</p>
                                                    <p className="mt-1 text-slate-400 font-medium text-sm">Add your first clinical protocol to start.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
                            <div className="p-6 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-900">Add Protocol</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={submit} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Protocol Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all text-sm font-medium outline-none"
                                        placeholder="e.g. Lisinopril 10mg"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Clinical Class</label>
                                    <div className="relative">
                                        <select
                                            value={data.classification}
                                            onChange={(e) => setData('classification', e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all appearance-none text-sm font-medium outline-none"
                                        >
                                            <option value="">Select therapeutic class...</option>
                                            <option value="Analgesic">Analgesic</option>
                                            <option value="Antibiotic">Antibiotic</option>
                                            <option value="Antiviral">Antiviral</option>
                                            <option value="Anti-inflammatory">Anti-inflammatory</option>
                                            <option value="Antidepressant">Antidepressant</option>
                                            <option value="Cardiovascular">Cardiovascular</option>
                                            <option value="Gastrointestinal">Gastrointestinal</option>
                                            <option value="Respiratory">Respiratory</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                     {errors.classification && <p className="text-red-500 text-xs mt-1">{errors.classification}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] disabled:opacity-75"
                                >
                                    Save Protocol
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
