<?php

namespace App\Http\Controllers;

use App\Models\MedicalReport;
use App\Models\Medication;
use App\Notifications\ReportReviewed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorController extends Controller
{
    public function dashboard()
    {
        // Show pending reports assigned to this doctor (by GP)
        $pendingReports = MedicalReport::with('patient')
            ->where('status', 'pending_specialist')
            ->where('doctor_id', Auth::id())
            ->orderBy('created_at', 'asc')
            ->paginate(5, ['*'], 'pending');

        $myReviewedReports = MedicalReport::with('patient')
            ->where('doctor_id', Auth::id())
            ->where('status', 'reviewed')
            ->latest()
            ->paginate(5, ['*'], 'history');

        $medications = Auth::user()->medications;

        return \Inertia\Inertia::render('Doctor/Dashboard', compact('pendingReports', 'myReviewedReports', 'medications'));
    }

    public function showReviewForm(MedicalReport $report)
    {
        return \Inertia\Inertia::render('Doctor/Review', compact('report'));
    }

    public function submitReview(Request $request, MedicalReport $report)
    {
        $request->validate([
            'doctor_notes' => 'required|string|min:10',
            'prescription' => 'nullable|string',
        ]);

        $reward = 50.00; // Fixed reward per review

        $report->update([
            'doctor_id' => Auth::id(),
            'doctor_notes' => $request->doctor_notes . ($request->prescription ? "\n\nPrescription: " . $request->prescription : ''),
            'status' => 'reviewed',
            'reward_amount' => $reward,
        ]);

        // Update Doctor's Wallet
        $doctor = Auth::user();
        $doctor->wallet_balance += $reward;
        $doctor->save();

        // Notify Patient
        $report->patient->notify(new ReportReviewed($report));

        return to_route('doctor.dashboard')->with('success', 'Report reviewed successfully. Reward added to wallet!');
    }

    public function manageMedications()
    {
        $medications = Auth::user()->medications;
        return \Inertia\Inertia::render('Doctor/Medications', compact('medications'));
    }

    public function storeMedication(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'classification' => 'required|string|max:255',
        ]);

        Auth::user()->medications()->create($request->only('name', 'classification'));

        return redirect()->back()->with('success', 'Medication added successfully.');
    }

    public function deleteMedication(Medication $medication)
    {
        if ($medication->doctor_id !== Auth::id()) {
            abort(403);
        }

        $medication->delete();
        return redirect()->back()->with('success', 'Medication removed successfully.');
    }
}
