<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PatientController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

// Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// Dashboard Redirection
Route::get('/dashboard', [HomeController::class, 'index'])->middleware('auth')->name('dashboard');

// shared Patient/Doctor Notifications (maybe just patient/doctor specific if needed, but let's put in auth)
Route::middleware('auth')->group(function () {
    Route::post('/notifications/mark-as-read', function () {
        auth()->user()->unreadNotifications->markAsRead();
        return back();
    })->name('notifications.markRead');
});

// Patient Routes
Route::middleware(['auth', \App\Http\Middleware\EnsureUserIsPatient::class])->group(function () {
    Route::get('/patient/dashboard', [PatientController::class, 'dashboard'])->name('patient.dashboard');
    Route::get('/patient/upload', [PatientController::class, 'uploadForm'])->name('patient.upload');
    Route::post('/patient/upload', [PatientController::class, 'upload'])->name('patient.upload.submit');
    
    // Assessment
    Route::get('/patient/assessment', [PatientController::class, 'assessmentForm'])->name('patient.assessment');
    Route::post('/patient/assessment', [PatientController::class, 'submitAssessment'])->name('patient.assessment.submit');
});

// Doctor Routes
Route::middleware(['auth', \App\Http\Middleware\EnsureUserIsDoctor::class])->group(function () {
    Route::get('/doctor/dashboard', [DoctorController::class, 'dashboard'])->name('doctor.dashboard');
    Route::get('/doctor/review/{report}', [DoctorController::class, 'showReviewForm'])->name('doctor.review');
    Route::post('/doctor/review/{report}', [DoctorController::class, 'submitReview'])->name('doctor.review.submit');

    // Medication Management
    Route::get('/doctor/medications', [DoctorController::class, 'manageMedications'])->name('doctor.medications');
    Route::post('/doctor/medications', [DoctorController::class, 'storeMedication'])->name('doctor.medications.store');
    Route::delete('/doctor/medications/{medication}', [DoctorController::class, 'deleteMedication'])->name('doctor.medications.delete');
});

// GP Routes
Route::middleware(['auth', \App\Http\Middleware\EnsureUserIsGp::class])->group(function () {
    Route::get('/gp/dashboard', [\App\Http\Controllers\GpController::class, 'dashboard'])->name('gp.dashboard');
    Route::get('/gp/report/{report}', [\App\Http\Controllers\GpController::class, 'show'])->name('gp.report.show');
    Route::post('/gp/refer/{report}', [\App\Http\Controllers\GpController::class, 'refer'])->name('gp.refer');
});

// Admin Routes
Route::middleware(['auth', \App\Http\Middleware\EnsureUserIsAdmin::class])->group(function () {
    Route::get('/admin/dashboard', [\App\Http\Controllers\AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // User CRUD
    Route::get('/admin/users', [\App\Http\Controllers\AdminController::class, 'users'])->name('admin.users');
    Route::post('/admin/users', [\App\Http\Controllers\AdminController::class, 'storeUser'])->name('admin.users.store');
    Route::put('/admin/users/{user}', [\App\Http\Controllers\AdminController::class, 'updateUser'])->name('admin.users.update');
    Route::delete('/admin/users/{user}', [\App\Http\Controllers\AdminController::class, 'deleteUser'])->name('admin.users.delete');

    // Report CRUD
    Route::get('/admin/reports', [\App\Http\Controllers\AdminController::class, 'reports'])->name('admin.reports');
    Route::delete('/admin/reports/{report}', [\App\Http\Controllers\AdminController::class, 'deleteReport'])->name('admin.reports.delete');
});
