<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientAssessment extends Model
{
    protected $fillable = [
        'patient_id',
        'symptoms',
        'recommended_specialty',
        'recommended_doctor_id',
    ];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function recommendedDoctor()
    {
        return $this->belongsTo(User::class, 'recommended_doctor_id');
    }
}
