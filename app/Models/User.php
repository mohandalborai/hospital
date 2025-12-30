<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'specialization',
        'wallet_balance',
    ];

    public function reports()
    {
        return $this->hasMany(MedicalReport::class, 'patient_id');
    }

    public function reviews()
    {
        return $this->hasMany(MedicalReport::class, 'doctor_id');
    }

    public function isDoctor()
    {
        return $this->role === 'doctor';
    }

    public function isPatient()
    {
        return $this->role === 'patient';
    }

    public function isGp()
    {
        return $this->role === 'gp';
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function medications()
    {
        return $this->hasMany(Medication::class, 'doctor_id');
    }

    public function patientAssessments()
    {
        return $this->hasMany(PatientAssessment::class, 'patient_id');
    }

    public function recommendedAssessments()
    {
        return $this->hasMany(PatientAssessment::class, 'recommended_doctor_id');
    }
    

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
