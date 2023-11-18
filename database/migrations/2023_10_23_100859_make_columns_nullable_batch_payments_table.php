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
        Schema::table('batch_payments', function (Blueprint $table) {
            $table->string('no_batch')->nullable()->change();
            $table->string('periode')->nullable()->change();
            $table->string('jatuh_tempo')->nullable()->change();
            $table->bigInteger('total')->nullable()->change();
            $table->string('status')->nullable()->change();
            $table->bigInteger('level')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('batch_payments', function (Blueprint $table) {
            //
        });
    }
};
