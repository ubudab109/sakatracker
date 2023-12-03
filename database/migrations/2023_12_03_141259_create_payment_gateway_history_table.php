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
        Schema::create('payment_gateway_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('batch_payment_id')->constrained('batch_payments')->cascadeOnDelete()->cascadeOnUpdate();
            $table->json('exchange_invoice_id')->nullable();
            $table->boolean('is_success')->default(false);
            $table->string('message')->nullable();
            $table->json('data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_gateway_history');
    }
};
