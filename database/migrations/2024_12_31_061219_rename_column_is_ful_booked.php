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
        Schema::table('office_spaces', function (Blueprint $table) {
            $table->renameColumn('is_ful_booked', 'is_full_booked');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('office_spaces', function (Blueprint $table) {
            $table->renameColumn('is_full_booked', 'is_ful_booked');
        });
    }
};
