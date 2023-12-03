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
            $table->enum('payment_gateway_status', ['paid', 'not_paid'])->default('not_paid')->after('status');
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
