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
        Schema::table('medical_reports', function (Blueprint $table) {
            $table->string('required_specialty')->nullable()->after('doctor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('medical_reports', function (Blueprint $table) {
            $table->dropColumn('required_specialty');
        });
    }
};
