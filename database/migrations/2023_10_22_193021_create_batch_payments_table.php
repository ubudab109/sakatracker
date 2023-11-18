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
        Schema::create('batch_payments', function (Blueprint $table) {
            $table->id();
            $table->string('no_batch');
            $table->string('periode');
            $table->string('jatuh_tempo');
            $table->bigInteger('total');
            $table->string('status');
            $table->bigInteger('level');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batch_payments');
    }
};
