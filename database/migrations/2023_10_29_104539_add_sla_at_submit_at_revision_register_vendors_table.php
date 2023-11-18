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
        Schema::table('revision_register_vendors', function (Blueprint $table) {
            $table->datetime('sla_at')->nullable();
            $table->datetime('submit_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('revision_register_vendors', function (Blueprint $table) {
            $table->dropColumn('sla_at');
            $table->dropColumn('submit_at');
        });
    }
};
