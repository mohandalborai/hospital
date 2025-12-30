import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useCallback } from 'react';

export default function Upload({ auth }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        specialty: '',
        medical_image: null,
    });
    const [fileName, setFileName] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    }, []);

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFiles = (file) => {
        setFileName(file.name);
        setData('medical_image', file);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/patient/upload', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Upload Medical Image" />
            <div className="min-h-screen bg-slate-50 font-sans p-6">
                <nav className="mb-8">
                     <div className="max-w-3xl mx-auto flex items-center justify-between">
                        <Link href="/patient/dashboard" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                            &larr; Back to Dashboard
                        </Link>
                     </div>
                </nav>

                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Medical Imaging Analysis
                        </h2>
                        <p className="mt-3 text-slate-400 font-medium mx-auto text-base max-w-lg leading-relaxed">
                            Upload your medical scans for automated pre-diagnostic analysis and specialist review.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="p-8 sm:p-12">
                            <form onSubmit={submit}>
                                {Object.keys(errors).length > 0 && (
                                    <div className="rounded-2xl bg-rose-50 p-5 mb-8 border border-rose-100 flex items-start gap-4">
                                        <div className="shrink-0 h-8 w-8 bg-white rounded-lg flex items-center justify-center text-rose-500 shadow-sm">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-rose-900 uppercase tracking-widest">Upload Error</h3>
                                            <ul className="mt-1 space-y-0.5 text-xs text-rose-700 font-medium">
                                                {Object.values(errors).map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-8 bg-slate-50 p-6 rounded-2xl transition-all group-hover:bg-white group-hover:border-indigo-100 border border-transparent">
                                    <label className="block text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
                                        Clinical Specialty
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={data.specialty}
                                            onChange={(e) => setData('specialty', e.target.value)}
                                            required
                                            className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all appearance-none text-slate-900 text-sm font-semibold outline-none"
                                        >
                                            <option value="">Choose diagnostic department...</option>
                                            <option value="Cardiology">Cardiology</option>
                                            <option value="Dermatology">Dermatology</option>
                                            <option value="Neurology">Neurology</option>
                                            <option value="Orthopedics">Orthopedics</option>
                                            <option value="Radiology">Radiology</option>
                                            <option value="General Practice">General Practice</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="group/upload">
                                    <div
                                        className={`relative w-full h-80 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer ${
                                            isDragging || fileName
                                                ? 'border-emerald-500 bg-emerald-50/20'
                                                : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50 bg-slate-50/20'
                                        }`}
                                        onDrop={onDrop}
                                        onDragOver={onDragOver}
                                        onDragLeave={onDragLeave}
                                    >
                                        <div className="text-center px-6 space-y-4">
                                            <div className="mx-auto h-20 w-20 bg-white rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover/upload:-translate-y-1">
                                                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                            </div>

                                            <div className="space-y-1">
                                                <p className="text-lg font-bold text-slate-700">
                                                    <label htmlFor="file-upload" className="cursor-pointer text-indigo-600 hover:underline">
                                                        Choose file
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            accept=".jpg,.jpeg,.png,.pdf"
                                                            onChange={(e) => e.target.files && handleFiles(e.target.files[0])}
                                                        />
                                                    </label>
                                                    <span className="text-slate-400"> or drag here</span>
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Supports JPG, PNG, PDF up to 10MB</p>
                                            </div>

                                            {fileName && (
                                                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest shadow-xl animate-in fade-in zoom-in duration-300">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                                                    <span>{fileName}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {progress && (
                                    <div className="mt-4 w-full bg-slate-200 rounded-full h-1.5 dark:bg-slate-700 overflow-hidden">
                                        <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress.percentage}%` }}></div>
                                    </div>
                                )}

                                <div className="mt-10 flex items-center justify-between">
                                    <Link href="/patient/dashboard" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
                                        ← Back to History
                                    </Link>
                                    
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-8 py-3.5 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] group/btn disabled:opacity-75 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Start Analysis</span>
                                                <svg className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
