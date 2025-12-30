<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MedicalReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_doctors' => User::where('role', 'doctor')->count(),
            'total_patients' => User::where('role', 'patient')->count(),
            'total_reports' => MedicalReport::count(),
            'pending_reports' => MedicalReport::where('status', 'pending_review')->count(),
        ];

        return Inertia::render('Admin/Dashboard', compact('stats'));
    }

    public function multimedia()
    {
        // Placeholder for multimedia management if needed, but for now we focus on users/reports
        return redirect()->back();
    }

    // --- User Management ---

    public function users(Request $request)
    {
        $query = User::query();

        if ($request->search) {
            $query->where('name', 'like', '%'.$request->search.'%')
                  ->orWhere('email', 'like', '%'.$request->search.'%');
        }

        if ($request->role) {
            $query->where('role', $request->role);
        }

        $users = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Users', compact('users'));
    }

    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,doctor,patient,gp',
            'specialization' => 'nullable|required_if:role,doctor|string',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'specialization' => $validated['specialization'] ?? null,
            'wallet_balance' => 0,
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|in:admin,doctor,patient,gp',
            'specialization' => 'nullable|string',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'specialization' => $validated['specialization'] ?? null,
        ]);
        
        if ($request->filled('password')) {
            $request->validate(['password' => 'string|min:8']);
            $user->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    public function deleteUser(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    // --- Report Management ---

    public function reports(Request $request)
    {
        $reports = MedicalReport::with(['patient', 'doctor'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Reports', compact('reports'));
    }

    public function deleteReport(MedicalReport $report)
    {
        // Optional: delete file from storage
        $report->delete();
        return redirect()->back()->with('success', 'Report deleted successfully.');
    }
}
