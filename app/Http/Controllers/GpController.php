<?php

namespace App\Http\Controllers;

use App\Models\MedicalReport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GpController extends Controller
{
    public function dashboard()
    {
        // Get reports that are either new (uploaded by patient) or assigned to GP
        // Assuming status 'pending_gp' or 'created' denotes ready for GP
        $reports = MedicalReport::where('status', 'pending_gp')
            ->orWhere('status', 'pending_review') // fallback if current uploads default to this
            ->with(['patient', 'doctor'])
            ->latest()
            ->get();

        return \Inertia\Inertia::render('Gp/Dashboard', compact('reports'));
    }

    public function show($id)
    {
        $report = MedicalReport::findOrFail($id);
        
        // Get list of specialists (Doctors) for referral
        $specialists = User::where('role', 'doctor')->get(['id', 'name', 'specialization']);

        return \Inertia\Inertia::render('Gp/Show', compact('report', 'specialists'));
    }

    public function refer(Request $request, $id)
    {
        $request->validate([
            'doctor_id' => 'required|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $report = MedicalReport::findOrFail($id);
        
        $report->doctor_id = $request->doctor_id;
        $report->status = 'pending_specialist';
        // Append GP notes if needed, or maybe we should add a gp_notes column?
        // For now, let's assume we might append to doctor_notes or a new field.
        // Let's check MedicalReport model again. It has 'doctor_notes'.
        // I'll append to doctor_notes with a prefix "GP Note:" for now to keep it simple
        // unless I modify the migration which I prefer not to unless necessary.
        // Actually, let's just use what we have. 
        if ($request->notes) {
            $report->doctor_notes = "GP Note: " . $request->notes . "\n\n" . $report->doctor_notes;
        }
        
        $report->save();

        return redirect()->route('gp.dashboard')->with('success', 'Patient referred to specialist successfully.');
    }
}
