import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Pagination from '@/Components/Pagination';

export default function Users({ auth, users }) {
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        id: null,
        name: '',
        email: '',
        password: '',
        role: 'patient',
        specialization: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const openModal = (user = null) => {
        if (user) {
            setIsEditMode(true);
            setData({
                id: user.id,
                name: user.name,
                email: user.email,
                password: '', // Don't fill password on edit
                role: user.role,
                specialization: user.specialization || '',
            });
        } else {
            setIsEditMode(false);
            reset();
            setData({ ...data, role: 'patient' }); // Default
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            put(`/admin/users/${data.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/users', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            destroy(`/admin/users/${id}`);
        }
    };

    return (
        <>
            <Head title="Admin - User Management" />
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
                                    <Link href="/admin/users" className="text-white inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
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
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                            <button onClick={() => openModal()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow hover:bg-indigo-700 transition-all">
                                + Add User
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                                                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                                                      user.role === 'doctor' ? 'bg-blue-100 text-blue-700' :
                                                      user.role === 'gp' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button onClick={() => openModal(user)} className="text-indigo-600 hover:text-indigo-900 font-bold text-xs">Edit</button>
                                                <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 font-bold text-xs">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 border-t border-slate-100">
                                <Pagination links={users.links} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">{isEditMode ? 'Edit User' : 'Create User'}</h3>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Name</label>
                                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full rounded-lg border-slate-200 text-sm" required />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full rounded-lg border-slate-200 text-sm" required />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role</label>
                                    <select value={data.role} onChange={e => setData('role', e.target.value)} className="w-full rounded-lg border-slate-200 text-sm">
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="gp">GP</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                {data.role === 'doctor' && (
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Specialization</label>
                                        <input type="text" value={data.specialization} onChange={e => setData('specialization', e.target.value)} className="w-full rounded-lg border-slate-200 text-sm" />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password {isEditMode && '(Leave blank to keep)'}</label>
                                    <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full rounded-lg border-slate-200 text-sm" />
                                     {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-lg">Cancel</button>
                                    <button type="submit" disabled={processing} className="px-4 py-2 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-indigo-600 transition-colors">
                                        {isEditMode ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


            </div>
        </>
    );
}
