<?php

namespace App\Http\Controllers;

use App\Models\MedicalReport;
use App\Services\AiAnalysisService;
use App\Models\User;
use App\Notifications\ReportSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;

class PatientController extends Controller
{
    public function dashboard()
    {
        $reports = Auth::user()->reports()->with('doctor')->latest()->paginate(5);
        return \Inertia\Inertia::render('Patient/Dashboard', compact('reports'));
    }

    public function uploadForm()
    {
        return \Inertia\Inertia::render('Patient/Upload');
    }

    public function upload(Request $request, AiAnalysisService $aiService)
    {
        $request->validate([
            'medical_image' => 'required|file|mimes:jpeg,png,pdf,jpg|max:10240', // 10MB max
        ]);

        $path = $request->file('medical_image')->store('medical_reports', 'public');

        // Trigger AI Analysis
        $analysisResult = $aiService->analyze($path);

        $report = MedicalReport::create([
            'patient_id' => Auth::id(),
            'file_path' => $path,
            'required_specialty' => $request->specialty,
            'ai_analysis_result' => $analysisResult,
            'ai_analysis_result' => $analysisResult,
            'status' => 'pending_gp',
        ]);

        // Notify GPs (Optional: could implement checking for GP role users and notifying them)
        // For now, rely on GP Dashboard pulling pending_gp reports.
        // $gps = User::where('role', 'gp')->get();
        // Notification::send($gps, new ReportSubmitted($report));

        return redirect()->back()->with('success', 'File uploaded and AI analysis complete. Pending doctor review.')->with('analysis', $analysisResult);
    }
    public function assessmentForm()
    {
        return \Inertia\Inertia::render('Patient/Assessment');
    }

    public function submitAssessment(Request $request)
    {
        $request->validate([
            'symptoms' => 'required|string|min:10',
        ]);

        $symptoms = strtolower($request->symptoms);
        $recommendedSpecialty = 'General Practice';

        if (str_contains($symptoms, 'heart') || str_contains($symptoms, 'chest pain')) {
            $recommendedSpecialty = 'Cardiology';
        } elseif (str_contains($symptoms, 'skin') || str_contains($symptoms, 'rash')) {
            $recommendedSpecialty = 'Dermatology';
        } elseif (str_contains($symptoms, 'bone') || str_contains($symptoms, 'fracture')) {
            $recommendedSpecialty = 'Orthopedics';
        } elseif (str_contains($symptoms, 'brain') || str_contains($symptoms, 'headache') || str_contains($symptoms, 'nerve')) {
            $recommendedSpecialty = 'Neurology';
        }

        // Find a doctor with this specialty
        $recommendedDoctor = User::where('role', 'doctor')
            ->where('specialization', $recommendedSpecialty)
            ->first();

        $assessment = \App\Models\PatientAssessment::create([
            'patient_id' => Auth::id(),
            'symptoms' => $request->symptoms,
            'recommended_specialty' => $recommendedSpecialty,
            'recommended_doctor_id' => $recommendedDoctor ? $recommendedDoctor->id : null,
        ]);
        
        // Eager load for the response
        if ($assessment->recommended_doctor_id) {
             $assessment->load('recommendedDoctor');
        }

        return redirect()->back()->with('success', 'Assessment complete. Recommended Specialty: ' . $recommendedSpecialty)
            ->with('assessment', $assessment);
    }
}
