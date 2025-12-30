<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'doctor') {
            return redirect()->route('doctor.dashboard');
        } elseif ($user->role === 'gp') {
            return redirect()->route('gp.dashboard');
        } elseif ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('patient.dashboard');
    }
}
