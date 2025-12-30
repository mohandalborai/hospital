import { useForm, Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role: 'patient',
        specialization: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <>
            <Head title="Create Account" />
            <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 p-10 sm:p-14 w-full max-w-lg border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-6 shadow-sm hover:scale-105 transition-transform">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </Link>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h2>
                        <p className="text-slate-400 font-medium mt-2">Join our medical AI platform.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {Object.keys(errors).length > 0 && (
                            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3 animate-pulse">
                                <svg className="h-5 w-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-xs font-bold text-rose-700">
                                    {Object.values(errors).map((error, index) => (
                                        <p key={index}>{error}</p>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="block w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-semibold text-slate-900 placeholder-slate-400 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="block w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-semibold text-slate-900 placeholder-slate-400 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">I am a...</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['patient', 'gp', 'doctor'].map((role) => (
                                    <label key={role} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value={role}
                                            checked={data.role === role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            className="peer sr-only"
                                        />
                                        <div className="rounded-xl border border-slate-200 p-3 hover:bg-slate-50 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 transition-all text-center">
                                            <span className="block text-sm font-bold capitalize">{role === 'gp' ? 'GP' : role}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {data.role === 'doctor' && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <label htmlFor="specialization" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Specialization</label>
                                <input
                                    id="specialization"
                                    type="text"
                                    value={data.specialization}
                                    onChange={(e) => setData('specialization', e.target.value)}
                                    className="block w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-semibold text-slate-900 placeholder-slate-400 outline-none"
                                    placeholder="e.g. Cardiologist"
                                />
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-semibold text-slate-900 placeholder-slate-400 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Confirm Password</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="block w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-semibold text-slate-900 placeholder-slate-400 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-slate-900 text-white rounded-xl py-4 font-bold text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-200 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed flex justify-center"
                            >
                                {processing ? 'Creating Account...' : 'Register'}
                            </button>
                        </div>

                        <p className="text-center text-sm font-medium text-slate-500">
                            Already have an account? 
                            <a href="/login" className="text-indigo-600 font-bold hover:underline ml-1">Sign In</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
