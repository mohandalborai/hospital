import { useForm, Head, Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Sign In" />
            <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 p-10 sm:p-14 w-full max-w-lg border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-6 shadow-sm hover:scale-105 transition-transform">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </Link>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-400 font-medium mt-2">Access your secure medical dashboard.</p>
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

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="block w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-semibold text-slate-900 placeholder-slate-400 outline-none"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-semibold text-slate-900 placeholder-slate-400 outline-none"
                                    placeholder="••••••••"
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
                                {processing ? 'Authenticating...' : 'Sign In to Console'}
                            </button>
                        </div>

                        <p className="text-center text-sm font-medium text-slate-500">
                            Don't have an account? 
                            <a href="/register" className="text-indigo-600 font-bold hover:underline ml-1">Create Access ID</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
