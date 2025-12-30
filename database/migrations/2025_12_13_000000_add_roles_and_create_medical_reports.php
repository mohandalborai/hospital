<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('patient'); // patient, doctor, admin
            $table->string('specialization')->nullable();
            $table->decimal('wallet_balance', 10, 2)->default(0);
        });

        Schema::create('medical_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('doctor_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('file_path');
            $table->text('ai_analysis_result')->nullable();
            $table->text('doctor_notes')->nullable();
            $table->string('status')->default('pending_analysis'); // pending_analysis, pending_review, completed
            $table->decimal('reward_amount', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_reports');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'specialization', 'wallet_balance']);
        });
    }
};
